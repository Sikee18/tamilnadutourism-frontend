"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  User,
  Heart,
  MapPin,
  Clock,
  Users,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Mountain,
  UtensilsCrossed,
  Church,
  Calendar,
} from "lucide-react"

const interests = [
  { id: "culture", label: "Culture", icon: Sparkles },
  { id: "nature", label: "Nature", icon: Mountain },
  { id: "food", label: "Food", icon: UtensilsCrossed },
  { id: "spirituality", label: "Spirituality", icon: Church },
]

const recommendedPlaces = [
  {
    id: "mahabalipuram",
    name: "Mahabalipuram",
    image: "https://source.unsplash.com/featured/?Mahabalipuram,Temple",
    crowdLevel: "moderate",
    bestTime: "Early Morning",
    guideAvailable: true,
    tags: ["Heritage", "UNESCO"],
  },
  {
    id: "thanjavur",
    name: "Thanjavur",
    image: "https://source.unsplash.com/featured/?Thanjavur Temple,Architecture",
    crowdLevel: "calm",
    bestTime: "Afternoon",
    guideAvailable: true,
    tags: ["Temple", "Culture"],
  },
  {
    id: "chettinad",
    name: "Chettinad",
    image: "https://source.unsplash.com/featured/?Chettinad House,Heritage",
    crowdLevel: "calm",
    bestTime: "Any Time",
    guideAvailable: true,
    tags: ["Heritage", "Food"],
  },
]

const crowdAlternatives = [
  {
    id: "yelagiri",
    name: "Yelagiri Hills",
    reason: "Similar hill station experience, significantly less crowded",
    image: "https://source.unsplash.com/featured/?Yelagiri,Hills",
    crowdLevel: "calm",
  },
  {
    id: "valparai",
    name: "Valparai",
    reason: "Tea estates and wildlife without the tourist crowds",
    image: "https://source.unsplash.com/featured/?Valparai,Tea Estate",
    crowdLevel: "calm",
  },
]

const bestTimes = [
  { time: "6:00 AM - 8:00 AM", crowd: "calm", label: "Ideal" },
  { time: "8:00 AM - 11:00 AM", crowd: "moderate", label: "Good" },
  { time: "11:00 AM - 4:00 PM", crowd: "busy", label: "Peak" },
  { time: "4:00 PM - 6:00 PM", crowd: "moderate", label: "Good" },
]

