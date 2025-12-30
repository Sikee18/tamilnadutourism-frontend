"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Users, Trees } from "lucide-react"

const natureDestinations = [
  {
    id: "mudumalai",
    name: "Mudumalai Wildlife Sanctuary",
    location: "Nilgiris",
    image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800&q=80",
    description: "Home to elephants, tigers, and diverse wildlife in lush forests",
    wildlife: ["Elephants", "Tigers", "Leopards", "Deer"],
    crowdLevel: "moderate",
  },
  {
    id: "anamalai",
    name: "Anamalai Tiger Reserve",
    location: "Coimbatore",
    image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80",
    description: "Dense forests and pristine wilderness in the Western Ghats",
    wildlife: ["Tigers", "Elephants", "Gaur", "Birds"],
    crowdLevel: "calm",
  },
  {
    id: "point-calimere",
    name: "Point Calimere",
    location: "Nagapattinam",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80",
    description: "Coastal sanctuary famous for migratory birds",
    wildlife: ["Flamingos", "Pelicans", "Storks", "Dolphins"],
    crowdLevel: "calm",
  },
  {
    id: "meghamalai",
    name: "Meghamalai",
    location: "Theni",
    image: "https://images.unsplash.com/photo-1463130456104-e397c8d23456?q=80&w=800&auto=format&fit=crop",
    description: "Cloud-kissed mountains with tea estates and pristine forests",
    wildlife: ["Elephants", "Tigers", "Bison", "Deer"],
    crowdLevel: "calm",
  },
]

export default function NaturePage() {
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
            src="https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=1920&q=80"
            alt="Wildlife & Nature"
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
              Wildlife & Nature
            </h1>
            <p className="text-xl text-white/80 font-sans max-w-2xl">Biodiversity, sanctuaries, and natural wonders</p>
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
              Experience Wild Tamil Nadu
            </h2>
            <p className="text-muted-foreground font-sans leading-relaxed max-w-3xl">
              From the Western Ghats to coastal wetlands, Tamil Nadu's protected areas offer incredible biodiversity and
              opportunities to witness wildlife in their natural habitats.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {natureDestinations.map((destination, index) => (
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
                      {destination.crowdLevel === "calm" ? "Calm" : "Moderate"}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif text-foreground mb-2">{destination.name}</h3>
                  <p className="text-muted-foreground font-sans leading-relaxed mb-4">{destination.description}</p>

                  <div className="flex items-center gap-2">
                    <Trees className="w-4 h-4 text-primary" />
                    <div className="flex flex-wrap gap-2">
                      {destination.wildlife.map((animal) => (
                        <span
                          key={animal}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs font-sans rounded-sm"
                        >
                          {animal}
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
