"use client"

import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Clock, Target, ShoppingBag } from "lucide-react"
import { Card } from "@/components/ui/card"
import { FEATURED_DESTINATIONS, UNDERRATED_PLACES } from "@/lib/tourism-data"

const PLACE_ACTIVITIES: Record<
  string,
  Array<{ name: string; description: string; duration: string; bestTime: string }>
> = {
  "brihadeeswara-temple": [
    {
      name: "Guided Temple Architecture Walk",
      description: "Expert-led tour of Chola dynasty architectural marvels and hidden details",
      duration: "2 hours",
      bestTime: "Early morning (6-8 AM)",
    },
    {
      name: "Cultural Performance Viewing",
      description: "Watch traditional Bharatanatyam performances in temple courtyard",
      duration: "1 hour",
      bestTime: "Evening (6-7 PM)",
    },
    {
      name: "Heritage Photography Tour",
      description: "Capture stunning gopuram and vimana structures with golden hour lighting",
      duration: "1.5 hours",
      bestTime: "Sunset (5-6:30 PM)",
    },
    {
      name: "Royal Museum Visit",
      description: "Explore adjacent palace museum with Chola artifacts and manuscripts",
      duration: "1 hour",
      bestTime: "Afternoon (2-4 PM)",
    },
  ],
  mahabalipuram: [
    {
      name: "Shore Temple Sunrise Visit",
      description: "Experience the iconic temple complex bathed in golden morning light",
      duration: "1.5 hours",
      bestTime: "Sunrise (5:30-7 AM)",
    },
    {
      name: "Rock-Cut Cave Exploration",
      description: "Discover ancient Pallava cave temples and intricate bas-reliefs",
      duration: "2 hours",
      bestTime: "Morning (8-10 AM)",
    },
    {
      name: "Sculpture Workshop Experience",
      description: "Watch master stone carvers create traditional sculptures",
      duration: "1 hour",
      bestTime: "Afternoon (3-5 PM)",
    },
    {
      name: "Beach Sunset Walk",
      description: "Stroll along the historic coastline with temple views",
      duration: "1 hour",
      bestTime: "Sunset (5:30-6:30 PM)",
    },
  ],
  "meenakshi-temple": [
    {
      name: "Temple Complex Tour",
      description: "Navigate the vast complex and learn mythology behind each shrine",
      duration: "2.5 hours",
      bestTime: "Morning (7-9:30 AM)",
    },
    {
      name: "Thousand Pillar Hall Visit",
      description: "Marvel at the engineering feat with carved pillars",
      duration: "45 minutes",
      bestTime: "Morning (9-11 AM)",
    },
    {
      name: "Evening Aarti Ceremony",
      description: "Participate in the divine lamp ritual and chanting",
      duration: "1 hour",
      bestTime: "Evening (8-9 PM)",
    },
    {
      name: "Madurai Cultural Walk",
      description: "Explore surrounding heritage streets and traditional markets",
      duration: "2 hours",
      bestTime: "Afternoon (3-5 PM)",
    },
  ],
  ooty: [
    {
      name: "Toy Train Ride",
      description: "Scenic journey on UNESCO heritage Nilgiri Mountain Railway",
      duration: "3 hours",
      bestTime: "Morning (9 AM-12 PM)",
    },
    {
      name: "Tea Estate Tour & Tasting",
      description: "Learn tea processing and sample premium Nilgiri varieties",
      duration: "2 hours",
      bestTime: "Afternoon (2-4 PM)",
    },
    {
      name: "Doddabetta Peak Trek",
      description: "Hike to the highest point with panoramic valley views",
      duration: "2.5 hours",
      bestTime: "Early morning (5:30-8 AM)",
    },
    {
      name: "Ooty Lake Boating",
      description: "Peaceful paddle boat experience surrounded by eucalyptus",
      duration: "1 hour",
      bestTime: "Evening (4-6 PM)",
    },
  ],
  kanyakumari: [
    {
      name: "Triveni Sangamam Viewing",
      description: "Witness the confluence of three seas with distinct colors",
      duration: "1 hour",
      bestTime: "Morning (6-8 AM)",
    },
    {
      name: "Vivekananda Rock Memorial Visit",
      description: "Ferry ride to the meditation rock with historical significance",
      duration: "2 hours",
      bestTime: "Morning (8-10 AM)",
    },
    {
      name: "Sunrise & Sunset Experience",
      description: "Unique opportunity to see both from the same spot",
      duration: "30 minutes each",
      bestTime: "Dawn & Dusk",
    },
    {
      name: "Coastal Temple Trail",
      description: "Visit ancient Kumari Amman and nearby coastal shrines",
      duration: "1.5 hours",
      bestTime: "Afternoon (3-5 PM)",
    },
  ],
}

