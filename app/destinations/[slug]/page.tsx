import { ALL_DISTRICTS } from "@/lib/tourism-data"
import { DestinationContent } from "@/components/destination-content"

// Generate static params for all districts
export async function generateStaticParams() {
  return ALL_DISTRICTS.map((district) => ({
    slug: district.name.toLowerCase(),
  }))
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Find key district info
  const districtInfo = ALL_DISTRICTS.find(
    (d) => d.name.toLowerCase() === slug.toLowerCase()
  ) || {
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    region: "Tamil Nadu",
    identity: "Explore the unseen beauty of Tamil Nadu",
  }

  return <DestinationContent slug={slug} districtInfo={districtInfo} />
}
