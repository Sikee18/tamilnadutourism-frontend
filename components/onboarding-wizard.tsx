"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Check, ChevronRight, MapPin, Sparkles, X } from 'lucide-react'
import { useAuth } from "@/contexts/auth-context"

const questions = [
    {
        id: 1,
        question: "What kind of trip do you prefer?",
        options: [
            { id: "spiritual", label: "Spiritual / Heritage", icon: "Starts" },
            { id: "food", label: "Food & Culture", icon: "Utensils" },
            { id: "nature", label: "Nature & Hills", icon: "Mountain" },
            { id: "leisure", label: "Relaxed / Leisure", icon: "Sun" },
        ],
    },
    {
        id: 2,
        question: "How crowded are you comfortable with?",
        options: [
            { id: "calm", label: "Very calm" },
            { id: "moderate", label: "Moderate" },
            { id: "lively", label: "Lively" },
            { id: "any", label: "Doesn’t matter" },
        ],
    },
    {
        id: 3,
        question: "What best describes your travel pace?",
        options: [
            { id: "slow", label: "Slow & relaxed" },
            { id: "balanced", label: "Balanced" },
            { id: "fast", label: "Fast & packed" },
        ],
    },
    {
        id: 4,
        question: "What excites you more?",
        options: [
            { id: "temples", label: "Temples & history" },
            { id: "streets", label: "Local food & streets" },
            { id: "scenery", label: "Nature & scenery" },
            { id: "hidden", label: "Hidden / less-known places" },
        ],
    },
    {
        id: 5,
        question: "Preferred climate?",
        options: [
            { id: "cool", label: "Cool" },
            { id: "moderate", label: "Moderate" },
            { id: "warm", label: "Warm" },
            { id: "any", label: "No preference" },
        ],
    },
    {
        id: 6,
        question: "Who are you traveling with?",
        options: [
            { id: "solo", label: "Solo" },
            { id: "friends", label: "Friends" },
            { id: "family", label: "Family" },
            { id: "group", label: "Elderly / mixed group" },
        ],
    },
    {
        id: 7,
        question: "What matters most to you?",
        options: [
            { id: "culture", label: "Cultural depth" },
            { id: "comfort", label: "Comfort" },
            { id: "explore", label: "Exploration" },
            { id: "unique", label: "Unique experience" },
        ],
    },
]

type Answers = Record<number, string>

