"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Users, Clock, AlertTriangle, NavigationIcon, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRef } from "react"

type CrowdLevel = "calm" | "moderate" | "busy" | "very-busy"

interface Destination {
  id: string
  name: string
  subtitle: string
  description: string
  image: string
  crowdLevel: CrowdLevel
  bestTime: string
  category: string
}

interface DestinationContentProps {
  destination: Destination
}

function CrowdIndicator({ level }: { level: CrowdLevel }) {
  const config = {
    calm: { label: "Calm", class: "crowd-calm" },
    moderate: { label: "Moderate", class: "crowd-moderate" },
    busy: { label: "Busy", class: "crowd-busy" },
    "very-busy": { label: "Very Busy", class: "crowd-very-busy" },
  }
  const { label, class: className } = config[level]

  return (
    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${className}`}>
      <Users className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
    </span>
  )
}

function MicroCrowdHeatmap({ destinationName }: { destinationName: string }) {
  const zones = [
    { id: "entrance", label: "Entrance", crowd: "moderate", x: "20%", y: "30%" },
    { id: "main-area", label: "Main Area", crowd: "busy", x: "50%", y: "40%" },
    { id: "inner-sanctum", label: "Inner Sanctum", crowd: "very-busy", x: "50%", y: "60%" },
    { id: "garden", label: "Garden", crowd: "calm", x: "75%", y: "35%" },
  ]

  const colorMap: Record<string, string> = {
    calm: "fill-emerald-500/40 stroke-emerald-500",
    moderate: "fill-amber-500/40 stroke-amber-500",
    busy: "fill-orange-500/40 stroke-orange-500",
    "very-busy": "fill-red-500/40 stroke-red-500",
  }

  return (
    <div className="p-6 bg-gradient-to-br from-card to-muted/20 rounded-lg border border-border">
      <h3 className="text-lg font-medium text-foreground mb-2">Micro Crowd Heatmap</h3>
      <p className="text-xs text-muted-foreground mb-4">Simulated Crowd Insight (Pilot Feature)</p>

      <div className="relative w-full aspect-video bg-muted/30 rounded-lg border border-border overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Simple monument outline */}
          <rect x="30" y="20" width="40" height="60" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
          <polygon points="30,20 50,5 70,20" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />

          {/* Crowd zones */}
          {zones.map((zone) => (
            <g key={zone.id}>
              <circle cx={zone.x} cy={zone.y} r="8" className={colorMap[zone.crowd]} strokeWidth="1.5" opacity="0.8" />
            </g>
          ))}
        </svg>

        {/* Zone labels with tooltips */}
        <div className="absolute inset-0 pointer-events-none">
          {zones.map((zone) => (
            <div
              key={zone.id}
              className="absolute group cursor-pointer pointer-events-auto"
              style={{ left: zone.x, top: zone.y }}
            >
              <div className="absolute hidden group-hover:block bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap -translate-x-1/2 -translate-y-full -mt-2">
                {zone.label}: {zone.crowd}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-emerald-500/40 border border-emerald-500" />
          <span className="text-muted-foreground">Calm</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-amber-500/40 border border-amber-500" />
          <span className="text-muted-foreground">Moderate</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-orange-500/40 border border-orange-500" />
          <span className="text-muted-foreground">Busy</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/40 border border-red-500" />
          <span className="text-muted-foreground">Very Busy</span>
        </div>
      </div>
    </div>
  )
}

export function DestinationContent({ destination }: DestinationContentProps) {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])

  const getAlternatives = (id: string, category: string) => {
    const alternatives: Record<
      string,
      Array<{ name: string; reason: string; slug: string; crowdLevel: CrowdLevel }>
    > = {
      madurai: [
        { name: "Thanjavur", reason: "Similar Chola temple architecture", slug: "thanjavur", crowdLevel: "calm" },
        { name: "Srivilliputhur", reason: "Quieter pilgrimage experience", slug: "srivilliputhur", crowdLevel: "calm" },
        { name: "Tiruchendur", reason: "Coastal temple with fewer crowds", slug: "tiruchendur", crowdLevel: "calm" },
      ],
      ooty: [
        { name: "Yercaud", reason: "Serene hill station alternative", slug: "yercaud", crowdLevel: "calm" },
        {
          name: "Kodaikanal",
          reason: "Less commercialized hill experience",
          slug: "kodaikanal",
          crowdLevel: "moderate",
        },
        { name: "Valparai", reason: "Pristine tea estates", slug: "valparai", crowdLevel: "calm" },
      ],
      mahabalipuram: [
        { name: "Kanchipuram", reason: "Rich temple architecture", slug: "kanchipuram", crowdLevel: "moderate" },
        { name: "Pondicherry", reason: "Coastal heritage town", slug: "pondicherry", crowdLevel: "moderate" },
      ],
    }
    return alternatives[id] || []
  }

  const shouldShowRerouting = destination.crowdLevel === "busy" || destination.crowdLevel === "very-busy"
  const alternatives = shouldShowRerouting ? getAlternatives(destination.id, destination.category) : []

  return (
    <>
      {/* Hero with parallax */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[600px] overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <Image
            src={destination.image || `https://source.unsplash.com/featured/?${destination.name},landmark`}
            alt={destination.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </motion.div>

        <div className="relative h-full container mx-auto px-6 flex flex-col justify-end pb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="inline-block text-temple-gold text-sm tracking-widest uppercase mb-4">
              {destination.subtitle}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-light text-white mb-6">{destination.name}</h1>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <CrowdIndicator level={destination.crowdLevel} />
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full text-white text-sm">
                <Clock className="w-4 h-4" />
                Best Time: {destination.bestTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Travel Advisory */}
          {shouldShowRerouting && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 p-6 bg-amber-500/10 border border-amber-500/30 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">High Traffic Alert</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    This destination is currently experiencing high visitor traffic. Consider visiting during off-peak
                    hours or explore the quieter alternatives suggested below.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Description */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <p className="text-xl text-foreground leading-relaxed">{destination.description}</p>
          </motion.div>

          {/* Micro Crowd Heatmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <MicroCrowdHeatmap destinationName={destination.name} />
          </motion.div>

          {/* Rerouting Alternatives */}
          {alternatives.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-16 p-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-border"
            >
              <div className="flex items-center gap-3 mb-6">
                <NavigationIcon className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-serif font-light text-foreground">Prefer a Quieter Experience?</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                {destination.name} is very busy right now. Consider these similar destinations for a calmer experience:
              </p>

              <div className="space-y-4">
                {alternatives.map((alt) => (
                  <motion.div
                    key={alt.slug}
                    whileHover={{ x: 4 }}
                    className="p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-foreground mb-1">{alt.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{alt.reason}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-emerald-500 flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            Currently {alt.crowdLevel === "calm" ? "Calm" : "Moderate"}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/destinations/${alt.slug}`}
                        className="ml-4 px-4 py-2 bg-primary text-primary-foreground text-sm rounded-sm hover:bg-primary/90 transition-colors"
                      >
                        Explore
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Back to Explore */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Back to Explore
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
