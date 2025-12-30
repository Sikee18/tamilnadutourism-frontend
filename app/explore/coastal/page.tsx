"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Users, Waves } from "lucide-react"

const coastalDestinations = [
  {
    id: "marina-beach",
    name: "Marina Beach",
    location: "Chennai",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    description: "India's longest urban beach, perfect for morning walks and sunset views",
    activities: ["Walking", "Street Food", "Photography"],
    crowdLevel: "busy",
  },
  {
    id: "mahabalipuram",
    name: "Mahabalipuram Beach",
    location: "Mahabalipuram",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "Historic shore with ancient temples and pristine sands",
    activities: ["Temple Visit", "Beach", "Shopping"],
    crowdLevel: "moderate",
  },
  {
    id: "rameshwaram",
    name: "Rameshwaram",
    location: "Rameshwaram Island",
    image: "https://images.unsplash.com/photo-1605649487162-851d54e5e58c?w=800&q=80",
    description: "Sacred island with turquoise waters and spiritual significance",
    activities: ["Temple", "Beach", "Pilgrimage"],
    crowdLevel: "busy",
  },
  {
    id: "tranquebar",
    name: "Tranquebar",
    location: "Nagapattinam",
    image: "https://images.unsplash.com/photo-1627889397753-1577717462d7?q=80&w=800&auto=format&fit=crop",
    description: "Danish colonial heritage meets serene coastline",
    activities: ["Heritage", "Beach", "Photography"],
    crowdLevel: "calm",
  },
]

export default function CoastalPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="relative h-[60vh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80"
            alt="Coastal Life"
            fill
            className="object-cover"
          />
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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white mb-4">Coastal Life</h1>
            <p className="text-xl text-white/80 font-sans max-w-2xl">
              Pristine shores, fishing villages, and maritime heritage
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-6">
              Discover Tamil Nadu's Coastline
            </h2>
            <p className="text-muted-foreground font-sans leading-relaxed max-w-3xl">
              With over 1,000 kilometers of coastline along the Bay of Bengal and Indian Ocean, Tamil Nadu offers
              diverse coastal experiences from bustling urban beaches to serene fishing villages.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coastalDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-card rounded-2xl overflow-hidden shadow-md border border-border group cursor-pointer"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {destination.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {destination.crowdLevel === "calm"
                        ? "Calm"
                        : destination.crowdLevel === "moderate"
                          ? "Moderate"
                          : "Busy"}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif text-foreground mb-2">{destination.name}</h3>
                  <p className="text-muted-foreground font-sans leading-relaxed mb-4">{destination.description}</p>

                  <div className="flex items-center gap-2">
                    <Waves className="w-4 h-4 text-primary" />
                    <div className="flex flex-wrap gap-2">
                      {destination.activities.map((activity) => (
                        <span
                          key={activity}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs font-sans rounded-sm"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
