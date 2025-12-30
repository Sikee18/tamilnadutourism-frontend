"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Users, Clock } from "lucide-react"

const spiritualDestinations = [
  {
    id: "meenakshi-temple",
    name: "Meenakshi Amman Temple",
    location: "Madurai",
    image: "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800&q=80",
    description: "Magnificent Dravidian architecture with towering gopurams",
    era: "6th Century CE",
    crowdLevel: "busy",
    bestTime: "6 AM - 8 AM",
  },
  {
    id: "brihadeeswarar",
    name: "Brihadeeswarar Temple",
    location: "Thanjavur",
    image: "https://images.unsplash.com/photo-1605649487212-47a4983a8b90?w=800&q=80",
    description: "UNESCO World Heritage site and marvel of Chola architecture",
    era: "11th Century CE",
    crowdLevel: "calm",
    bestTime: "Afternoon",
  },
  {
    id: "rameshwaram-temple",
    name: "Ramanathaswamy Temple",
    location: "Rameshwaram",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80",
    description: "One of the twelve Jyotirlinga shrines with the longest corridor",
    era: "12th Century CE",
    crowdLevel: "busy",
    bestTime: "Early Morning",
  },
  {
    id: "shore-temple",
    name: "Shore Temple",
    location: "Mahabalipuram",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "Ancient temple complex facing the Bay of Bengal",
    era: "8th Century CE",
    crowdLevel: "moderate",
    bestTime: "Sunrise/Sunset",
  },
]

export default function SpiritualPage() {
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
            src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1920&q=80"
            alt="Temples & Spirituality"
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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white mb-4">
              Temples & Spirituality
            </h1>
            <p className="text-xl text-white/80 font-sans max-w-2xl">
              Sacred spaces, divine architecture, and spiritual journeys
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
              Journey Through Sacred Spaces
            </h2>
            <p className="text-muted-foreground font-sans leading-relaxed max-w-3xl">
              Tamil Nadu is home to some of India's most magnificent temples, showcasing centuries of architectural
              brilliance and spiritual devotion. Each temple tells a story of dynasties, devotees, and divine grace.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {spiritualDestinations.map((destination, index) => (
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
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-sans">
                    {destination.era}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground flex-wrap">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {destination.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {destination.bestTime}
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
                  <p className="text-muted-foreground font-sans leading-relaxed">{destination.description}</p>
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
