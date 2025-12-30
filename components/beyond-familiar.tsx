"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { UNDERRATED_PLACES } from "@/lib/tourism-data"

export function BeyondFamiliar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const displayedPlaces = UNDERRATED_PLACES.slice(0, 4)

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-secondary/80 text-sm font-sans tracking-[0.3em] uppercase mb-4">Hidden Treasures</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-foreground/90 mb-6">
            The Roads Less Traveled
          </h2>
          <p className="text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed">
            Discover lesser-known places that reveal the authentic soul of Tamil Nadu
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {displayedPlaces.map((place, index) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
              whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.3 } }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md group cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={(place as any).image} // Type assertion since specific images were just added
                  alt={place.name}
                  fill
                  className="object-cover"
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                <span className="text-[10px] text-white/60 font-sans uppercase tracking-wider mb-1 block">
                  {place.district}
                </span>
                <h3 className="text-white text-base lg:text-lg font-serif mb-1">{place.name}</h3>
                <p className="text-white/70 text-xs font-sans line-clamp-2">{place.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-10"
        >
          <Link
            href="/explore/underrated"
            className="inline-flex items-center gap-2 text-secondary/70 hover:text-secondary transition-colors font-sans hover:gap-3 duration-300"
          >
            <span className="text-sm tracking-widest uppercase">Discover More Hidden Gems</span>
            <svg className="w-4 h-4 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