export function OnboardingWizard() {
    const { userRole, isAuthenticated } = useAuth()
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [answers, setAnswers] = useState<Answers>({})
    const [result, setResult] = useState<{ name: string; reason: string; alternatives: string[] } | null>(null)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        // Only show for authenticated tourists who haven't completed onboarding
        if (isAuthenticated && userRole === "tourist") {
            const hasCompleted = localStorage.getItem("tn_tourism_onboarding_completed")
            if (!hasCompleted) {
                // Small delay to ensure smooth entrance
                setTimeout(() => setIsOpen(true), 1000)
            }
        }
    }, [isAuthenticated, userRole])

    const handleAnswer = (answerId: string) => {
        if (isAnimating) return
        setIsAnimating(true)

        setAnswers((prev) => ({ ...prev, [currentStep + 1]: answerId }))

        // Delay for animation
        setTimeout(() => {
            if (currentStep < questions.length - 1) {
                setCurrentStep((prev) => prev + 1)
            } else {
                generateResult({ ...answers, [currentStep + 1]: answerId })
            }
            setIsAnimating(false)
        }, 400)
    }

    const generateResult = (finalAnswers: Answers) => {
        // Logic to determine destination
        const type = finalAnswers[1] // Spiritual, Food, Nature, Leisure
        const excitement = finalAnswers[4] // Temples, Streets, Scenery, Hidden
        const climate = finalAnswers[5] // Cool, Moderate...

        let destination = {
            name: "Chennai",
            reason: "Based on your love for vibrant culture and food.",
            alternatives: ["Madurai", "Pondicherry"],
        }

        if (type === "spiritual" || excitement === "temples") {
            destination = {
                name: "Madurai",
                reason: "Since you seek spiritual depth and history, the Temple City is your calling.",
                alternatives: ["Thanjavur", "Rameswaram"],
            }
        } else if (type === "nature" || climate === "cool" || excitement === "scenery") {
            destination = {
                name: "Ooty",
                reason: "Your preference for nature and cool weather matches the Queen of Hills.",
                alternatives: ["Kodaikanal", "Yercaud"],
            }
        } else if (excitement === "hidden" || type === "leisure") {
            destination = {
                name: "Chettinad",
                reason: "For a unique, relaxed cultural experience away from crowds.",
                alternatives: ["Thanjavur", "Tranquebar"],
            }
        } else if (type === "food" || excitement === "streets") {
            destination = {
                name: "Madurai",
                reason: "The ultimate destination for authentic flavors and bustling street life.",
                alternatives: ["Chennai", "Coimbatore"],
            }
        }

        setResult(destination)
        setCurrentStep(questions.length) // Move to result screen
    }

    const completeOnboarding = () => {
        localStorage.setItem("tn_tourism_onboarding_completed", "true")
        setIsOpen(false)
    }

    const handleDestinationClick = (dest: string) => {
        completeOnboarding()
        // Map destinations to routes
        const routeMap: Record<string, string> = {
            "Chennai": "/explore/chennai",
            "Madurai": "/explore/madurai",
            "Ooty": "/explore/ooty",
            "Chettinad": "/explore/chettinad",
            "Thanjavur": "/explore/thanjavur",
            "Rameswaram": "/explore/rameswaram",
            "Kodaikanal": "/explore/kodaikanal",
        }
        const path = routeMap[dest] || "/explore"
        router.push(path)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-card w-full max-w-lg rounded-2xl shadow-2xl border border-border overflow-hidden relative flex flex-col max-h-[90vh]">

                {/* Progress Bar - Only valid if not result screen */}
                {currentStep < questions.length && (
                    <div className="h-1 bg-muted w-full">
                        <div
                            className="h-full bg-primary transition-all duration-500 ease-out"
                            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                        />
                    </div>
                )}

                {/* Close Button (Optional, maybe allow skip) */}
                <button
                    onClick={completeOnboarding}
                    className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8 flex flex-col h-full overflow-y-auto">
                    {result ? (
                        // Result Screen
                        <div className="flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                                <Sparkles className="w-8 h-8" />
                            </div>

                            <h2 className="text-sm font-sans font-medium text-muted-foreground uppercase tracking-wider mb-2">
                                We found your perfect match
                            </h2>
                            <h1 className="text-4xl font-serif text-foreground mb-4">{result.name}</h1>
                            <p className="text-foreground/80 font-sans leading-relaxed mb-8 max-w-sm">
                                {result.reason}
                            </p>

                            <button
                                onClick={() => handleDestinationClick(result.name)}
                                className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-sans font-medium mb-4 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                            >
                                Explore {result.name} <ChevronRight className="w-4 h-4" />
                            </button>

                            <div className="w-full pt-6 border-t border-border">
                                <p className="text-sm text-muted-foreground mb-4 font-sans">Other great options for you:</p>
                                <div className="flex gap-3 justify-center">
                                    {result.alternatives.map(alt => (
                                        <button
                                            key={alt}
                                            onClick={() => handleDestinationClick(alt)}
                                            className="px-4 py-2 bg-secondary/10 text-secondary-foreground rounded-lg text-sm font-sans hover:bg-secondary/20 transition-colors"
                                        >
                                            {alt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Question Screen
                        <div className={`flex flex-col flex-1 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'} transition-all duration-300`}>
                            <span className="text-xs font-sans font-medium text-muted-foreground mb-2">
                                Question {currentStep + 1} of {questions.length}
                            </span>
                            <h2 className="text-2xl font-serif text-foreground mb-8">
                                {questions[currentStep].question}
                            </h2>

                            <div className="flex flex-col gap-3">
                                {questions[currentStep].options.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleAnswer(option.id)}
                                        className="group flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/50 transition-all text-left"
                                    >
                                        <span className="font-sans text-foreground group-hover:text-primary transition-colors">
                                            {option.label}
                                        </span>
                                        <div className="w-5 h-5 rounded-full border border-border group-hover:border-primary flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
