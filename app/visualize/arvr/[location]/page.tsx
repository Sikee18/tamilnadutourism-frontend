import { ARVRClient } from "@/components/arvr-client"

// List of all locations used in VisualizeMap
const ARVR_LOCATIONS = [
    // Chennai
    "Marina Beach", "Besant Nagar Beach", "DakshinaChitra",
    // Madurai
    "Meenakshi Amman Temple", "Thirumalai Nayakkar Mahal", "Alagar Kovil",
    // Nilgiris
    "Ooty Botanical Gardens", "Kotagiri", "Avalanche Lake",
    // Kanyakumari
    "Vivekananda Rock Memorial", "Vattakottai Fort", "Mathur Aqueduct",
    // Thanjavur
    "Brihadisvara Temple", "Gangaikonda Cholapuram", "Saraswathi Mahal Library",
    // Coimbatore
    "Marudamalai Temple", "Adiyogi Shiva Statue", "Vydehi Falls",
    // Rameswaram
    "Ramanathaswamy Temple", "Dhanushkodi", "Pamban Bridge",
    // Tiruchirappalli
    "Rockfort Temple", "Jambukeswarar Temple", "Butterfly Park"
]

export async function generateStaticParams() {
    return ARVR_LOCATIONS.map((location) => ({
        location: location, // Next.js handles encoding, but we pass the raw string here matching the path
    }))
}

export default async function ARVRPage({ params }: { params: Promise<{ location: string }> }) {
    const { location } = await params
    return <ARVRClient location={location} />
}
