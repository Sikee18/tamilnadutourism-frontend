"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { MapPin } from "lucide-react"

const districts = [
  {
    id: "chennai",
    name: "Chennai",
    tagline: "Urban Heritage",
    image: "https://images.unsplash.com/photo-1644852037516-95c8fba481f9?fm=jpg&q=80&w=1600",
    href: "/destinations/chennai",
  },
  {
    id: "madurai",
    name: "Madurai",
    tagline: "Temple City",
    image: "https://images.unsplash.com/photo-1646056385288-46b2ce4ca4f8?fm=jpg&q=80&w=1600",
    href: "/destinations/madurai",
  },
  {
    id: "coimbatore",
    name: "Coimbatore",
    tagline: "Manchester of South",
    image: "https://images.unsplash.com/photo-1609609830354-8f615d61b9c8?fm=jpg&q=80&w=1600",
    href: "/destinations/coimbatore",
  },
  {
    id: "tiruchirappalli",
    name: "Tiruchirappalli",
    tagline: "Rock Fort City",
    image: "https://images.unsplash.com/photo-1660122405026-02206229acc5?fm=jpg&q=80&w=1600",
    href: "/destinations/tiruchirappalli",
  },
  {
    id: "salem",
    name: "Salem",
    tagline: "Steel City",
    image: "https://images.unsplash.com/photo-1724280984378-3acbecac83df?fm=jpg&q=80&w=1600",
    href: "/destinations/salem",
  },
  {
    id: "tirunelveli",
    name: "Tirunelveli",
    tagline: "Temple Town",
    image: "https://images.unsplash.com/photo-1677935405218-2f5bbc997c66?fm=jpg&q=80&w=1600",
    href: "/destinations/tirunelveli",
  },
  {
    id: "kanyakumari",
    name: "Kanyakumari",
    tagline: "Land's End",
    image: "https://images.unsplash.com/photo-1657265284292-ac60361140a5?fm=jpg&q=80&w=1600",
    href: "/destinations/kanyakumari",
  },
  {
    id: "ooty",
    name: "Nilgiris (Ooty)",
    tagline: "Queen of Hills",
    image: "https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?fm=jpg&q=80&w=1600",
    href: "/destinations/nilgiris",
  },
]

function DistrictPalette() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-sans tracking-[0.3em] uppercase mb-4">Regional Diversity</p>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-foreground mb-6">District Palette</h2>
          <p className="text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed">
            Each district of Tamil Nadu tells a unique story, painted with its own colors and character
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {districts.map((district, index) => (
            <Link key={district.id} href={district.href}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                className="group relative h-48 rounded-lg overflow-hidden cursor-pointer"
              >
                {/* Image Background */}
                <div className="absolute inset-0">
                  <img
                    src={district.image}
                    alt={district.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Content */}
                <motion.div
                  className="absolute inset-0 p-4 flex flex-col justify-between"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <div className="flex items-start justify-between">
                    <MapPin className="w-5 h-5 text-white/90" />
                  </div>

                  <div>
                    <h3 className="text-white text-lg font-serif mb-1 text-balance">{district.name}</h3>
                    <p className="text-white/80 text-xs font-sans text-balance">{district.tagline}</p>
                  </div>
                </motion.div>

                {/* Hover border effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-white/0 rounded-lg pointer-events-none"
                  whileHover={{ borderColor: "rgba(255,255,255,0.4)" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export { DistrictPalette }
