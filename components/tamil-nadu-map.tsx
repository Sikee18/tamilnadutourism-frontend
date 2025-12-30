"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const districts = [
  {
    id: "chennai",
    name: "Chennai",
    path: "M 380 180 L 400 170 L 420 185 L 415 210 L 390 220 L 375 200 Z",
    cx: 395,
    cy: 195,
    info: {
      about: "The gateway to South India, Chennai blends colonial heritage with modern dynamism.",
      highlights: ["Marina Beach", "Kapaleeshwarar Temple", "Fort St. George"],
      food: ["Filter Coffee", "Idli-Sambar", "Kothu Parotta"],
    },
  },
  {
    id: "madurai",
    name: "Madurai",
    path: "M 180 380 L 220 360 L 260 380 L 250 420 L 200 430 L 170 400 Z",
    cx: 215,
    cy: 395,
    info: {
      about:
        "One of the oldest continuously inhabited cities in the world, Madurai is the cultural heart of Tamil Nadu.",
      highlights: ["Meenakshi Temple", "Thirumalai Nayak Palace", "Gandhi Memorial Museum"],
      food: ["Jigarthanda", "Kari Dosai", "Madurai Malli"],
    },
  },
  {
    id: "coimbatore",
    name: "Coimbatore",
    path: "M 60 280 L 100 260 L 140 280 L 130 320 L 80 330 L 50 300 Z",
    cx: 95,
    cy: 295,
    info: {
      about: "The Manchester of South India, gateway to the Western Ghats and Ooty.",
      highlights: ["Marudhamalai Temple", "Kovai Kutralam Falls", "VOC Park"],
      food: ["Kongunadu Chicken", "Kelvaragu Dosai", "Idiappam"],
    },
  },
  {
    id: "thanjavur",
    name: "Thanjavur",
    path: "M 260 300 L 300 280 L 340 300 L 330 340 L 280 350 L 250 320 Z",
    cx: 295,
    cy: 315,
    info: {
      about: "The rice bowl of Tamil Nadu, home to the magnificent Brihadeeswara Temple.",
      highlights: ["Brihadeeswara Temple", "Thanjavur Palace", "Saraswathi Mahal Library"],
      food: ["Thanjavur Thali", "Degree Coffee", "Adhirasam"],
    },
  },
  {
    id: "kanyakumari",
    name: "Kanyakumari",
    path: "M 160 520 L 200 500 L 240 520 L 230 560 L 180 570 L 150 540 Z",
    cx: 195,
    cy: 535,
    info: {
      about: "Where three seas meet at India's southernmost tip, a place of pilgrimage and natural beauty.",
      highlights: ["Vivekananda Rock", "Thiruvalluvar Statue", "Padmanabhapuram Palace"],
      food: ["Fresh Seafood", "Banana Chips", "Puttu"],
    },
  },
  {
    id: "trichy",
    name: "Tiruchirappalli",
    path: "M 200 300 L 240 280 L 280 300 L 270 340 L 220 350 L 190 320 Z",
    cx: 235,
    cy: 315,
    info: {
      about: "The rock fortress city with ancient temples and a vibrant cultural scene.",
      highlights: ["Rockfort Temple", "Sri Ranganathaswamy Temple", "Jambukeswarar Temple"],
      food: ["Trichy Halwa", "Karandi Biryani", "Pakoda"],
    },
  },
  {
    id: "ooty",
    name: "Nilgiris",
    path: "M 40 220 L 80 200 L 120 220 L 110 260 L 60 270 L 30 240 Z",
    cx: 75,
    cy: 235,
    info: {
      about: "The Queen of Hill Stations, with rolling tea estates and colonial charm.",
      highlights: ["Botanical Gardens", "Ooty Lake", "Nilgiri Mountain Railway"],
      food: ["Varkey Biscuits", "Chocolate", "Nilgiri Tea"],
    },
  },
  {
    id: "rameswaram",
    name: "Rameswaram",
    path: "M 280 420 L 320 400 L 360 420 L 350 460 L 300 470 L 270 440 Z",
    cx: 315,
    cy: 435,
    info: {
      about: "Sacred island connected to the mainland, one of the holiest pilgrimage sites in India.",
      highlights: ["Ramanathaswamy Temple", "Adam's Bridge", "Dhanushkodi"],
      food: ["Temple Prasadam", "Appam", "Fish Curry"],
    },
  },
]

interface DistrictInfoProps {
  district: (typeof districts)[0] | null
}

function DistrictInfo({ district }: DistrictInfoProps) {
  if (!district) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-card rounded-sm p-6 border border-border shadow-lg"
    >
      <h3 className="text-2xl font-light text-foreground mb-2">{district.name}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6">{district.info.about}</p>

      <div className="space-y-4">
        <div>
          <h4 className="text-xs tracking-wide uppercase text-primary mb-2">Key Highlights</h4>
          <ul className="space-y-1">
            {district.info.highlights.map((highlight) => (
              <li key={highlight} className="text-sm text-foreground flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs tracking-wide uppercase text-secondary mb-2">Must-Try Food</h4>
          <div className="flex flex-wrap gap-2">
            {district.info.food.map((food) => (
              <span key={food} className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-sm">
                {food}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function TamilNaduMap() {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<(typeof districts)[0] | null>(null)

  const handleDistrictClick = (district: (typeof districts)[0]) => {
    setSelectedDistrict(selectedDistrict?.id === district.id ? null : district)
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
          {districts.map((district) => (
            <g key={district.id}>
              <motion.path
                d={district.path}
                fill={
                  selectedDistrict?.id === district.id
                    ? "var(--color-primary)"
                    : hoveredDistrict === district.id
                      ? "var(--color-primary)"
                      : "var(--color-card)"
                }
                stroke="var(--color-border)"
                strokeWidth="1.5"
                className="cursor-pointer transition-colors duration-300"
                onMouseEnter={() => setHoveredDistrict(district.id)}
                onMouseLeave={() => setHoveredDistrict(null)}
                onClick={() => handleDistrictClick(district)}
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
                  selectedDistrict?.id === district.id || hoveredDistrict === district.id
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
          {selectedDistrict ? (
            <DistrictInfo district={selectedDistrict} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-muted/50 rounded-sm p-8 text-center"
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
                Click on any district to discover its cultural highlights, must-visit places, and signature cuisine
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
