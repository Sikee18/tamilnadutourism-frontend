"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Trophy, Lock, CheckCircle } from "lucide-react"
import Link from "next/link"

const quests = [
  {
    id: "explorer",
    title: "Temple Explorer",
    description: "Visit and read about 5 different temples in Tamil Nadu",
    badge: "🏛️",
    progress: 3,
    total: 5,
    reward: "Temple Explorer Badge",
  },
  {
    id: "foodie",
    title: "Culinary Adventurer",
    description: "Explore all 5 regional cuisines in the Culinary section",
    badge: "🍛",
    progress: 2,
    total: 5,
    reward: "Foodie Badge",
  },
  {
    id: "culture",
    title: "Culture Enthusiast",
    description: "Read about 10 cultural experiences across Tamil Nadu",
    badge: "🎭",
    progress: 7,
    total: 10,
    reward: "Culture Badge",
  },
  {
    id: "hidden",
    title: "Hidden Gem Seeker",
    description: "Discover 8 underrated places in the Beyond Familiar section",
    badge: "💎",
    progress: 4,
    total: 8,
    reward: "Explorer Badge",
  },
  {
    id: "completionist",
    title: "Tamil Nadu Master",
    description: "Complete all other quests to unlock this achievement",
    badge: "🌟",
    progress: 0,
    total: 1,
    reward: "Master Explorer Badge",
    locked: true,
  },
]

export default function TravellerQuestPage() {
  const { isAuthenticated, userRole } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated || userRole !== "tourist") {
      router.push("/login")
    }
  }, [isAuthenticated, userRole, router])

  if (!isAuthenticated || userRole !== "tourist") {
    return null
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-4">Traveller Quest</h1>
          <p className="text-muted-foreground font-sans text-lg">
            Complete quests by exploring content across the platform. Earn badges and unlock achievements as you learn
            about Tamil Nadu.
          </p>
        </div>

        {/* Quests */}
        <div className="space-y-6">
          {quests.map((quest, index) => {
            const isComplete = quest.progress >= quest.total
            const progressPercent = (quest.progress / quest.total) * 100

            return (
              <div
                key={quest.id}
                className={`bg-card rounded-xl border p-6 animate-in fade-in slide-in-from-bottom-4 ${
                  quest.locked ? "opacity-60" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  {/* Badge */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${
                        quest.locked ? "bg-muted" : isComplete ? "bg-green-500/10" : "bg-primary/10"
                      }`}
                    >
                      {quest.locked ? <Lock className="w-6 h-6 text-muted-foreground" /> : quest.badge}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-serif text-foreground mb-1">{quest.title}</h3>
                        <p className="text-sm font-sans text-muted-foreground">{quest.description}</p>
                      </div>
                      {isComplete && (
                        <div className="flex-shrink-0 ml-4">
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {!quest.locked && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm font-sans text-muted-foreground mb-2">
                          <span>Progress</span>
                          <span>
                            {quest.progress} / {quest.total}
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Reward */}
                    <div className="mt-4 flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-sans text-muted-foreground">Reward: {quest.reward}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-sans font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Start Exploring
          </Link>
        </div>
      </div>
    </main>
  )
}
