"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Lightbulb, MapPin, CheckCircle, XCircle } from "lucide-react"

const dailyChallenges = [
  {
    date: new Date().toISOString().split("T")[0],
    place: "Brihadeeswara Temple",
    clues: [
      "Built by a Chola king over 1000 years ago",
      "Its shadow never falls on the ground at noon",
      "The vimana is one of the tallest in India",
      "Located in the rice bowl of Tamil Nadu",
    ],
    options: ["Meenakshi Temple", "Brihadeeswara Temple", "Shore Temple", "Brihadeeswarar Temple"],
    correctAnswer: "Brihadeeswara Temple",
    district: "Thanjavur",
    funFact: "The temple's 216-foot tower was completed in just 7 years, a remarkable feat for the 11th century.",
  },
]

export default function DailyChallengePage() {
  const { isAuthenticated, userRole } = useAuth()
  const router = useRouter()
  const [revealedClues, setRevealedClues] = useState(1)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    if (!isAuthenticated || userRole !== "tourist") {
      router.push("/login")
    }
  }, [isAuthenticated, userRole, router])

  if (!isAuthenticated || userRole !== "tourist") {
    return null
  }

  const challenge = dailyChallenges[0]
  const isCorrect = selectedAnswer === challenge.correctAnswer

  const handleRevealClue = () => {
    if (revealedClues < challenge.clues.length) {
      setRevealedClues(revealedClues + 1)
    }
  }

  const handleSubmit = () => {
    if (selectedAnswer) {
      setShowResult(true)
    }
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm font-sans text-muted-foreground mb-4">
            <MapPin className="w-4 h-4" />
            Daily Challenge • {new Date().toLocaleDateString()}
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-4">Where in Tamil Nadu am I?</h1>
          <p className="text-muted-foreground font-sans">
            Read the clues carefully and guess today's mystery destination
          </p>
        </div>

        {!showResult ? (
          <>
            {/* Clues */}
            <div className="bg-card rounded-xl border border-border p-8 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-serif text-foreground">Clues</h2>
              </div>

              <div className="space-y-4 mb-6">
                {challenge.clues.slice(0, revealedClues).map((clue, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 animate-in fade-in slide-in-from-left-4 duration-500"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-sans font-medium flex items-center justify-center">
                      {index + 1}
                    </span>
                    <p className="text-foreground font-sans">{clue}</p>
                  </div>
                ))}
              </div>

              {revealedClues < challenge.clues.length && (
                <button
                  onClick={handleRevealClue}
                  className="text-sm font-sans font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Reveal next clue ({revealedClues}/{challenge.clues.length})
                </button>
              )}
            </div>

            {/* Options */}
            <div className="mb-8">
              <h2 className="text-lg font-serif text-foreground mb-4">Your Guess</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {challenge.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedAnswer(option)}
                    className={`p-4 rounded-lg border-2 text-left font-sans transition-all ${
                      selectedAnswer === option
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="w-full py-3 bg-primary text-primary-foreground font-sans font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          </>
        ) : (
          /* Result */
          <div className="text-center">
            <div
              className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
                isCorrect ? "bg-green-500/10" : "bg-red-500/10"
              }`}
            >
              {isCorrect ? (
                <CheckCircle className="w-10 h-10 text-green-500" />
              ) : (
                <XCircle className="w-10 h-10 text-red-500" />
              )}
            </div>

            <h2 className="text-3xl font-serif text-foreground mb-2">{isCorrect ? "Correct!" : "Not Quite"}</h2>
            <p className="text-muted-foreground font-sans mb-8">
              {isCorrect
                ? `The answer is ${challenge.place} in ${challenge.district} district.`
                : `The correct answer was ${challenge.place} in ${challenge.district} district.`}
            </p>

            <div className="bg-card rounded-xl border border-border p-6 mb-8 text-left">
              <h3 className="text-sm font-sans font-semibold text-foreground mb-2">Fun Fact</h3>
              <p className="text-sm font-sans text-muted-foreground leading-relaxed">{challenge.funFact}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => router.push("/discover")}
                className="flex-1 py-3 bg-muted text-foreground font-sans font-medium rounded-lg hover:bg-muted/80 transition-colors"
              >
                Back to Discover
              </button>
              <button
                onClick={() => router.push(`/explore?district=${challenge.district}`)}
                className="flex-1 py-3 bg-primary text-primary-foreground font-sans font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Explore {challenge.district}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
