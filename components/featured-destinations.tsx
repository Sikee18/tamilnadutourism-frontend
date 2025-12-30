"use client"
import Image from "next/image"
import Link from "next/link"
import { Users, Clock, TrendingUp, X } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const destinations = [
  {
    id: "mahabalipuram",
    name: "Mahabalipuram",
    subtitle: "UNESCO World Heritage",
    description: "Shore temples and rock-cut monuments of the Pallava dynasty",
    image: "https://images.unsplash.com/photo-1668618873985-5293acd8db61?fm=jpg&q=80&w=1200",
    crowdLevel: "moderate",
    bestTime: "Early Morning",
    advisory: "Popular destination - consider visiting on weekdays for a more peaceful experience",
    alternatives: ["Kanchipuram", "Pondicherry"],
    category: "Heritage",
    significance: "Mahabalipuram is a UNESCO World Heritage site known for its ancient temples and rock-cut monuments.",
    highlights: ["Shore temples", "Rock-cut monuments", "Pallava dynasty architecture"],
    district: "Tamil Nadu",
  },
  {
    id: "madurai",
    name: "Madurai",
    subtitle: "The Temple City",
    description: "Home to the magnificent Meenakshi Amman Temple",
    image: "https://images.unsplash.com/photo-1660122405026-02206229acc5?fm=jpg&q=80&w=1200",
    crowdLevel: "busy",
    bestTime: "6 AM - 8 AM",
    advisory: "This destination is currently busy - early morning visits recommended",
    alternatives: ["Thanjavur", "Rameswaram"],
    category: "Heritage",
    significance:
      "Madurai is renowned for its Meenakshi Amman Temple, a major Hindu temple dedicated to the goddess Meenakshi.",
    highlights: ["Meenakshi Amman Temple", "Chithiraalayar Temple", "Alagar Koil"],
    district: "Madurai",
  },
  {
    id: "ooty",
    name: "Ooty",
    subtitle: "Queen of Hill Stations",
    description: "Nestled in the Nilgiri mountains with emerald tea estates",
    image: "https://images.unsplash.com/photo-1734702239355-c07abd436421?fm=jpg&q=80&w=1200",
    crowdLevel: "very-busy",
    bestTime: "Weekdays",
    advisory: "Peak season - very busy on weekends. Consider visiting Yercaud or Kodaikanal for a quieter experience",
    alternatives: ["Yercaud", "Kodaikanal", "Valparai"],
    category: "Nature",
    significance:
      "Ooty, located in the Nilgiri mountains, is a popular hill station known for its tea gardens and scenic beauty.",
    highlights: ["Emerald tea estates", "Nilgiri mountains", "Government Museum"],
    district: "Nilgiris",
  },
  {
    id: "thanjavur",
    name: "Thanjavur",
    subtitle: "Cultural Capital",
    description: "The magnificent Brihadeeswara Temple and Chola heritage",
    image: "https://images.unsplash.com/photo-1616515155224-80c33c549bbf?fm=jpg&q=80&w=1200",
    crowdLevel: "calm",
    bestTime: "Afternoon",
    advisory: "Perfect time to visit - calm and peaceful atmosphere",
    alternatives: [],
    category: "Heritage",
    significance:
      "Thanjavur is a cultural capital of Tamil Nadu, famous for the Brihadeeswara Temple, a masterpiece of Dravidian architecture.",
    highlights: ["Brihadeeswara Temple", "Chola dynasty heritage", "Thiruvaiyaru Kalyanotsavam"],
    district: "Thanjavur",
  },
  {
    id: "kanyakumari",
    name: "Kanyakumari",
    subtitle: "Land's End",
    description: "Where three seas meet at India's southern tip",
    image: "https://images.unsplash.com/photo-1657265284292-ac60361140a5?fm=jpg&q=80&w=1200",
    crowdLevel: "moderate",
    bestTime: "Sunrise",
    advisory: "Moderate crowd levels - best experienced at sunrise",
    alternatives: ["Rameswaram"],
    category: "Nature",
    significance:
      "Kanyakumari is a coastal town at the southernmost tip of India, where the Arabian Sea, Bay of Bengal, and Indian Ocean converge.",
    highlights: ["Kanyakumari Beach", "Vishnu Temple", "Kapaleeswarar Temple"],
    district: "Kanyakumari",
  },
]

