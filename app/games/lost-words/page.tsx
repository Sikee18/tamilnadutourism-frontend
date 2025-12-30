"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookText, ArrowLeft } from "lucide-react"
import Link from "next/link"

const words = [
  {
    id: 1,
    word: "Kolam",
    pronunciation: "koh-lum",
    options: ["Traditional art on floor", "Type of jewelry", "Musical instrument", "Festival celebration"],
    correct: 0,
    meaning: "A traditional decorative pattern drawn on the floor using rice flour or colored powders",
    usage: "Every morning, women draw kolams at their doorsteps to welcome guests and bring prosperity",
    culturalContext:
      "Kolam is an ancient Tamil art form, believed to be over 5,000 years old. It symbolizes harmony, symmetry, and the welcoming of prosperity. The practice is passed down through generations, and intricate designs are created during festivals and special occasions.",
  },
]

export default function LostWordsPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const word = words[0]

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
            <div className="flex items-center gap-3 mb-8">
              <BookText className="w-8 h-8 text-indigo-500" />
              <div>
                <h1 className="text-3xl font-serif font-light text-foreground">Lost Words of Tamil Nadu</h1>
                <p className="text-muted-foreground font-sans">Discover ancient Tamil words and traditions</p>
              </div>
            </div>

            <Card className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-serif text-primary mb-2">{word.word}</h2>
                <p className="text-sm font-sans text-muted-foreground italic">/{word.pronunciation}/</p>
              </div>

              <h3 className="text-lg font-serif text-foreground mb-4">What does this word refer to?</h3>

              <div className="space-y-3 mb-6">
                {word.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showResult && setSelectedAnswer(index)}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all font-sans ${
                      selectedAnswer === index ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    } ${showResult && index === word.correct ? "border-green-500 bg-green-50" : ""} ${
                      showResult && selectedAnswer === index && index !== word.correct ? "border-red-500 bg-red-50" : ""
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
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="p-5 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200">
                    <h4 className="font-sans font-semibold text-indigo-900 mb-3 text-lg">
                      {word.word} - {word.options[word.correct]}
                    </h4>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-sans text-indigo-600 uppercase tracking-wide mb-1">Meaning</p>
                        <p className="text-sm font-sans text-indigo-900">{word.meaning}</p>
                      </div>

                      <div>
                        <p className="text-xs font-sans text-indigo-600 uppercase tracking-wide mb-1">Usage</p>
                        <p className="text-sm font-sans text-indigo-900 italic">"{word.usage}"</p>
                      </div>

                      <div>
                        <p className="text-xs font-sans text-indigo-600 uppercase tracking-wide mb-1">
                          Cultural Context
                        </p>
                        <p className="text-sm font-sans text-indigo-900 leading-relaxed">{word.culturalContext}</p>
                      </div>
                    </div>
                  </div>
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
