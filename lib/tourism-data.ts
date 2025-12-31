// All data extracted from the official Tamil Nadu Tourism PDF

export const ALL_DISTRICTS = [
  // HILL DISTRICTS
  { name: "Nilgiris", region: "Hill", identity: "Home to Ooty, Queen of Hill Stations" },
  { name: "Coimbatore", region: "Hill/Industrial", identity: "Manchester of South with Anaimalai reserves" },
  { name: "Dindigul", region: "Hill", identity: "Gateway to Kodaikanal and Palani temples" },
  { name: "Theni", region: "Hill", identity: "Megamalai plateau and Srivilliputhur reserve" },
  { name: "Tiruppur", region: "Hill/Industrial", identity: "Knitwear capital with Western Ghats access" },
  { name: "Erode", region: "Hill/Industrial", identity: "Sathyamangalam Tiger Reserve gateway" },
  { name: "Namakkal", region: "Hill", identity: "Kolli Hills with medicinal herbs" },

  // COASTAL DISTRICTS
  { name: "Chennai", region: "Coastal", identity: "Metropolitan gateway with Marina Beach" },
  { name: "Chengalpattu", region: "Coastal", identity: "Mahabalipuram UNESCO heritage site" },
  { name: "Kanyakumari", region: "Coastal/Pilgrimage", identity: "Southern tip where three seas meet" },
  { name: "Ramanathapuram", region: "Coastal/Pilgrimage", identity: "Rameshwaram Jyotirlinga and Dhanushkodi" },
  { name: "Nagapattinam", region: "Coastal", identity: "Cauvery Delta coastal region" },
  { name: "Thoothukudi", region: "Coastal", identity: "Pearl City with diving heritage" },
  { name: "Cuddalore", region: "Coastal", identity: "Auroville and Serenity Beach" },
  { name: "Mayiladuthurai", region: "Coastal", identity: "Cauvery Delta wetlands" },

  // AGRICULTURAL/DELTA DISTRICTS
  { name: "Thanjavur", region: "Agricultural", identity: "UNESCO Brihadeeswara Temple and Chola heritage" },
  { name: "Tiruvarur", region: "Agricultural", identity: "Cauvery Delta rice bowl" },
  { name: "Pudukottai", region: "Agricultural", identity: "Protected agricultural zone" },
  { name: "Ariyalur", region: "Agricultural", identity: "Fossil-rich geological terrain" },
  { name: "Karur", region: "Agricultural", identity: "Cauvery farming landscape" },
  { name: "Tiruchirappalli", region: "Agricultural", identity: "Srirangam temple and Rock Fort" },
  { name: "Perambalur", region: "Agricultural", identity: "National Fossil Wood Park" },
  { name: "Kallakurichi", region: "Agricultural", identity: "Gingee Fort citadels" },

  // CULTURAL/HERITAGE DISTRICTS
  { name: "Madurai", region: "Cultural", identity: "Meenakshi Temple city" },
  { name: "Kanchipuram", region: "Cultural", identity: "City of thousand temples and silk" },
  { name: "Chidambaram", region: "Cultural", identity: "Nataraja Temple with Space element" },
  { name: "Kumbakonam", region: "Cultural", identity: "Delta gateway with Navagraha temples" },
  { name: "Tiruvannamalai", region: "Cultural", identity: "Arunachaleswarar Fire Lingam" },
  { name: "Villupuram", region: "Cultural", identity: "Gingee Fort and Auroville" },
  { name: "Vellore", region: "Cultural", identity: "Sripuram Golden Temple" },

  // INDUSTRIAL DISTRICTS
  { name: "Salem", region: "Industrial", identity: "Mettur Dam and steel city" },
  { name: "Thiruvallur", region: "Industrial", identity: "Pulicat Lake and rocket tourism" },
  { name: "Ranipet", region: "Industrial", identity: "Emerging industrial hub" },
  { name: "Virudhunagar", region: "Industrial", identity: "Sivakasi firecracker hub" },

  // HYBRID DISTRICTS
  { name: "Sivaganga", region: "Heritage", identity: "Chettinad mansions and bird sanctuary" },
  { name: "Dharmapuri", region: "Hill", identity: "Hogenakkal Smoky Rocks waterfalls" },
  { name: "Krishnagiri", region: "Agricultural", identity: "India's largest mango producer" },
  { name: "Tirunelveli", region: "Pilgrimage", identity: "Nellaiappar Temple and Courtallam falls" },
  { name: "Tirupathur", region: "Pilgrimage", identity: "Tirupati influence region" },
] as const

