export interface District {
  id: string
  name: string
  region: "northern" | "central" | "southern" | "western"
  crowdLevel: "calm" | "moderate" | "busy" | "very-busy"
  description?: string
}

export const DISTRICTS: District[] = [
  {
    id: "chennai",
    name: "Chennai",
    region: "northern",
    crowdLevel: "very-busy",
    description: "The capital city, a bustling metropolis with rich cultural heritage",
  },
  {
    id: "madurai",
    name: "Madurai",
    region: "southern",
    crowdLevel: "busy",
    description: "Ancient temple city with the famous Meenakshi Temple",
  },
  {
    id: "coimbatore",
    name: "Coimbatore",
    region: "western",
    crowdLevel: "busy",
    description: "Manchester of South India, known for textiles and industries",
  },
  {
    id: "thanjavur",
    name: "Thanjavur",
    region: "central",
    crowdLevel: "moderate",
    description: "Home to the magnificent Brihadeeswarar Temple",
  },
  {
    id: "tiruchirappalli",
    name: "Tiruchirappalli",
    region: "central",
    crowdLevel: "busy",
    description: "Rock Fort city with historic temples and monuments",
  },
  {
    id: "salem",
    name: "Salem",
    region: "northern",
    crowdLevel: "moderate",
    description: "Steel city surrounded by hills and known for mangoes",
  },
  {
    id: "tirunelveli",
    name: "Tirunelveli",
    region: "southern",
    crowdLevel: "moderate",
    description: "Ancient town with temples and the famous Halwa sweet",
  },
  {
    id: "vellore",
    name: "Vellore",
    region: "northern",
    crowdLevel: "moderate",
    description: "Historic fort city with renowned medical institutions",
  },
  {
    id: "nilgiris",
    name: "Nilgiris",
    region: "western",
    crowdLevel: "busy",
    description: "Queen of Hills, home to Ooty and scenic tea estates",
  },
  {
    id: "kanyakumari",
    name: "Kanyakumari",
    region: "southern",
    crowdLevel: "busy",
    description: "Southernmost tip of India where three seas meet",
  },
]
