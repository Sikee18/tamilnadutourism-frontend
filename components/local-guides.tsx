"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, MessageCircle, MapPin, Shield, Languages, Send } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useAuth } from "@/contexts/auth-context"

const guides = [
  {
    id: "1",
    name: "Murugan Shanmugam",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    languages: ["Tamil", "English", "Hindi"],
    expertise: ["Temple Architecture", "Classical Music", "History"],
    region: "Madurai & Thanjavur",
    rating: 4.9,
    tours: 234,
    certified: true,
  },
  {
    id: "2",
    name: "Lakshmi Venkataraman",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    languages: ["Tamil", "English", "French"],
    expertise: ["Chettinad Cuisine", "Textile Heritage", "Village Life"],
    region: "Chettinad Region",
    rating: 4.8,
    tours: 189,
    certified: true,
  },
  {
    id: "3",
    name: "Arjun Raghavan",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    languages: ["Tamil", "English", "German"],
    expertise: ["Wildlife", "Hill Stations", "Trekking"],
    region: "Nilgiris & Western Ghats",
    rating: 4.9,
    tours: 312,
    certified: true,
  },
]

export function LocalGuides() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { isAuthenticated, userRole } = useAuth()

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary text-sm font-sans tracking-[0.3em] uppercase mb-4">Authentic Connections</p>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-foreground mb-6">Why Local Guides Matter</h2>
            <p className="text-muted-foreground font-sans leading-relaxed mb-6">
              Tamil Nadu's richness lies in stories that aren't written in guidebooks. Our certified local guides are
              custodians of living knowledge — they share the rituals, legends, and hidden meanings that transform a
              visit into an experience.
            </p>
            <ul className="space-y-3 text-muted-foreground font-sans">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span>Deep cultural knowledge passed through generations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span>Access to local communities and authentic experiences</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span>Multi-language support for international visitors</span>
              </li>
            </ul>

            {isAuthenticated && userRole === "tourist" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8"
              >
                <Link
                  href="/request-guide"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-sans font-medium rounded-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
                >
                  <Send className="w-5 h-5" />
                  Request a Custom Tour
                </Link>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1534008897995-27a23e859048?w=800&q=80"
                alt="Local guide sharing knowledge"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {guides.map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
              className="bg-card rounded-2xl p-6 border border-border shadow-md cursor-pointer"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 ring-2 ring-primary/20">
                  <Image
                    src={guide.photo || `https://source.unsplash.com/featured/?Indian person,portrait,${guide.name}`}
                    alt={guide.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-serif text-foreground mb-1">{guide.name}</h3>
                    {guide.certified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-secondary/10 text-secondary text-xs font-sans rounded-sm">
                        <Shield className="w-3 h-3" />
                        Certified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-primary mb-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-sans font-medium">{guide.rating}</span>
                    <span className="text-muted-foreground text-sm font-sans">({guide.tours} tours)</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm font-sans">
                    <MapPin className="w-3 h-3" />
                    <span>{guide.region}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-muted-foreground font-sans uppercase tracking-wide mb-2 flex items-center gap-1">
                  <Languages className="w-3 h-3" />
                  Languages
                </p>
                <div className="flex flex-wrap gap-2">
                  {guide.languages.map((lang) => (
                    <span key={lang} className="px-2 py-1 bg-muted text-muted-foreground text-xs font-sans rounded-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-xs text-muted-foreground font-sans uppercase tracking-wide mb-2">Expertise</p>
                <div className="flex flex-wrap gap-2">
                  {guide.expertise.map((exp) => (
                    <span key={exp} className="px-2 py-1 bg-primary/10 text-primary text-xs font-sans rounded-sm">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={`/guides/${guide.id}`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-secondary text-secondary-foreground text-sm font-sans font-medium rounded-lg hover:bg-secondary/90 hover:shadow-md transition-all duration-300 cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Connect</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
        >
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm font-sans tracking-widest uppercase font-medium rounded-lg hover:bg-primary/90 hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-95"
          >
            Find Your Guide
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