function CrowdIndicator({ level }: { level: string }) {
  const config = {
    calm: { label: "Calm", class: "crowd-calm" },
    moderate: { label: "Moderate", class: "crowd-moderate" },
    busy: { label: "Busy", class: "crowd-busy" },
    "very-busy": { label: "Very Busy", class: "crowd-very-busy" },
  }
  const { label, class: className } = config[level as keyof typeof config] || config.moderate

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-sans font-medium ${className}`}
    >
      <Users className="w-3 h-3" />
      {label}
    </span>
  )
}

function CrowdAdvisory({
  level,
  advisory,
  alternatives,
}: {
  level: string
  advisory: string
  alternatives: string[]
}) {
  if (level === "calm") return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-x-4 bottom-4 p-4 bg-black/80 backdrop-blur-md rounded-lg border border-white/20 z-10"
    >
      <div className="flex items-start gap-2 mb-2">
        <TrendingUp className="w-4 h-4 text-temple-gold shrink-0 mt-0.5" />
        <p className="text-white text-xs font-sans leading-relaxed">{advisory}</p>
      </div>
      {alternatives.length > 0 && (
        <div className="mt-2 pt-2 border-t border-white/10">
          <p className="text-white/60 text-xs font-sans mb-1">You may also enjoy:</p>
          <div className="flex flex-wrap gap-1.5">
            {alternatives.map((alt) => (
              <span key={alt} className="px-2 py-0.5 bg-white/10 text-white text-xs font-sans rounded-sm">
                {alt}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export function FeaturedDestinations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })
  const [selectedDestination, setSelectedDestination] = useState<(typeof destinations)[number] | null>(null)

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-sans tracking-[0.3em] uppercase mb-4">Iconic Landmarks</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-foreground mb-6">
            Featured Destinations
          </h2>
          <p className="text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed">
            Globally recognized heritage sites and natural wonders of Tamil Nadu
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide">
            <motion.div
              className="flex gap-6 pb-4"
              animate={{
                x: [0, -1500],
              }}
              transition={{
                x: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 50,
                  ease: "linear",
                },
              }}
            >
              {[...destinations, ...destinations].map((destination, index) => (
                <Link key={`${destination.id}-${index}`} href={`/explore/place/${destination.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.6, delay: (index % destinations.length) * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
                    className="relative flex-shrink-0 w-80 aspect-[3/4] rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover"
                      />
                    </motion.div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                      <CrowdIndicator level={destination.crowdLevel} />
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/40 backdrop-blur-sm rounded-full text-white text-xs font-sans">
                        <Clock className="w-3 h-3" />
                        {destination.bestTime}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 z-10">
                      <p className="text-temple-gold text-xs font-sans tracking-widest uppercase mb-2">
                        {destination.category}
                      </p>
                      <h3 className="text-white text-2xl md:text-3xl font-serif font-light mb-2">{destination.name}</h3>
                      <p className="text-white/70 text-sm font-sans leading-relaxed line-clamp-2">
                        {destination.description}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedDestination} onOpenChange={() => setSelectedDestination(null)}>
        <DialogContent className="max-w-2xl">
          {selectedDestination && (
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-serif font-light text-foreground mb-1">{selectedDestination.name}</h2>
                  <p className="text-sm text-muted-foreground">{selectedDestination.district} District</p>
                </div>
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-foreground mb-4">{selectedDestination.description}</p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-sans font-semibold text-sm mb-2">Cultural Significance</h3>
                  <p className="text-sm text-muted-foreground">{selectedDestination.significance}</p>
                </div>

                {selectedDestination.bestTime && (
                  <div>
                    <h3 className="font-sans font-semibold text-sm mb-2">Best Time to Visit</h3>
                    <p className="text-sm text-muted-foreground">{selectedDestination.bestTime}</p>
                  </div>
                )}

                <div>
                  <h3 className="font-sans font-semibold text-sm mb-2">Key Features</h3>
                  <ul className="space-y-1">
                    {selectedDestination.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedDestination.alternatives.length > 0 && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h3 className="font-sans font-semibold text-sm mb-2">Alternative Quieter Options</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedDestination.alternatives.map((alt, idx) => (
                        <span key={idx} className="px-3 py-1 bg-background rounded-full text-xs">
                          {alt}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
