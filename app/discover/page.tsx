"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Sparkles, Trophy, Map, BookOpen, Languages, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function DiscoverPage() {
  const { isAuthenticated, userRole } = useAuth()
  const router = useRouter()

  // Redirect if not authenticated or not a tourist
  useEffect(() => {
    if (!isAuthenticated || userRole !== "tourist") {
      router.push("/login")
    }
  }, [isAuthenticated, userRole, router])

  if (!isAuthenticated || userRole !== "tourist") {
    return null
  }

  const games = [
    {
      id: "daily-challenge",
      title: "Daily Challenge",
      description: "4 clues, 1 hidden place. Can you discover today's mystery destination?",
      icon: <Sparkles className="w-6 h-6" />,
      href: "/discover/daily-challenge",
      color: "from-purple-500/10 to-pink-500/10 border-purple-500/20",
      badge: "New Today",
    },
    {
      id: "traveller-quest",
      title: "Traveller Quest",
      description: "Read about destinations and experiences to unlock badges and rewards",
      icon: <Trophy className="w-6 h-6" />,
      href: "/discover/traveller-quest",
      color: "from-amber-500/10 to-orange-500/10 border-amber-500/20",
      badge: "3 Badges Available",
    },
    {
      id: "day-in-tamil-nadu",
      title: "A Day in Tamil Nadu",
      description: "Make choices and experience a virtual journey through Tamil culture",
      icon: <Map className="w-6 h-6" />,
      href: "/discover/day-in-tamil-nadu",
      color: "from-blue-500/10 to-cyan-500/10 border-blue-500/20",
      badge: "Interactive",
    },
    {
      id: "match-discovery",
      title: "Match & Discover",
      description: "Test your knowledge of Tamil food, culture, and etiquette",
      icon: <BookOpen className="w-6 h-6" />,
      href: "/discover/match-discovery",
      color: "from-green-500/10 to-emerald-500/10 border-green-500/20",
      badge: "Educational",
    },
    {
      id: "lost-words",
      title: "Lost Words of Tamil Nadu",
      description: "Learn Tamil phrases and explore the beauty of one of the world's oldest languages",
      icon: <Languages className="w-6 h-6" />,
      href: "/discover/lost-words",
      color: "from-red-500/10 to-rose-500/10 border-red-500/20",
      badge: "Language Learning",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-4">Discover & Play</h1>
            <p className="text-muted-foreground font-sans text-lg max-w-2xl">
              Explore Tamil Nadu through interactive challenges and games. Learn about culture, history, and language
              while earning badges and unlocking achievements.
            </p>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <Link key={game.id} href={game.href}>
                <div
                  className={`group relative bg-gradient-to-br ${game.color} rounded-xl border p-6 cursor-pointer hover:scale-105 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 bg-background/80 backdrop-blur-sm text-foreground text-xs font-sans rounded-full">
                      {game.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 bg-background/50 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 text-foreground group-hover:scale-110 transition-transform">
                    {game.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-serif text-foreground mb-2">{game.title}</h3>
                  <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-4">{game.description}</p>

                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-sm font-sans font-medium text-primary group-hover:gap-3 transition-all">
                    <span>Start Playing</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Info */}
          <div className="mt-12 bg-muted/50 rounded-xl p-8 border border-border">
            <h2 className="text-xl font-serif text-foreground mb-3">About Discovery Games</h2>
            <p className="text-muted-foreground font-sans leading-relaxed mb-4">
              These games are designed to deepen your understanding of Tamil Nadu's rich heritage while making learning
              fun and engaging. All activities are optional and can be played at your own pace.
            </p>
            <ul className="space-y-2 text-sm font-sans text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Earn badges by completing challenges and exploring content</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>No time limits or pressure - play when you're ready</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Learn about real places, traditions, and cultural practices</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
