"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

const scenarios = [
  {
    id: "wakeup",
    title: "Wake Up",
    situation: "You wake up early in a traditional Tamil home. What should you do first?",
    choices: [
      {
        text: "Draw a kolam (rangoli) at the entrance",
        feedback: "Recommended",
        reason: "Drawing kolam is a beautiful Tamil tradition done every morning to welcome prosperity and guests.",
      },
      {
        text: "Check your phone immediately",
        feedback: "Not Recommended",
        reason: "Starting the day with mindfulness and tradition helps connect with Tamil culture.",
      },
    ],
  },
  {
    id: "breakfast",
    title: "Breakfast",
    situation: "You're invited for a traditional breakfast. How should you eat?",
    choices: [
      {
        text: "Use your right hand respectfully",
        feedback: "Recommended",
        reason: "In Tamil culture, eating with your right hand is traditional and shows respect for food and customs.",
      },
      {
        text: "Use a fork and knife",
        feedback: "Not Recommended",
        reason: "While acceptable, traditional Tamil meals are best enjoyed by hand to connect with the culture.",
      },
    ],
  },
  {
    id: "temple",
    title: "Temple Visit",
    situation: "You're visiting a famous Tamil temple. What's the proper way to enter?",
    choices: [
      {
        text: "Remove shoes and dress modestly",
        feedback: "Recommended",
        reason: "Removing footwear and dressing modestly shows respect for the sacred space in Tamil temples.",
      },
      {
        text: "Walk in casually with shoes",
        feedback: "Not Recommended",
        reason: "This would be disrespectful. Tamil temples require removing shoes and modest attire.",
      },
    ],
  },
  {
    id: "market",
    title: "Local Market",
    situation: "You're shopping at a local market. How should you interact with vendors?",
    choices: [
      {
        text: "Greet with 'Vanakkam' and smile",
        feedback: "Recommended",
        reason: "Using the Tamil greeting 'Vanakkam' shows respect and helps build friendly connections with locals.",
      },
      {
        text: "Point and demand without greeting",
        feedback: "Not Recommended",
        reason: "This comes across as rude. Tamil culture values warm greetings and polite interactions.",
      },
    ],
  },
  {
    id: "lunch",
    title: "Lunch Time",
    situation: "You're served a traditional Tamil thali on a banana leaf. What should you do?",
    choices: [
      {
        text: "Mix rice with curry using fingers",
        feedback: "Recommended",
        reason: "Mixing with your fingers is the authentic way to eat Tamil meals and enhances the flavors.",
      },
      {
        text: "Eat each item separately with a spoon",
        feedback: "Not Recommended",
        reason: "While clean, this misses the cultural practice of mixing and eating by hand.",
      },
    ],
  },
  {
    id: "evening",
    title: "Evening Time",
    situation: "You meet elders in the family. How should you greet them?",
    choices: [
      {
        text: "Touch their feet as a sign of respect",
        feedback: "Recommended",
        reason: "Touching elders' feet is a traditional Tamil gesture showing deep respect and seeking blessings.",
      },
      {
        text: "Wave and say 'Hi'",
        feedback: "Not Recommended",
        reason: "While friendly, this doesn't honor the Tamil tradition of showing respect to elders.",
      },
    ],
  },
  {
    id: "dinner",
    title: "Dinner",
    situation: "After dinner, what's a thoughtful gesture?",
    choices: [
      {
        text: "Help clean and fold the banana leaf inward",
        feedback: "Recommended",
        reason: "Folding the leaf inward shows gratitude and satisfaction with the meal in Tamil culture.",
      },
      {
        text: "Leave immediately after eating",
        feedback: "Not Recommended",
        reason: "Staying briefly and helping shows appreciation for the hospitality in Tamil homes.",
      },
    ],
  },
  {
    id: "sleep",
    title: "Sleep",
    situation: "Before sleeping, what's a good practice?",
    choices: [
      {
        text: "Reflect on the day and express gratitude",
        feedback: "Recommended",
        reason: "Tamil culture values mindfulness and gratitude, making reflection a meaningful end to the day.",
      },
      {
        text: "Scroll social media until late",
        feedback: "Not Recommended",
        reason: "Traditional Tamil values emphasize rest and reflection for a balanced life.",
      },
    ],
  },
]

export default function DayInTNPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [completed, setCompleted] = useState(false)

  const currentScenario = scenarios[currentStep]

  const handleChoiceSelect = (index: number) => {
    setSelectedChoice(index)
    setShowFeedback(true)
  }

  const handleNext = () => {
    if (currentStep < scenarios.length - 1) {
      setCurrentStep(currentStep + 1)
      setSelectedChoice(null)
      setShowFeedback(false)
    } else {
      setCompleted(true)
    }
  }

  if (completed) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-6 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-10 h-10 text-green-600" />
                </div>
                <h1 className="text-3xl font-serif font-light text-foreground mb-4">Congratulations!</h1>
                <p className="text-lg font-sans text-muted-foreground mb-8">You completed a Day in Tamil Nadu</p>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-8">
                  <p className="font-sans font-semibold text-amber-800">Cultural Respect Badge Earned!</p>
                </div>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => window.location.reload()} variant="outline">
                    Play Again
                  </Button>
                  <Link href="/games">
                    <Button>Back to Games</Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
        <Footer />
      </main>
    )
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

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-sans text-muted-foreground">
                Step {currentStep + 1} of {scenarios.length}
              </p>
              <p className="text-sm font-sans text-muted-foreground">{currentScenario.title}</p>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / scenarios.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-8">
                <h2 className="text-2xl font-serif text-foreground mb-4">{currentScenario.title}</h2>
                <p className="text-lg font-sans text-muted-foreground mb-8">{currentScenario.situation}</p>

                <div className="space-y-4">
                  {currentScenario.choices.map((choice, index) => (
                    <button
                      key={index}
                      onClick={() => handleChoiceSelect(index)}
                      disabled={showFeedback}
                      className={`w-full text-left p-5 rounded-lg border-2 transition-all font-sans ${
                        selectedChoice === index
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      } ${showFeedback ? "cursor-default" : "cursor-pointer"}`}
                    >
                      <p className="font-medium">{choice.text}</p>
                    </button>
                  ))}
                </div>

                {showFeedback && selectedChoice !== null && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                    <div
                      className={`p-5 rounded-lg border-2 ${
                        currentScenario.choices[selectedChoice].feedback === "Recommended"
                          ? "bg-green-50 border-green-200"
                          : "bg-blue-50 border-blue-200"
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-2">
                        {currentScenario.choices[selectedChoice].feedback === "Recommended" ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                        )}
                        <div>
                          <p className="font-sans font-semibold text-foreground mb-1">
                            {currentScenario.choices[selectedChoice].feedback}
                          </p>
                          <p className="text-sm font-sans text-foreground">
                            {currentScenario.choices[selectedChoice].reason}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button onClick={handleNext} className="w-full mt-4">
                      {currentStep < scenarios.length - 1 ? "Next Scenario" : "Complete Journey"}
                    </Button>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </main>
  )
}
