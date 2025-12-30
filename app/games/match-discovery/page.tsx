"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const questions = [
  {
    id: 1,
    image: "/tamil-filter-coffee.jpg",
    question: "What is this traditional Tamil drink called?",
    choices: ["Filter Coffee", "Masala Chai", "Lassi", "Buttermilk"],
    correct: 0,
    explanation:
      "Tamil Filter Coffee (Kaapi) is a beloved beverage made with finely ground coffee and chicory, brewed in a traditional filter and served with frothy milk. It's an essential part of Tamil culture.",
  },
]

export default function MatchDiscoveryPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const question = questions[0]

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
              <Sparkles className="w-8 h-8 text-pink-500" />
              <div>
                <h1 className="text-3xl font-serif font-light text-foreground">Match / Choice Discovery</h1>
                <p className="text-muted-foreground font-sans">Learn Tamil culture through images</p>
              </div>
            </div>

            <Card className="p-8">
              <div className="relative aspect-video rounded-lg overflow-hidden mb-6 bg-muted">
                <Image
                  src={question.image.startsWith("/") ? `https://source.unsplash.com/featured/?South Indian Filter Coffee` : question.image || "https://source.unsplash.com/featured/?Tamil Culture"}
                  alt="Cultural question"
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-xl font-serif text-foreground mb-6 text-center">{question.question}</h2>

              <div className="space-y-3 mb-6">
                {question.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => !showResult && setSelectedAnswer(index)}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all font-sans ${selectedAnswer === index ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      } ${showResult && index === question.correct ? "border-green-500 bg-green-50" : ""} ${showResult && selectedAnswer === index && index !== question.correct
                        ? "border-red-500 bg-red-50"
                        : ""
                      }`}
                  >
                    {choice}
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
                    {selectedAnswer === question.correct ? "Correct! " : "Good try! "}The answer is{" "}
                    {question.choices[question.correct]}
                  </p>
                  <p className="text-sm font-sans text-foreground">{question.explanation}</p>
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
