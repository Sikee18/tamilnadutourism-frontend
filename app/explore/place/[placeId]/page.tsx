import { FEATURED_DESTINATIONS, UNDERRATED_PLACES } from "@/lib/tourism-data"
import { PlaceDetailContent } from "@/components/place-detail-content"

// Generate static params for all places
export async function generateStaticParams() {
  const allPlaces = [...FEATURED_DESTINATIONS, ...UNDERRATED_PLACES]
  return allPlaces.map((place) => ({
    placeId: place.id,
  }))
}

export default async function PlaceDetailPage({ params }: { params: Promise<{ placeId: string }> }) {
  const { placeId } = await params
  return <PlaceDetailContent placeId={placeId} />
}
