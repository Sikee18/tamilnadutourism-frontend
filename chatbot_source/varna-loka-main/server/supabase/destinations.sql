-- Enable the pgvector extension to work with embedding vectors
create extension if not exists vector;

-- Create the Destinations Table with PostGIS and Vector support
CREATE TABLE IF NOT EXISTS public.destinations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  city TEXT,
  description TEXT,              -- The raw data for embeddings
  theme_vibe TEXT,               -- Concise vibe (e.g., 'Cold, Misty, Colonial')
  theme_tags TEXT[],             -- Fast filtering tags
  location_coords GEOGRAPHY(POINT, 4326), -- PostGIS point (Long, Lat)
  embedding vector(768),         -- Vector storage for Gemini
  crowd_status INT DEFAULT 0,    -- 0: Calm, 1: Moderate, 2: Crowded
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for spatial (Distance) searches
CREATE INDEX IF NOT EXISTS destinations_geo_index ON public.destinations USING GIST (location_coords);

-- Index for semantic (Vector) searches
CREATE INDEX IF NOT EXISTS destinations_vector_index ON public.destinations USING hnsw (embedding vector_cosine_ops);

-- Insert initial data (only if table is empty to avoid duplicates on re-run)
INSERT INTO public.destinations (name, city, description, theme_vibe, theme_tags, location_coords, crowd_status)
SELECT * FROM (VALUES 
('Meenakshi Amman Temple', 'Madurai', 'Spiritual heart of TN, Dravidian architecture, 14 gopurams, ancient heritage, bustle, street food.', 'Spiritual, Ancient, Architecture', ARRAY['temple', 'heritage', 'food'], 'POINT(78.1193 9.9195)', 2),
('Big Temple (Brihadisvara)', 'Thanjavur', 'UNESCO World Heritage, Chola architecture, massive granite monoliths, peaceful, historical lore.', 'Majestic, Heritage, Peaceful', ARRAY['temple', 'monument', 'heritage'], 'POINT(79.1322 10.7828)', 0),
('Doddabetta Peak', 'Ooty', 'High altitude viewpoint, tea estates, cold climate, botanical gardens, misty valleys.', 'Cold, Nature, Hillstation', ARRAY['nature', 'hills', 'cold'], 'POINT(76.7337 11.4016)', 1),
('Vattakottai Fort', 'Kanyakumari', 'Seaside fort, stone ramparts, ocean views, beach proximity, quiet historical site.', 'Coastal, Fort, Scenic', ARRAY['monument', 'beach', 'heritage'], 'POINT(77.5647 8.1250)', 0),
('Pillar Rocks', 'Kodaikanal', 'Giant rock formations, thick mist, pine forests, cold weather, scenic hiking trails.', 'Misty, Cold, Nature', ARRAY['hills', 'nature', 'cold'], 'POINT(77.4835 10.2104)', 1),
('Arjuna Penance', 'Mahabalipuram', 'Bas-relief rock carvings, Pallava dynasty history, coastal winds, ancient monoliths.', 'Artistic, Ancient, Coastal', ARRAY['monument', 'heritage', 'beach'], 'POINT(80.1921 12.6268)', 2),
('Airavatesvara Temple', 'Darasuram', 'Intricate stone carvings, Chola architecture, musical steps, serene heritage site.', 'Artistic, Spiritual, Intricate', ARRAY['temple', 'heritage', 'monument'], 'POINT(79.3567 10.9478)', 0),
('Megamalai Highwavys', 'Theni', 'Hidden tea estates, cloud-kissed peaks, pristine wildlife, cold waterfalls, offbeat trek.', 'Cloudy, Tea Estates, Cold', ARRAY['nature', 'hills', 'offbeat'], 'POINT(77.4200 9.6800)', 0),
('Kolli Hills', 'Namakkal', 'Mountain of Death with 70 hair-pin bends, Agaya Gangai falls, spice gardens, mystic vibe.', 'Adventure, Misty, Spiritual', ARRAY['hills', 'nature', 'adventure'], 'POINT(78.3300 11.2500)', 0),
('Hogenakkal Falls', 'Dharmapuri', 'Niagara of India, Kaveri river gorge, coracle rides, herbal oil massages, roaring water.', 'River, Waterfall, Nature', ARRAY['nature', 'waterfall', 'adventure'], 'POINT(77.7700 12.1100)', 1),
('Dhanushkodi Land End', 'Rameshwaram', 'Ghost town, confluence of two seas, mythological bridge, salt air, ruins, pristine solitude.', 'Mystic, Ruin, Coastal', ARRAY['nature', 'beach', 'heritage'], 'POINT(79.4400 9.1700)', 1),
('Yercaud Lake View', 'Salem', 'Jewel of the South, orange groves, coffee plantations, mist, quiet botanical walks.', 'Cold, Coffee, Peaceful', ARRAY['hills', 'nature', 'cold'], 'POINT(78.2000 11.7700)', 0),
('Annamalaiyar Temple', 'Thiruvannamalai', 'Spiritual fire element temple, hill circumambulation (Girivalam), ashrams, deep silence.', 'Spiritual, Infinite, Fire', ARRAY['temple', 'heritage', 'spiritual'], 'POINT(79.0600 12.2200)', 1),
('Tranquebar (Tarangambadi)', 'Nagapattinam', 'Place of the singing waves, Danish colonial architecture, historical fort, quiet beach.', 'Colonial, Coastal, Quiet', ARRAY['heritage', 'beach', 'history'], 'POINT(79.8500 11.0300)', 0),
('Pichavaram Mangrove', 'Chidambaram', 'World second largest mangrove forest, boating through root tunnels, biodiversity, scenic.', 'Nature, Water, Adventure', ARRAY['nature', 'forest', 'water'], 'POINT(79.7800 11.4200)', 0),
('Courtallam Main Falls', 'Tenkasi', 'Spa of the South, medicinal waterfalls, rain-fed streams, bustling seasonal vibe.', 'Water, Healing, Nature', ARRAY['nature', 'waterfall', 'healing'], 'POINT(77.2600 8.9300)', 1),
('Kumbakonam Degree Coffee Town', 'Kumbakonam', 'Temple hub, Navagraha route, brass metal crafts, silk sarees, filter coffee heritage.', 'Crafts, Coffee, Spiritual', ARRAY['temple', 'food', 'crafts'], 'POINT(79.3800 10.9600)', 0)
) AS t(name, city, description, theme_vibe, theme_tags, location_coords, crowd_status)
WHERE NOT EXISTS (
    SELECT 1 FROM public.destinations WHERE name = t.name
);

