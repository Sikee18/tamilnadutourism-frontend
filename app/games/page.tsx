"use client"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Calendar, Puzzle, Map, CircleDot, Sparkles, BookText, Lock, ArrowRight } from "lucide-react"

const games = [
  {
    id: "daily-challenge",
    title: "Daily Challenge",
    icon: Calendar,
    description: "One simple daily task to learn Tamil Nadu culture",
    color: "bg-blue-500",
    locked: false,
  },
  {
    id: "four-clues",
    title: "Four Clues – One Word",
    icon: Puzzle,
    description: "Guess the word from 4 cultural clues",
    color: "bg-purple-500",
    locked: false,
  },
  {
    id: "traveller-quest",
    title: "Traveller Quest",
    icon: Map,
    description: "Complete real-world cultural tasks",
    color: "bg-amber-500",
    locked: true,
    lockReason: "Enable Traveller Mode to unlock",
  },
  {
    id: "day-in-tn",
    title: "Day in TN",
    icon: CircleDot,
    description: "Live a day in Tamil Nadu through choices",
    color: "bg-green-500",
    locked: false,
  },
  {
    id: "match-discovery",
    title: "Match / Choice Discovery",
    icon: Sparkles,
    description: "Learn through simple choice-based questions",
    color: "bg-pink-500",
    locked: false,
  },
  {
    id: "lost-words",
    title: "Lost Words of Tamil Nadu",
    icon: BookText,
    description: "Discover ancient Tamil words and their meanings",
    color: "bg-indigo-500",
    locked: false,
  },
]

export default function GamesHubPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-4">Discover & Play</h1>
            <p className="text-muted-foreground font-sans text-lg max-w-2xl mx-auto">
              Learn Tamil Nadu culture through fun, engaging games designed for everyone
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, index) => {
              const Icon = game.icon
              return (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {game.locked ? (
                    <Card className="p-6 h-full relative overflow-hidden opacity-60">
                      <div className="absolute top-4 right-4">
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className={`w-12 h-12 rounded-lg ${game.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-serif font-semibold text-foreground mb-2">{game.title}</h3>
                      <p className="text-sm font-sans text-muted-foreground mb-4">{game.description}</p>
                      <p className="text-xs font-sans text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                        {game.lockReason}
                      </p>
                    </Card>
                  ) : (
                    <Link href={`/games/${game.id}`}>
                      <Card className="p-6 h-full hover:shadow-lg transition-all cursor-pointer group">
                        <div
                          className={`w-12 h-12 rounded-lg ${game.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-serif font-semibold text-foreground mb-2">{game.title}</h3>
                        <p className="text-sm font-sans text-muted-foreground mb-4">{game.description}</p>
                        <div className="flex items-center gap-2 text-sm font-sans text-primary">
                          Play Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Card>
                    </Link>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