const PLACE_SHOPS: Record<string, Array<{ category: string; popularFor: string; culturalRelevance: string }>> = {
  "brihadeeswara-temple": [
    {
      category: "Thanjavur Paintings",
      popularFor: "Traditional gold leaf artwork and deity portraits",
      culturalRelevance: "Ancient Chola dynasty art form passed through generations",
    },
    {
      category: "Bronze Statues",
      popularFor: "Handcrafted temple deities using lost-wax casting",
      culturalRelevance: "Continuation of Chola bronze sculpture tradition",
    },
    {
      category: "Temple Jewelry",
      popularFor: "Antique-style gold replicas and traditional adornments",
      culturalRelevance: "Mirrors temple deity ornamentation customs",
    },
  ],
  mahabalipuram: [
    {
      category: "Stone Sculptures",
      popularFor: "Hand-carved granite deities and garden ornaments",
      culturalRelevance: "Living tradition of Pallava dynasty stone masonry",
    },
    {
      category: "Shell Craft Markets",
      popularFor: "Seashell jewelry and decorative items",
      culturalRelevance: "Coastal heritage craft using local materials",
    },
    {
      category: "Silk Textiles",
      popularFor: "Kanchipuram silk sarees and traditional fabrics",
      culturalRelevance: "Temple city weaving heritage nearby",
    },
  ],
  "meenakshi-temple": [
    {
      category: "Temple Street Bazaars",
      popularFor: "Religious items, flowers, and traditional sweets",
      culturalRelevance: "Supports temple rituals and pilgrim needs",
    },
    {
      category: "Madurai Cotton Fabrics",
      popularFor: "Handloom textiles and traditional lungis",
      culturalRelevance: "Ancient textile trade center heritage",
    },
    {
      category: "Brass & Copper Vessels",
      popularFor: "Traditional cooking and worship utensils",
      culturalRelevance: "Essential for authentic Tamil cuisine and rituals",
    },
  ],
  ooty: [
    {
      category: "Tea Boutiques",
      popularFor: "Premium Nilgiri teas and blends",
      culturalRelevance: "Colonial-era plantation heritage product",
    },
    {
      category: "Homemade Chocolates",
      popularFor: "Artisan chocolates and confections",
      culturalRelevance: "Hill station specialty since British era",
    },
    {
      category: "Eucalyptus Oil & Soaps",
      popularFor: "Natural wellness products from local trees",
      culturalRelevance: "Utilizes iconic Nilgiri flora",
    },
  ],
  kanyakumari: [
    {
      category: "Seashell Handicrafts",
      popularFor: "Unique souvenirs made from ocean shells",
      culturalRelevance: "Coastal craft tradition of the southernmost tip",
    },
    {
      category: "Kumari Amman Offerings",
      popularFor: "Temple-specific religious items and flowers",
      culturalRelevance: "Supports ancient virgin goddess worship tradition",
    },
    {
      category: "Local Spice Markets",
      popularFor: "Fresh coastal spices and dried seafood",
      culturalRelevance: "Maritime trade route heritage",
    },
  ],
}

export default function PlaceDetailPage() {
  const params = useParams()
  const placeId = params.placeId as string

  const allPlaces = [...FEATURED_DESTINATIONS, ...UNDERRATED_PLACES]
  const place = allPlaces.find((p) => p.id === placeId)

  if (!place) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Place not found</p>
      </main>
    )
  }

  const activities = PLACE_ACTIVITIES[placeId] || []
  const shops = PLACE_SHOPS[placeId] || []

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={`https://source.unsplash.com/featured/?${place.name},Tamil Nadu,landmark`}
            alt={place.name}
            fill
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-sans">Back to Explore</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white mb-4">{place.name}</h1>
            <div className="flex items-center gap-2 text-white/80 mb-4">
              <MapPin className="w-5 h-5" />
              <span className="text-lg font-sans">{place.district} District</span>
            </div>
            <p className="text-xl text-white/90 font-sans max-w-2xl leading-relaxed">{place.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground">Activities in This Place</h2>
            </div>
            <p className="text-muted-foreground font-sans text-lg">Discover experiences unique to {place.name}</p>
          </motion.div>

          {activities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow h-full">
                    <h3 className="text-xl font-serif font-semibold text-foreground mb-3">{activity.name}</h3>
                    <p className="text-muted-foreground font-sans mb-4 leading-relaxed">{activity.description}</p>

                    <div className="space-y-2 pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="font-sans text-foreground">
                          <strong>Duration:</strong> {activity.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Target className="w-4 h-4 text-primary" />
                        <span className="font-sans text-foreground">
                          <strong>Best Time:</strong> {activity.bestTime}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground font-sans">Activity information coming soon for this location.</p>
            </Card>
          )}
        </div>
      </section>

      {/* Shops & Markets Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground">
                Shops & Markets in This Place
              </h2>
            </div>
            <p className="text-muted-foreground font-sans text-lg">Explore local crafts and cultural treasures</p>
          </motion.div>

          {shops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {shops.map((shop, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow h-full">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center mb-4">
                      <ShoppingBag className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-lg font-serif font-semibold text-foreground mb-3">{shop.category}</h3>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                          Popular For
                        </p>
                        <p className="text-sm font-sans text-foreground">{shop.popularFor}</p>
                      </div>

                      <div>
                        <p className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                          Cultural Relevance
                        </p>
                        <p className="text-sm font-sans text-foreground italic">{shop.culturalRelevance}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground font-sans">Shop information coming soon for this location.</p>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
