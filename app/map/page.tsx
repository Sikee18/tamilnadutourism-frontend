"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { MapPin, Users, Cloud, AlertCircle, Calendar, Utensils, Landmark, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const REGIONS = [
  {
    id: "chennai",
    name: "Chennai",
    region: "Coastal",
    identity: "Gateway to Tamil Nadu & Cultural Hub",
    culture: "Modern cosmopolitan culture with traditional roots, marina beach, colonial architecture",
    food: "Idli, Dosa, Filter Coffee, Seafood",
    whyVisit: "Marina Beach, temples, museums, IT hub atmosphere",
    bestTime: "Nov-Feb (Winter)",
    crowdLevel: "crowded",
    suitability: "Crowded",
    alternatives: ["Mahabalipuram", "Kanchipuram", "Vellore"],
  },
  {
    id: "madurai",
    name: "Madurai",
    region: "Central",
    identity: "Temple City & Cultural Heart",
    culture: "Ancient temple traditions, vibrant festivals, classical Tamil heritage",
    food: "Jigarthanda, Paruthi Paal, Kari Dosa",
    whyVisit: "Meenakshi Temple, evening ceremony, ancient architecture",
    bestTime: "Oct-Mar (Pleasant)",
    crowdLevel: "moderate",
    suitability: "Good",
    alternatives: [],
  },
  {
    id: "ooty",
    name: "Ooty",
    region: "Hills",
    identity: "Queen of Hill Stations",
    culture: "Colonial hill station heritage, tea gardens, scenic beauty",
    food: "Homemade Chocolates, Varkey, Fresh Strawberries",
    whyVisit: "Cool climate, tea estates, botanical gardens, toy train",
    bestTime: "Apr-Jun, Sep-Nov",
    crowdLevel: "crowded",
    suitability: "Avoid (Peak Season)",
    alternatives: ["Coonoor", "Kotagiri", "Valparai"],
  },
  {
    id: "thanjavur",
    name: "Thanjavur",
    region: "Central",
    identity: "City of Temples & Classical Arts",
    culture: "Chola dynasty heritage, classical music, bronze sculptures",
    food: "Thanjavur Special Biryani, Traditional Meals",
    whyVisit: "Brihadeeswara Temple (UNESCO), art galleries, royal palace",
    bestTime: "Nov-Feb",
    crowdLevel: "low",
    suitability: "Good",
    alternatives: [],
  },
  {
    id: "rameswaram",
    name: "Rameswaram",
    region: "Coastal",
    identity: "Sacred Island & Pilgrimage Site",
    culture: "Religious pilgrimage, island culture, spiritual traditions",
    food: "Fresh Seafood, Traditional Temple Prasadam",
    whyVisit: "Ramanathaswamy Temple, sacred baths, Pamban Bridge",
    bestTime: "Oct-Apr",
    crowdLevel: "moderate",
    suitability: "Good",
    alternatives: [],
  },
  {
    id: "kodaikanal",
    name: "Kodaikanal",
    region: "Hills",
    identity: "Princess of Hill Stations",
    culture: "Misty mountains, serene lakes, quiet hill town charm",
    food: "Homemade Chocolates, Fresh Plums, Eucalyptus Oil",
    whyVisit: "Kodai Lake, viewpoints, trekking, peaceful atmosphere",
    bestTime: "Apr-Jun, Sep-Oct",
    crowdLevel: "low",
    suitability: "Good",
    alternatives: [],
  },
  {
    id: "kanyakumari",
    name: "Kanyakumari",
    region: "Coastal",
    identity: "Land's End & Three Seas Meeting Point",
    culture: "Unique confluence of three seas, sunrise and sunset views",
    food: "Fresh Seafood, Banana Chips, Local Sweets",
    whyVisit: "Vivekananda Rock, sunrise/sunset, Thiruvalluvar Statue",
    bestTime: "Oct-Mar",
    crowdLevel: "moderate",
    suitability: "Good",
    alternatives: [],
  },
  {
    id: "mahabalipuram",
    name: "Mahabalipuram",
    region: "Coastal",
    identity: "Ancient Port City & Rock Art Capital",
    culture: "Pallava architecture, UNESCO heritage, stone carving traditions",
    food: "Fresh Seafood, Coastal Cuisine",
    whyVisit: "Shore Temple, rock sculptures, beach, heritage sites",
    bestTime: "Nov-Feb",
    crowdLevel: "low",
    suitability: "Good",
    alternatives: [],
  },
]