export const FEATURED_DESTINATIONS = [
  {
    id: "brihadeeswara-temple",
    name: "Brihadeeswara Temple",
    district: "Thanjavur",
    category: "Heritage",
    description: "UNESCO World Heritage grand Chola architecture",
    significance: "One of the finest examples of Chola dynasty architecture with towering vimana",
    bestTime: "October to March",
    crowdLevel: "very-busy" as const,
    alternatives: ["Darasuram Temple", "Gangaikonda Cholapuram"],
    highlights: [
      "UNESCO World Heritage Site",
      "Grand Chola architectural masterpiece",
      "Royal heritage complex nearby",
    ],
  },
  {
    id: "mahabalipuram",
    name: "Mahabalipuram",
    district: "Chengalpattu",
    category: "Heritage",
    description: "UNESCO Shore Temple and rock-cut Pallava monuments",
    significance: "Ancient port city with Pallava dynasty heritage dating back to 7th century",
    bestTime: "November to February",
    crowdLevel: "very-busy" as const,
    alternatives: ["Covelong Beach", "Samiyarpettai Beach"],
    highlights: ["Shore Temple complex", "Five Rathas rock-cut structures", "Arjuna's Penance bas-relief"],
  },
  {
    id: "meenakshi-temple",
    name: "Meenakshi Amman Temple",
    district: "Madurai",
    category: "Spiritual",
    description: "Iconic Dravidian architecture temple",
    significance: "Ancient shrine dedicated to Goddess Meenakshi with celestial marriage mythology",
    bestTime: "October to March",
    crowdLevel: "very-busy" as const,
    alternatives: ["Thirupparankundram Temple", "Alagar Koil"],
    highlights: ["Stunning Dravidian temple architecture", "Thousand Pillar Hall", "Cultural heart of Madurai"],
  },
  {
    id: "rameshwaram",
    name: "Rameshwaram",
    district: "Ramanathapuram",
    category: "Spiritual",
    description: "Jyotirlinga shrine with sacred theerthams",
    significance: "One of 12 Jyotirlingas with 22 sacred water tanks for ritual immersion",
    bestTime: "October to April",
    crowdLevel: "busy" as const,
    alternatives: ["Dhanushkodi", "Gandhamadhana Parvatham"],
    highlights: ["Ramanathaswamy Jyotirlinga", "22 sacred water tanks", "Pamban Bridge heritage"],
  },
  {
    id: "ooty",
    name: "Ooty",
    district: "Nilgiris",
    category: "Hills",
    description: "Queen of Hill Stations with tea gardens",
    significance: "Most famous hill station in Tamil Nadu with scenic tea estates and colonial charm",
    bestTime: "March to June, September to November",
    crowdLevel: "very-busy" as const,
    alternatives: ["Kotagiri", "Bellikkal Lake"],
    highlights: ["Ooty Lake with boating", "Doddabetta Peak highest point", "Tea Estate Museum"],
  },
  {
    id: "kanyakumari",
    name: "Kanyakumari",
    district: "Kanyakumari",
    category: "Coastal",
    description: "Southern tip where three seas converge",
    significance: "Sacred cape with Triveni Sangamam where Arabian Sea, Indian Ocean, and Bay of Bengal meet",
    bestTime: "October to March",
    crowdLevel: "busy" as const,
    alternatives: ["Lemur Beach", "Sanguthurai Beach"],
    highlights: ["Vivekananda Rock Memorial", "Triveni Sangamam point", "Sunrise and sunset views"],
  },
] as const