function CrowdIndicator({ level, size = "default" }: { level: string; size?: "default" | "small" }) {
  const config = {
    calm: { label: "Calm", class: "crowd-calm" },
    moderate: { label: "Moderate", class: "crowd-moderate" },
    busy: { label: "Busy", class: "crowd-busy" },
    "very-busy": { label: "Very Busy", class: "crowd-very-busy" },
  }
  const { label, class: className } = config[level as keyof typeof config] || config.moderate

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm font-sans font-medium ${className} ${size === "small" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs"
        }`}
    >
      <Users className={size === "small" ? "w-3 h-3" : "w-3 h-3"} />
      {label}
    </span>
  )
}

export default function TouristDashboard() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["culture", "food"])
  const [showCrowdAlert, setShowCrowdAlert] = useState(true)
  const [showBestTimes, setShowBestTimes] = useState(false)

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl font-serif font-light text-foreground mb-2">Welcome Back, Traveler</h1>
              <p className="text-muted-foreground font-sans">Discover your next Tamil Nadu adventure</p>
            </div>
            <Link
              href="/dashboard/tourist/profile"
              className="flex items-center gap-3 px-4 py-2 bg-card border border-border rounded-sm hover:bg-muted transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-sans font-medium text-foreground">My Profile</p>
                <p className="text-xs font-sans text-muted-foreground">View & Edit</p>
              </div>
            </Link>
          </div>

          {/* Interest Selector */}
          <section className="mb-12">
            <h2 className="text-lg font-serif text-foreground mb-4">Your Interests</h2>
            <div className="flex flex-wrap gap-3">
              {interests.map((interest) => {
                const Icon = interest.icon
                const isSelected = selectedInterests.includes(interest.id)
                return (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-sm border transition-all font-sans ${isSelected
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-foreground border-border hover:border-primary/50"
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{interest.label}</span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Crowd Advisory */}
          {showCrowdAlert && (
            <section className="mb-12">
              <div className="bg-amber-50 border border-amber-200 rounded-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-serif text-amber-800">Crowd Advisory: Ooty</h3>
                        <CrowdIndicator level="very-busy" size="small" />
                      </div>
                      <p className="text-amber-700 text-sm font-sans mb-4">
                        Ooty is experiencing high tourist volume this week due to school holidays. We recommend
                        considering these alternatives for a similar experience with fewer crowds, or visiting during
                        off-peak hours.
                      </p>

                      {/* Alternatives */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        {crowdAlternatives.map((alt) => (
                          <Link
                            key={alt.id}
                            href={`/explore/${alt.id}`}
                            className="flex items-center gap-3 bg-white rounded-sm p-3 border border-amber-200 hover:border-amber-300 transition-colors group"
                          >
                            <div className="relative w-16 h-16 rounded-sm overflow-hidden shrink-0">
                              <Image
                                src={alt.image || "/placeholder.svg"}
                                alt={alt.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-sans font-medium text-amber-900">{alt.name}</p>
                                <CrowdIndicator level={alt.crowdLevel} size="small" />
                              </div>
                              <p className="text-xs font-sans text-amber-700">{alt.reason}</p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Best Times Toggle */}
                      <button
                        onClick={() => setShowBestTimes(!showBestTimes)}
                        className="flex items-center gap-2 text-sm font-sans text-amber-700 hover:text-amber-800"
                      >
                        <Calendar className="w-4 h-4" />
                        {showBestTimes ? "Hide best visiting times" : "Show best visiting times for Ooty"}
                      </button>
                    </div>
                    <button
                      onClick={() => setShowCrowdAlert(false)}
                      className="text-amber-600 hover:text-amber-700 p-1"
                      aria-label="Dismiss"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Best Times Panel */}
                {showBestTimes && (
                  <div className="px-6 pb-6 pt-0">
                    <div className="bg-white rounded-sm p-4 border border-amber-200">
                      <h4 className="text-sm font-sans font-medium text-amber-900 mb-3">Best Times to Visit Ooty</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {bestTimes.map((slot, index) => (
                          <div key={index} className="text-center p-3 bg-amber-50 rounded-sm">
                            <p className="text-xs font-sans text-amber-600 mb-1">{slot.time}</p>
                            <CrowdIndicator level={slot.crowd} size="small" />
                            <p className="text-xs font-sans text-amber-800 mt-1">{slot.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Recommended Places */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-serif text-foreground">Recommended for You</h2>
              <Link href="/explore" className="text-sm font-sans text-primary hover:underline flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedPlaces.map((place) => (
                <Link
                  key={place.id}
                  href={`/destinations/${place.id}`}
                  className="group bg-card rounded-sm border border-border overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={place.image || "/placeholder.svg"}
                      alt={place.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <CrowdIndicator level={place.crowdLevel} />
                    </div>
                    <div className="absolute top-3 right-3 flex gap-2">
                      {place.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-sans rounded-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-serif text-foreground mb-3">{place.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-sans text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>Best: {place.bestTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-sans">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className={place.guideAvailable ? "text-secondary" : "text-muted-foreground"}>
                          {place.guideAvailable ? "Guide Available" : "No Guide Currently"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <h2 className="text-xl font-serif text-foreground mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/games"
                className="flex items-center gap-4 p-5 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-sans font-medium text-foreground">Discover & Play</p>
                  <p className="text-sm font-sans text-muted-foreground">Cultural games</p>
                </div>
              </Link>
              <Link
                href="/map"
                className="flex items-center gap-4 p-5 bg-card border border-border rounded-sm hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-sans font-medium text-foreground">Explore Map</p>
                  <p className="text-sm font-sans text-muted-foreground">Interactive districts</p>
                </div>
              </Link>
              <Link
                href="/culinary"
                className="flex items-center gap-4 p-5 bg-card border border-border rounded-sm hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <UtensilsCrossed className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="font-sans font-medium text-foreground">Food Guide</p>
                  <p className="text-sm font-sans text-muted-foreground">Regional cuisine</p>
                </div>
              </Link>
              <Link
                href="/heritage"
                className="flex items-center gap-4 p-5 bg-card border border-border rounded-sm hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Church className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-sans font-medium text-foreground">Heritage</p>
                  <p className="text-sm font-sans text-muted-foreground">Digital museum</p>
                </div>
              </Link>
              <Link
                href="/guides"
                className="flex items-center gap-4 p-5 bg-card border border-border rounded-sm hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-sans font-medium text-foreground">Find Guide</p>
                  <p className="text-sm font-sans text-muted-foreground">Local experts</p>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
