"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Award, ArrowLeft } from "lucide-react"
import Link from "next/link"

const dailyChallenges = [
  {
    date: "2024-01-15",
    question: "What is the traditional Tamil greeting gesture called?",
    options: ["Vanakkam", "Namaste", "Salaam", "Hello"],
    correct: 0,
    explanation:
      "Vanakkam is the traditional Tamil greeting, often accompanied by folding hands together. It means 'I bow to you' and shows respect.",
  },
]

export default function DailyChallengePage() {
  const router = useRouter()
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState("12h 34m")

  const challenge = dailyChallenges[0]

  useEffect(() => {
    // Mock countdown
    const interval = setInterval(() => {
      const now = new Date()
      const tomorrow = new Date(now)
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)
      const diff = tomorrow.getTime() - now.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      setTimeLeft(`${hours}h ${minutes}m`)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowResult(true)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link
            href="/games"
            className="inline-flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Games
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-serif font-light text-foreground mb-2">Daily Challenge</h1>
                <p className="text-muted-foreground font-sans">One question a day to learn Tamil culture</p>
              </div>
              <div className="text-center">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-xs font-sans text-muted-foreground">Next in</p>
                <p className="text-lg font-sans font-bold text-foreground">{timeLeft}</p>
              </div>
            </div>

            <Card className="p-8">
              <h2 className="text-xl font-serif text-foreground mb-6">{challenge.question}</h2>

              <div className="space-y-3 mb-6">
                {challenge.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showResult && setSelectedAnswer(index)}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all font-sans ${
                      selectedAnswer === index ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    } ${showResult && index === challenge.correct ? "border-green-500 bg-green-50" : ""} ${
                      showResult && selectedAnswer === index && index !== challenge.correct
                        ? "border-red-500 bg-red-50"
                        : ""
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {!showResult ? (
                <Button onClick={handleSubmit} disabled={selectedAnswer === null} className="w-full">
                  Submit Answer
                </Button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div
                    className={`p-4 rounded-lg ${selectedAnswer === challenge.correct ? "bg-green-50 border border-green-200" : "bg-blue-50 border border-blue-200"}`}
                  >
                    <p className="font-sans font-semibold mb-2 text-foreground">
                      {selectedAnswer === challenge.correct ? "Correct!" : "Learn More:"}
                    </p>
                    <p className="text-sm font-sans text-foreground">{challenge.explanation}</p>
                  </div>
                  {selectedAnswer === challenge.correct && (
                    <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <Award className="w-5 h-5 text-amber-600" />
                      <p className="text-sm font-sans text-amber-800">You earned 1 Cultural Stamp!</p>
                    </div>
                  )}
                </motion.div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