export const UNDERRATED_PLACES = [
  {
    id: "gangaikonda-cholapuram",
    name: "Gangaikonda Cholapuram",
    district: "Ariyalur",
    region: "Agricultural",
    description: "Stunning Chola temple with peaceful atmosphere",
    why: "Equally magnificent as Brihadeeswara but without crowds",
    image: "https://images.unsplash.com/photo-1640257052932-9b1e2032a49e?fm=jpg&q=80&w=1200",
  },
  {
    id: "kotagiri",
    name: "Kotagiri",
    district: "Nilgiris",
    region: "Hill",
    description: "Older quieter hill station with Catherine Falls",
    why: "Tea gardens without Ooty's commercial tourism rush",
    image: "https://images.unsplash.com/photo-1760884966322-207bd5afdd77?fm=jpg&q=80&w=1200",
  },
  {
    id: "valparai",
    name: "Valparai",
    district: "Coimbatore",
    region: "Hill",
    description: "Remote hill station at 3,500 ft with tea estates",
    why: "Untouched charm with Sholayar Dam and wildlife",
    image: "https://images.unsplash.com/photo-1664769908118-b15bacf9358f?fm=jpg&q=80&w=1200",
  },
  {
    id: "mannavanur-lake",
    name: "Mannavanur Lake",
    district: "Dindigul",
    region: "Hill",
    description: "Hidden charm near Kodaikanal with horse rides",
    why: "Homestays and nature without commercial tourism",
    image: "https://images.unsplash.com/photo-1619020933389-e96f49742bce?fm=jpg&q=80&w=1200",
  },
  {
    id: "hogenakkal-falls",
    name: "Hogenakkal Falls",
    district: "Dharmapuri",
    region: "Hill",
    description: "Smoky Rocks Cauvery falls with coracle rides",
    why: "Unique rock formations and traditional oil massage experiences",
    image: "https://images.unsplash.com/photo-1627918835821-2e21014cc614?fm=jpg&q=80&w=1200",
  },
  {
    id: "parambikulam-reserve",
    name: "Parambikulam Tiger Reserve",
    district: "Coimbatore",
    region: "Forest",
    description: "Premium wildlife experience in Western Ghats",
    why: "Tigers and elephants without crowds",
    image: "https://images.unsplash.com/photo-1707455090980-a1e40f2ace15?fm=jpg&q=80&w=1200",
  },
  {
    id: "berijam-lake",
    name: "Berijam Lake",
    district: "Dindigul",
    region: "Hill",
    description: "Pristine lake alternative near Kodaikanal",
    why: "Nature lovers' paradise away from main tourist spots",
    image: "https://images.unsplash.com/photo-1620397500361-b4d6d396a84f?fm=jpg&q=80&w=1200",
  },
  {
    id: "lemur-beach",
    name: "Lemur Beach",
    district: "Kanyakumari",
    region: "Coastal",
    description: "Best beach in India Today survey",
    why: "Pristine sands with rare crowds at Ganapathipuram",
    image: "https://images.unsplash.com/photo-1628065306655-44288820c458?fm=jpg&q=80&w=1200",
  },
  {
    id: "samiyarpettai-beach",
    name: "Samiyarpettai Beach",
    district: "Chengalpattu",
    region: "Coastal",
    description: "2 km expanse with golden sands",
    why: "Coconut groves and river estuary without tourist infrastructure",
    image: "https://images.unsplash.com/photo-1594917631343-690a6e0df077?fm=jpg&q=80&w=1200",
  },
  {
    id: "darasuram-temple",
    name: "Darasuram Temple",
    district: "Thanjavur",
    region: "Heritage",
    description: "Airavatesvara UNESCO temple",
    why: "Intricate Chola architecture without Thanjavur crowds",
    image: "https://images.unsplash.com/photo-1621245781696-e24e104ae05d?fm=jpg&q=80&w=1200",
  },
  {
    id: "korkai",
    name: "Korkai",
    district: "Thoothukudi",
    region: "Heritage",
    description: "Ancient Pandyan kingdom capital",
    why: "Archaeological significance rarely visited",
    image: "https://images.unsplash.com/photo-1626014902673-818683525251?fm=jpg&q=80&w=1200",
  },
  {
    id: "high-wavy-mountains",
    name: "High Wavy Mountains",
    district: "Theni",
    region: "Hill",
    description: "Tribal villages with gentle treks",
    why: "Serene viewpoints and cultural experiences",
    image: "https://images.unsplash.com/photo-1599818815257-897c5cb19e27?fm=jpg&q=80&w=1200",
  },
] as const

