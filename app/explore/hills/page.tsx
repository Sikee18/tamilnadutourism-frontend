"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Users, CloudRain } from "lucide-react"

const hillStations = [
  {
    id: "ooty",
    name: "Ooty",
    altitude: "2,240m",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    description: "The Queen of Hill Stations with scenic tea gardens and colonial charm",
    bestTime: "Mar-Jun, Sep-Nov",
    crowdLevel: "busy",
  },
  {
    id: "kodaikanal",
    name: "Kodaikanal",
    altitude: "2,133m",
    image: "https://images.unsplash.com/photo-1549419102-132d7515a452?q=80&w=800&auto=format&fit=crop",
    description: "The Princess of Hill Stations surrounded by misty mountains",
    bestTime: "Apr-Jun, Sep-Oct",
    crowdLevel: "moderate",
  },
  {
    id: "yercaud",
    name: "Yercaud",
    altitude: "1,515m",
    image: "https://images.unsplash.com/photo-1633519391054-c9b2d30810d2?q=80&w=800&auto=format&fit=crop",
    description: "The Jewel of the South with coffee plantations and serene lakes",
    bestTime: "Oct-Jun",
    crowdLevel: "calm",
  },
  {
    id: "valparai",
    name: "Valparai",
    altitude: "1,400m",
    image: "https://images.unsplash.com/photo-1558908480-e83c07657929?q=80&w=800&auto=format&fit=crop",
    description: "Untouched beauty with tea estates and wildlife",
    bestTime: "Sep-May",
    crowdLevel: "calm",
  },
]

export default function HillsPage() {
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
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
            alt="Hills & Nature"
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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white mb-4">Hills & Nature</h1>
            <p className="text-xl text-white/80 font-sans max-w-2xl">Misty peaks, tea gardens, and serene landscapes</p>
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
            <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-6">Escape to the Mountains</h2>
            <p className="text-muted-foreground font-sans leading-relaxed max-w-3xl">
              Tamil Nadu's hill stations offer a refreshing escape from the heat of the plains. Experience cool
              climates, stunning views, and the tranquility of nature in these mountain retreats.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {hillStations.map((station, index) => (
              <motion.div
                key={station.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-card rounded-2xl overflow-hidden shadow-md border border-border group cursor-pointer"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={station.image || "/placeholder.svg"}
                    alt={station.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-sans">
                    {station.altitude}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground flex-wrap">
                    <span className="inline-flex items-center gap-1">
                      <CloudRain className="w-4 h-4" />
                      {station.bestTime}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {station.crowdLevel === "calm" ? "Calm" : station.crowdLevel === "moderate" ? "Moderate" : "Busy"}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif text-foreground mb-2">{station.name}</h3>
                  <p className="text-muted-foreground font-sans leading-relaxed">{station.description}</p>
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
