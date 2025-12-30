"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"

const experiences = [
  {
    id: "culture",
    title: "Culture & Heritage",
    description: "Ancient traditions, classical arts, and living heritage",
    image: "https://images.unsplash.com/photo-1746983062953-74c19d0dfc5d?auto=format&fit=crop&q=80",
    href: "/explore/culture",
  },
  {
    id: "hills",
    title: "Hills & Nature",
    description: "Misty peaks, tea gardens, and serene landscapes",
    image: "https://images.unsplash.com/photo-1760884966322-207bd5afdd77?auto=format&fit=crop&q=80",
    href: "/explore/hills",
  },
  {
    id: "spiritual",
    title: "Temples & Spirituality",
    description: "Sacred spaces, divine architecture, and spiritual journeys",
    image: "https://images.unsplash.com/photo-1701665837448-cdbb9fab5a0d?auto=format&fit=crop&q=80",
    href: "/explore/spiritual",
  },
  {
    id: "coastal",
    title: "Coastal Life",
    description: "Pristine shores, fishing villages, and maritime heritage",
    image: "https://images.unsplash.com/photo-1724992609108-0918470cb673?auto=format&fit=crop&q=80",
    href: "/explore/coastal",
  },
  {
    id: "nature",
    title: "Wildlife & Nature",
    description: "Biodiversity, sanctuaries, and natural wonders",
    image: "https://images.unsplash.com/photo-1707455090980-a1e40f2ace15?auto=format&fit=crop&q=80",
    href: "/explore/nature",
  },
]

export function ExperienceCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-sans tracking-[0.3em] uppercase mb-4">Choose Your Path</p>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-foreground mb-6">Explore by Experience</h2>
          <p className="text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed">
            Tamil Nadu offers a tapestry of experiences, each thread woven with centuries of tradition and natural
            beauty
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {experiences.map((experience, index) => (
            <Link key={experience.id} href={experience.href}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                className="group relative h-96 rounded-xl overflow-hidden shadow-lg border border-border bg-card cursor-pointer"
              >
                {/* Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
                    className="w-full h-full"
                  >
                    <Image
                      src={experience.image || "/placeholder.svg"}
                      alt={experience.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Content */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  initial={{ y: 0 }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <h3 className="text-white text-2xl font-serif mb-2 text-balance">{experience.title}</h3>
                  <p className="text-white/80 text-sm font-sans leading-relaxed mb-4 text-balance">
                    {experience.description}
                  </p>

                  <div className="flex items-center gap-2 text-white text-sm font-sans font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Discover</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </motion.div>

                {/* Hover lift shadow effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
                  whileHover={{
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                  }}
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