export const EXPERIENCE_CATEGORIES = {
  culture: {
    id: "culture",
    title: "Culture & Heritage",
    subtitle: "Ancient traditions and living heritage",
    experiences: [
      {
        id: "kanchipuram-silk",
        title: "Kanchipuram Silk Weaving",
        district: "Kanchipuram",
        description: "Traditional saree production with GI tag",
        significance: "Witness master weavers create intricate silk patterns passed down through generations",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80",
      },
      {
        id: "chettinad-heritage",
        title: "Chettinad Mansions",
        district: "Sivaganga",
        description: "Palatial architecture with Aayiram Jannal Veedu",
        significance: "Experience unique Chettinad architectural heritage and legendary cuisine",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
      },
      {
        id: "tanjore-painting",
        title: "Tanjore Painting Art",
        district: "Thanjavur",
        description: "Traditional gold leaf artwork technique",
        significance: "Ancient art form combining gold foil with natural pigments",
        image: "https://images.unsplash.com/photo-1605649487212-47a4983a8b90?w=800&q=80",
      },
      {
        id: "bharatanatyam",
        title: "Bharatanatyam Dance",
        district: "Chennai",
        description: "Classical dance form from Tamil temples",
        significance: "Experience the classical dance that originated in temple rituals",
        image: "https://images.unsplash.com/photo-1547619292-240402b5ae5d?w=800&q=80",
      },
    ],
  },
  hills: {
    id: "hills",
    title: "Hills & Nature",
    subtitle: "Misty peaks and serene landscapes",
    experiences: [
      {
        id: "nilgiris-tea",
        title: "Tea Estate Tours",
        district: "Nilgiris",
        description: "Working plantation tours and Tea Museum",
        significance: "Explore vast tea gardens and learn traditional processing methods",
      },
      {
        id: "kolli-hills-trek",
        title: "Kolli Hills Trekking",
        district: "Namakkal",
        description: "1,200m altitude with medicinal herbs",
        significance: "Remote hills with Agaya Gangai Waterfalls and tribal heritage",
      },
      {
        id: "kodaikanal-nature",
        title: "Kodaikanal Star Lake",
        district: "Dindigul",
        description: "Star-shaped lake with Pillar Rocks",
        significance: "Princess of Hill Stations surrounded by misty mountains",
      },
      {
        id: "yercaud-coffee",
        title: "Yercaud Coffee Plantations",
        district: "Salem",
        description: "Jewel of South with serene lakes",
        significance: "Coffee plantations at 1,515m altitude with minimal crowds",
      },
    ],
  },
  spiritual: {
    id: "spiritual",
    title: "Temples & Spirituality",
    subtitle: "Sacred sites and divine experiences",
    experiences: [
      {
        id: "nataraja-temple",
        title: "Nataraja Temple",
        district: "Chidambaram",
        description: "UNESCO heritage with Space Lingam element",
        significance: "Akasha Lingam representing cosmic dance of Lord Shiva",
      },
      {
        id: "arunachaleswarar",
        title: "Arunachaleswarar Temple",
        district: "Tiruvannamalai",
        description: "Fire Lingam with 14km Girivalam path",
        significance: "Pancha Bhoota temple with tallest gopuram and sacred hill circumambulation",
      },
      {
        id: "srirangam",
        title: "Sri Ranganathaswamy Temple",
        district: "Tiruchirappalli",
        description: "Major Vishnu pilgrimage site",
        significance: "Sprawling temple complex dedicated to Lord Ranganatha",
      },
      {
        id: "palani-murugan",
        title: "Palani Murugan Temple",
        district: "Dindigul",
        description: "Famous hilltop shrine with 660 steps",
        significance: "One of six abodes of Lord Murugan with panoramic views",
      },
    ],
  },
  coastal: {
    id: "coastal",
    title: "Coastal Life",
    subtitle: "Beaches and maritime heritage",
    experiences: [
      {
        id: "marina-beach",
        title: "Marina Beach",
        district: "Chennai",
        description: "Iconic 13km stretch along Bay of Bengal",
        significance: "Second longest urban beach in the world with local culture",
      },
      {
        id: "dhanushkodi",
        title: "Dhanushkodi Ghost Town",
        district: "Ramanathapuram",
        description: "Destroyed by 1964 cyclone with legend",
        significance: "End of the bow location where land meets three seas",
      },
      {
        id: "tranquebar",
        title: "Tranquebar Colonial Heritage",
        district: "Mayiladuthurai",
        description: "Danish colonial architecture by sea",
        significance: "Well-preserved European trading post with maritime history",
      },
      {
        id: "fishing-villages",
        title: "Traditional Fishing Villages",
        district: "Nagapattinam",
        description: "Working harbors and boat-making",
        significance: "Experience authentic coastal life and fishing traditions",
      },
    ],
  },
  nature: {
    id: "nature",
    title: "Wildlife & Nature",
    subtitle: "Protected forests and wildlife",
    experiences: [
      {
        id: "mudumalai",
        title: "Mudumalai Tiger Reserve",
        district: "Nilgiris",
        description: "321 sq km core with Bengal tiger and elephant",
        significance: "Dense Western Ghats forest with leopard and sloth bear",
      },
      {
        id: "anaimalai-reserve",
        title: "Anaimalai Tiger Reserve",
        district: "Coimbatore",
        description: "958 sq km with Nilgiri tahr and lion-tailed macaque",
        significance: "Sprawling protected area in Western Ghats",
      },
      {
        id: "sathyamangalam-tigers",
        title: "Sathyamangalam Tiger Reserve",
        district: "Erode",
        description: "54 tigers at Eastern-Western Ghats confluence",
        significance: "Fourth Tiger Reserve with diverse fauna from both Ghats",
      },
      {
        id: "vedanthangal-birds",
        title: "Vedanthangal Bird Sanctuary",
        district: "Chengalpattu",
        description: "40,000 migratory birds October-March",
        significance: "30 hectares hosting spectacular avian migrations annually",
      },
    ],
  },
} as const