export default function MapPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(regionId)
  }

  const selectedData = REGIONS.find((r) => r.id === selectedRegion)

  const getCrowdColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "moderate":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "crowded":
        return "bg-red-500/10 text-red-600 border-red-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getSuitabilityColor = (suitability: string) => {
    if (suitability === "Good") return "text-green-600"
    if (suitability === "Crowded") return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-sans">Intelligent Exploration</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-foreground mb-6">
              Visualize Tamil Nadu
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed font-sans">
              Explore regions intelligently. Get real-time crowd insights and smart alternatives for the best travel
              experience.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Region Selection Grid */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-serif font-light text-foreground mb-6">Select a Region</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {REGIONS.map((region, index) => (
                  <motion.button
                    key={region.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRegionClick(region.id)}
                    className={`p-6 rounded-xl border-2 transition-all text-left relative overflow-hidden group ${selectedRegion === region.id
                        ? "border-primary bg-primary/10 shadow-lg"
                        : "border-border bg-card hover:border-primary/50"
                      }`}
                  >
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={`https://source.unsplash.com/featured/?${region.name},Tamil Nadu`}
                        alt={region.name}
                        fill
                        className="object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/50" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin
                          className={`w-5 h-5 ${selectedRegion === region.id ? "text-primary" : "text-muted-foreground"}`}
                        />
                        <h3
                          className={`font-serif font-semibold ${selectedRegion === region.id ? "text-primary" : "text-foreground"}`}
                        >
                          {region.name}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground font-sans">{region.region}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <span
                          className={`px-2 py-1 text-xs font-sans font-medium rounded-full border ${getCrowdColor(region.crowdLevel)}`}
                        >
                          {region.crowdLevel}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Info Panel */}
            <div className="lg:col-span-1">
              <AnimatePresence mode="wait">
                {!selectedData ? (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-muted/50 rounded-xl p-8 text-center h-full flex flex-col items-center justify-center border border-border"
                  >
                    <MapPin className="w-16 h-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground font-sans">
                      Select a region to see details and recommendations
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={selectedData.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-card rounded-xl border border-border p-6 space-y-6 sticky top-24"
                  >
                    <div>
                      <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">{selectedData.name}</h2>
                      <p className="text-sm text-muted-foreground font-sans italic">{selectedData.identity}</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Landmark className="w-4 h-4 text-primary" />
                          <h3 className="text-sm font-sans font-semibold text-foreground uppercase tracking-wide">
                            Culture
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                          {selectedData.culture}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Utensils className="w-4 h-4 text-primary" />
                          <h3 className="text-sm font-sans font-semibold text-foreground uppercase tracking-wide">
                            Famous Food
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground font-sans">{selectedData.food}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <h3 className="text-sm font-sans font-semibold text-foreground uppercase tracking-wide">
                            Why Visit
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                          {selectedData.whyVisit}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <p className="text-xs font-sans font-semibold text-muted-foreground uppercase">Best Time</p>
                          </div>
                          <p className="text-sm text-foreground font-sans">{selectedData.bestTime}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <p className="text-xs font-sans font-semibold text-muted-foreground uppercase">Crowd</p>
                          </div>
                          <p
                            className={`text-sm font-sans font-medium capitalize ${getCrowdColor(selectedData.crowdLevel).split(" ")[1]}`}
                          >
                            {selectedData.crowdLevel}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`p-4 rounded-lg border-2 ${selectedData.suitability === "Good"
                            ? "bg-green-50 border-green-200"
                            : selectedData.suitability === "Crowded"
                              ? "bg-yellow-50 border-yellow-200"
                              : "bg-red-50 border-red-200"
                          }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Cloud className={`w-5 h-5 ${getSuitabilityColor(selectedData.suitability)}`} />
                          <h3 className={`font-sans font-semibold ${getSuitabilityColor(selectedData.suitability)}`}>
                            Suitability: {selectedData.suitability}
                          </h3>
                        </div>
                      </div>

                      {selectedData.alternatives.length > 0 && (
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                          <div className="flex items-start gap-2 mb-3">
                            <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
                            <div>
                              <h3 className="text-sm font-sans font-semibold text-primary mb-1">
                                Consider These Alternatives
                              </h3>
                              <p className="text-xs text-muted-foreground font-sans">
                                Less crowded, equally amazing destinations nearby
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {selectedData.alternatives.map((alt) => {
                              const altData = REGIONS.find((r) => r.name === alt)
                              return (
                                <button
                                  key={alt}
                                  onClick={() => handleRegionClick(altData?.id || "")}
                                  className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-primary/10 hover:border-primary/30 hover:bg-primary/5 transition-all group"
                                >
                                  <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    <span className="text-sm font-sans font-medium text-foreground">{alt}</span>
                                  </div>
                                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