-- DROP function to ensure clean slate for signature changes
DROP FUNCTION IF EXISTS match_destinations(vector, float, int);
DROP FUNCTION IF EXISTS match_destinations(double precision[], float, int);
DROP FUNCTION IF EXISTS match_destinations(jsonb);

-- Create a function to search for similar destinations
create or replace function match_destinations (
  payload jsonb
)
returns table (
  id uuid,
  name text,
  city text,
  description text,
  theme_vibe text,
  similarity float
)
language plpgsql
security definer -- Bypass RLS
as $$
declare
  query_vec vector(768);
  match_count int;
  match_threshold float;
begin
  -- Extract values from JSONB payload
  -- Handle casting from JSONB array to vector via standard text conversion
  -- (payload->'query_embedding') returns the JSON array [0.1, ...]
  -- We cast to text, then to vector. explicit cast needed.
  -- Alternatively, iterate elements.
  
  -- Robust json-to-vector cast:
  query_vec := (
    select array_agg(x::float) 
    from jsonb_array_elements_text(payload->'query_embedding') t(x)
  )::vector;

  match_count := (payload->>'match_count')::int;
  match_threshold := (payload->>'match_threshold')::float;

  return query
  select
    destinations.id,
    destinations.name,
    destinations.city,
    destinations.description,
    destinations.theme_vibe,
    1 - (destinations.embedding <=> query_vec) as similarity
  from destinations
  where 1 - (destinations.embedding <=> query_vec) > match_threshold
  order by destinations.embedding <=> query_vec
  limit match_count;
end;
$$;

-- Grant permissions explicitly
GRANT EXECUTE ON FUNCTION match_destinations(jsonb) TO public;
GRANT EXECUTE ON FUNCTION match_destinations(jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION match_destinations(jsonb) TO anon;
grant execute on function match_destinations(jsonb) to authenticated;