export interface DistrictDetailData {
  highlights: string[]
  underrated: Array<{ name: string; description: string }>
  images: string[]
  description?: string
}

export function getDistrictDetails(districtName: string): DistrictDetailData {
  const districtData: Record<string, DistrictDetailData> = {
    Nilgiris: {
      description: "The Queen of Hill Stations, offering misty landscapes, rolling tea gardens, and a cool climate year-round.",
      highlights: [
        "Doddabetta Peak - Highest point with panoramic views",
        "Botanical Gardens - 55 acres of exotic flora",
        "Tea Estates with working factory museums",
      ],
      underrated: [
        { name: "Bellikkal Lake", description: "Serene lake with Bison Valley forest walks avoiding crowds" },
        { name: "Kotagiri", description: "Older quieter hill station with Catherine Falls and tea gardens" },
      ],
      images: [
        "https://images.unsplash.com/photo-1599593252445-66795f661c9e?q=80&w=1200",
        "https://images.unsplash.com/photo-1698295624794-c2c92e924a49?q=80&w=1200",
        "https://images.unsplash.com/photo-1548695024-db2736783d73?q=80&w=1200"
      ],
    },
    Chennai: {
      description: "The capital city, a vibrant blend of deep-rooted traditions and modern lifestyle, famous for its temples and beaches.",
      highlights: [
        "Marina Beach - 13km iconic stretch",
        "Parthasarathy Temple - Ancient shrine",
        "Government Museum - Historical artifacts",
      ],
      underrated: [
        { name: "Akkarai Beach", description: "Golden sands with calm waters away from city chaos" },
        { name: "Elliot Beach", description: "Quieter than Marina with local Tamil culture" },
      ],
      images: [
        "https://images.unsplash.com/photo-1582510003544-4b003b983597?q=80&w=1200",
        "https://images.unsplash.com/photo-1621832049280-9900c9e830e2?q=80&w=1200",
        "https://images.unsplash.com/photo-1570188236712-1f7c706d997d?q=80&w=1200"
      ],
    },
    Madurai: {
      description: "The cultural capital, one of the oldest inhabited cities in the world, centered around the majestic Meenakshi Amman Temple.",
      highlights: [
        "Meenakshi Amman Temple - Iconic Dravidian architecture",
        "Thirumalai Nayak Mahal - 17th century palace",
        "Vaigai Dam with scenic parks",
      ],
      underrated: [
        { name: "Thirupparankundram Temple", description: "Ancient rock-cut shrine 8km away with fewer visitors" },
        { name: "Alagar Koil", description: "Vishnu temple in scenic Alagar Hills" },
      ],
      images: [
        "https://images.unsplash.com/photo-1606214371708-30043817fa6c?q=80&w=1200",
        "https://images.unsplash.com/photo-1627814408226-e1376839aa6e?q=80&w=1200",
        "https://images.unsplash.com/photo-1590050853503-68d7120a4b08?q=80&w=1200"
      ],
    },
    Thanjavur: {
      description: "The Rice Bowl of Tamil Nadu, famous for its Great Living Chola Temples and Tanjore paintings.",
      highlights: [
        "Brihadeeswara Temple - UNESCO World Heritage Site",
        "Thanjavur Maratha Palace",
        "Saraswathi Mahal Library",
      ],
      underrated: [
        { name: "Punnainallur Mariamman Temple", description: "Historic temple with unique architecture" },
        { name: "Manora Fort", description: "Hexagonal tower overlooking the Bay of Bengal" },
      ],
      images: [
        "https://images.unsplash.com/photo-1621245781696-e24e104ae05d?q=80&w=1200",
        "https://images.unsplash.com/photo-1605649487212-47a4983a8b90?q=80&w=1200",
        "https://images.unsplash.com/photo-1605649487212-47a4983a8b90?q=80&w=1200"
      ]
    },
    Kanyakumari: {
      description: "The southernmost tip of mainland India, where the Arabian Sea, the Indian Ocean, and the Bay of Bengal meet.",
      highlights: [
        "Vivekananda Rock Memorial",
        "Thiruvalluvar Statue",
        "Kanyakumari Beach (Sunrise/Sunset)",
      ],
      underrated: [
        { name: "Vattakottai Fort", description: "Seaside fort with stunning views of the Western Ghats" },
        { name: "Mathur Aqueduct", description: "One of the longest and highest aqueducts in South Asia" }
      ],
      images: [
        "https://images.unsplash.com/photo-1591018507851-4e78263305ff?q=80&w=1200",
        "https://images.unsplash.com/photo-1647240398670-8d4844391ad9?q=80&w=1200",
        "https://images.unsplash.com/photo-1582298918903-8815197f26fc?q=80&w=1200"
      ]
    }
  }

  // Normalize input
  const normalizedInput = districtName.toLowerCase().trim();

  // Find matching key (case-insensitive)
  const matchedKey = Object.keys(districtData).find(
    (key) => key.toLowerCase() === normalizedInput
  );

  if (matchedKey) {
    return districtData[matchedKey];
  }

  // Fallback for missing districts
  return {
    description: `Discover the hidden gems of ${districtName}. While we curate more specific experiences for this region, explore its local culture and landscapes.`,
    highlights: [
      "Local Temples & Heritage Sites",
      "Traditional Markets & Cuisine",
      "Scenic Landscapes & Nature Walks"
    ],
    underrated: [],
    images: [
      "https://images.unsplash.com/photo-1582510003544-4b003b983597?q=80&w=1200", // Generic TN
      "https://images.unsplash.com/photo-1619629705973-1628d6556157?q=80&w=1200", // Generic Temple
      "https://images.unsplash.com/photo-1597825597950-8456de548842?q=80&w=1200"  // Generic Nature
    ],
  }
}
