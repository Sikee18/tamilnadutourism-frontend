"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin } from "lucide-react"
import { UNDERRATED_PLACES } from "@/lib/tourism-data"

const placesByRegion = UNDERRATED_PLACES.reduce(
  (acc, place) => {
    if (!acc[place.region]) {
      acc[place.region] = []
    }
    acc[place.region].push(place)
    return acc
  },
  {} as Record<string, typeof UNDERRATED_PLACES>,
)

export default function UnderratedPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image src="/tamil-nadu-hidden-places.jpg" alt="Hidden Places" fill className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-sans">Back to Home</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white mb-4">Hidden Treasures</h1>
            <p className="text-xl text-white/80 font-sans max-w-2xl">
              Lesser-known places that reveal authentic Tamil Nadu
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          {Object.entries(placesByRegion).map(([region, places], regionIndex) => (
            <div key={region} className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif font-light text-foreground mb-8 border-b border-border pb-3">
                {region}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {places.map((place, index) => (
                  <motion.div
                    key={place.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: regionIndex * 0.1 + index * 0.05 }}
                    className="bg-card rounded-xl overflow-hidden shadow-md border border-border hover:shadow-lg transition-shadow"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={`/.jpg?height=300&width=400&query=${place.name}`}
                        alt={place.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4" />
                        {place.district}
                      </div>

                      <h3 className="text-xl font-serif text-foreground mb-2">{place.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{place.description}</p>

                      <div className="pt-3 border-t border-border">
                        <p className="text-xs text-foreground/70">
                          <span className="font-semibold">Why visit:</span> {place.why}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
