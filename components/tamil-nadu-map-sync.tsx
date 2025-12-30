"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DISTRICTS } from "@/lib/districts-data"
import { Users } from "lucide-react"
import { useRouter } from "next/navigation"

interface TamilNaduMapWithSyncProps {
  highlightedDistrict: string | null
  onDistrictSelect: (districtId: string) => void
}

// SVG paths for all 38 districts (simplified representation)
const districtPaths = [
  {
    id: "chennai",
    name: "Chennai",
    path: "M 380 180 L 400 170 L 420 185 L 415 210 L 390 220 L 375 200 Z",
    cx: 395,
    cy: 195,
  },
  {
    id: "madurai",
    name: "Madurai",
    path: "M 180 380 L 220 360 L 260 380 L 250 420 L 200 430 L 170 400 Z",
    cx: 215,
    cy: 395,
  },
  {
    id: "coimbatore",
    name: "Coimbatore",
    path: "M 60 280 L 100 260 L 140 280 L 130 320 L 80 330 L 50 300 Z",
    cx: 95,
    cy: 295,
  },
  {
    id: "thanjavur",
    name: "Thanjavur",
    path: "M 260 300 L 300 280 L 340 300 L 330 340 L 280 350 L 250 320 Z",
    cx: 295,
    cy: 315,
  },
  {
    id: "tiruchirappalli",
    name: "Tiruchirappalli",
    path: "M 200 300 L 240 280 L 280 300 L 270 340 L 220 350 L 190 320 Z",
    cx: 235,
    cy: 315,
  },
  {
    id: "salem",
    name: "Salem",
    path: "M 140 200 L 180 180 L 220 200 L 210 240 L 160 250 L 130 220 Z",
    cx: 175,
    cy: 215,
  },
  {
    id: "tirunelveli",
    name: "Tirunelveli",
    path: "M 140 460 L 180 440 L 220 460 L 210 500 L 160 510 L 130 480 Z",
    cx: 175,
    cy: 475,
  },
  {
    id: "vellore",
    name: "Vellore",
    path: "M 240 120 L 280 100 L 320 120 L 310 160 L 260 170 L 230 140 Z",
    cx: 275,
    cy: 135,
  },
  {
    id: "nilgiris",
    name: "Nilgiris",
    path: "M 40 220 L 80 200 L 120 220 L 110 260 L 60 270 L 30 240 Z",
    cx: 75,
    cy: 235,
  },
  {
    id: "kanyakumari",
    name: "Kanyakumari",
    path: "M 160 520 L 200 500 L 240 520 L 230 560 L 180 570 L 150 540 Z",
    cx: 195,
    cy: 535,
  },
]

function DistrictInfo({ districtId }: { districtId: string | null }) {
  if (!districtId) return null

  const district = DISTRICTS.find((d) => d.id === districtId)
  if (!district) return null

  const crowdConfig = {
    calm: { label: "Calm", color: "text-emerald-500" },
    moderate: { label: "Moderate", color: "text-amber-500" },
    busy: { label: "Busy", color: "text-orange-500" },
    "very-busy": { label: "Very Busy", color: "text-red-500" },
  }

  const { label, color } = crowdConfig[district.crowdLevel]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-card rounded-lg p-6 border border-border shadow-lg"
    >
      <h3 className="text-2xl font-serif font-light text-foreground mb-2">{district.name}</h3>
      <div className="flex items-center gap-4 mb-4">
        <span className={`inline-flex items-center gap-2 text-sm font-medium ${color}`}>
          <Users className="w-4 h-4" />
          {label}
        </span>
        <span className="text-muted-foreground text-sm capitalize">{district.region} Tamil Nadu</span>
      </div>
      <button
        onClick={() => (window.location.href = `/districts/${district.id}`)}
        className="px-6 py-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors text-sm font-medium"
      >
        Explore {district.name}
      </button>
    </motion.div>
  )
}

export function TamilNaduMapWithSync({ highlightedDistrict, onDistrictSelect }: TamilNaduMapWithSyncProps) {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (highlightedDistrict) {
      setSelectedDistrict(highlightedDistrict)
    }
  }, [highlightedDistrict])

  const handleDistrictClick = (districtId: string) => {
    setSelectedDistrict(districtId)
    onDistrictSelect(districtId)
  }

  const getDistrictFill = (districtId: string) => {
    if (selectedDistrict === districtId || highlightedDistrict === districtId) {
      return "var(--color-primary)"
    }
    if (hoveredDistrict === districtId) {
      return "var(--color-primary)"
    }
    return "var(--color-card)"
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Map */}
      <div className="relative">
        <svg
          viewBox="0 0 450 600"
          className="w-full h-auto max-h-[70vh]"
          style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
        >
          {/* Background shape for Tamil Nadu */}
          <path
            d="M 60 150 Q 100 100 200 80 Q 300 60 400 150 Q 450 250 420 350 Q 400 450 350 500 Q 280 580 200 580 Q 120 560 80 480 Q 40 400 30 300 Q 20 200 60 150"
            fill="var(--color-muted)"
            stroke="var(--color-border)"
            strokeWidth="2"
          />

          {/* Districts */}
          {districtPaths.map((district) => (
            <g key={district.id}>
              <motion.path
                d={district.path}
                fill={getDistrictFill(district.id)}
                stroke="var(--color-border)"
                strokeWidth="1.5"
                className="cursor-pointer transition-colors duration-300"
                onMouseEnter={() => setHoveredDistrict(district.id)}
                onMouseLeave={() => setHoveredDistrict(null)}
                onClick={() => handleDistrictClick(district.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ transformOrigin: `${district.cx}px ${district.cy}px` }}
              />
              <text
                x={district.cx}
                y={district.cy}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-medium pointer-events-none select-none"
                fill={
                  selectedDistrict === district.id ||
                  highlightedDistrict === district.id ||
                  hoveredDistrict === district.id
                    ? "var(--color-primary-foreground)"
                    : "var(--color-foreground)"
                }
              >
                {district.name}
              </text>
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-card border border-border" />
            District
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-primary" />
            Selected
          </span>
        </div>
      </div>

      {/* District Info Panel */}
      <div className="lg:sticky lg:top-32">
        <AnimatePresence mode="wait">
          {selectedDistrict || highlightedDistrict ? (
            <DistrictInfo districtId={selectedDistrict || highlightedDistrict} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-muted/50 rounded-lg p-8 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Explore the Map</h3>
              <p className="text-muted-foreground text-sm">
                Click on any district or select from the palette above to discover its highlights and plan your visit
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
