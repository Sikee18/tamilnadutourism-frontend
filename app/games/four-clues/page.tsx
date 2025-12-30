"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Puzzle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const puzzles = [
  {
    id: 1,
    clues: [
      { text: "Ancient dance form", image: "https://images.unsplash.com/photo-1596773809630-fce479c381d6?q=80&w=800&auto=format&fit=crop" },
      { text: "Originated in temples", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop" },
      { text: "UNESCO heritage", image: "https://images.unsplash.com/photo-1605649487212-47a4983a8b90?q=80&w=800&auto=format&fit=crop" },
      { text: "Expresses stories through hand gestures", image: "https://images.unsplash.com/photo-1622329244347-66a908902581?q=80&w=800&auto=format&fit=crop" },
    ],
    options: ["Bharatanatyam", "Kathak", "Kuchipudi", "Odissi"],
    correct: 0,
    explanation:
      "Bharatanatyam is one of the oldest classical dance forms of India, originating from Tamil Nadu temples. It's recognized by UNESCO and uses intricate footwork and expressive hand gestures (mudras) to tell stories.",
  },
]

export default function FourCluesPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const puzzle = puzzles[0]

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowResult(true)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link
            href="/games"
            className="inline-flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Games
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-8">
              <Puzzle className="w-8 h-8 text-purple-500" />
              <div>
                <h1 className="text-3xl font-serif font-light text-foreground">Four Clues – One Word</h1>
                <p className="text-muted-foreground font-sans">Can you guess the cultural element?</p>
              </div>
            </div>

            <Card className="p-8 mb-6">
              <h2 className="text-lg font-serif text-foreground mb-6 text-center">What am I?</h2>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {puzzle.clues.map((clue, index) => (
                  <div key={index} className="space-y-2">
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={clue.image || "/placeholder.svg"}
                        alt={`Clue ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-sm font-sans text-center text-muted-foreground">{clue.text}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                {puzzle.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showResult && setSelectedAnswer(index)}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all font-sans ${selectedAnswer === index ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      } ${showResult && index === puzzle.correct ? "border-green-500 bg-green-50" : ""} ${showResult && selectedAnswer === index && index !== puzzle.correct
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
                  className="p-4 rounded-lg bg-blue-50 border border-blue-200"
                >
                  <p className="font-sans font-semibold mb-2 text-foreground">
                    {selectedAnswer === puzzle.correct ? "Correct! " : ""}The answer is {puzzle.options[puzzle.correct]}
                  </p>
                  <p className="text-sm font-sans text-foreground">{puzzle.explanation}</p>
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
