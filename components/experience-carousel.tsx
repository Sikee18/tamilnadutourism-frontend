"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

const experiences = [
    {
        id: "culture",
        title: "Culture & Heritage",
        description: "Ancient traditions, classical arts, and living heritage",
        image: "https://images.unsplash.com/photo-1746983062953-74c19d0dfc5d?auto=format&fit=crop&q=80",
        href: "/explore/culture",
    },
    {
        id: "hills",
        title: "Hills & Nature",
        description: "Misty peaks, tea gardens, and serene landscapes",
        image: "https://images.unsplash.com/photo-1760884966322-207bd5afdd77?auto=format&fit=crop&q=80",
        href: "/explore/hills",
    },
    {
        id: "spiritual",
        title: "Temples & Spirituality",
        description: "Sacred spaces, divine architecture, and spiritual journeys",
        image: "https://images.unsplash.com/photo-1701665837448-cdbb9fab5a0d?auto=format&fit=crop&q=80",
        href: "/explore/spiritual",
    },
    {
        id: "coastal",
        title: "Coastal Life",
        description: "Pristine shores, fishing villages, and maritime heritage",
        image: "https://images.unsplash.com/photo-1724992609108-0918470cb673?auto=format&fit=crop&q=80",
        href: "/explore/coastal",
    },
    {
        id: "nature",
        title: "Wildlife & Nature",
        description: "Biodiversity, sanctuaries, and natural wonders",
        image: "https://images.unsplash.com/photo-1707455090980-a1e40f2ace15?auto=format&fit=crop&q=80",
        href: "/explore/nature",
    },
]

export function ExperienceCarousel() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    // Auto-slide effect
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide()
        }, 5000)
        return () => clearInterval(timer)
    }, [activeIndex])

    const nextSlide = useCallback(() => {
        setDirection(1)
        setActiveIndex((prev) => (prev + 1) % experiences.length)
    }, [])

    const prevSlide = useCallback(() => {
        setDirection(-1)
        setActiveIndex((prev) => (prev - 1 + experiences.length) % experiences.length)
    }, [])

    const currentExperience = experiences[activeIndex]

    return (
        <section className="py-24 bg-zinc-950 overflow-hidden relative">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-12 items-center">

                    {/* Left Side: Content */}
                    <div className="w-full md:w-1/3 space-y-8">
                        <div>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-primary text-sm font-sans tracking-[0.3em] uppercase mb-4"
                            >
                                Choose Your Path
                            </motion.p>
                            <h2 className="text-4xl md:text-6xl font-serif font-light text-white mb-6">
                                Explore by <br />
                                <span className="italic text-primary">Experience</span>
                            </h2>
                            <p className="text-white/60 font-sans leading-relaxed">
                                Discover Tamil Nadu through curated journeys designed to immerse you in specific facets of our rich heritage.
                            </p>
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={prevSlide}
                                className="p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all active:scale-95"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all active:scale-95"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Active Card Info (Mobile Only) */}
                        <div className="md:hidden">
                            <h3 className="text-2xl font-serif text-white mb-2">{currentExperience.title}</h3>
                            <p className="text-white/70 text-sm">{currentExperience.description}</p>
                        </div>
                    </div>

                    {/* Right Side: Carousel */}
                    <div className="w-full md:w-2/3 relative h-[600px]">
                        {/* Main Image with Zoom Effect */}
                        <div className="relative w-full h-full rounded-2xl overflow-hidden">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={activeIndex}
                                    custom={direction}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={currentExperience.image}
                                        alt={currentExperience.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                    {/* Text Overlay (Desktop) */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="absolute bottom-0 left-0 p-8 md:p-12 hidden md:block"
                                    >
                                        <h3 className="text-4xl font-serif text-white mb-3">{currentExperience.title}</h3>
                                        <p className="text-white/80 text-lg font-sans max-w-md mb-6">{currentExperience.description}</p>

                                        <Link href={currentExperience.href}>
                                            <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium tracking-wide text-sm hover:bg-primary hover:text-white transition-colors">
                                                Explore Now <ArrowUpRight className="w-4 h-4" />
                                            </span>
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Thumbnails / Indicators */}
                        <div className="absolute -bottom-6 md:bottom-8 right-0 md:right-8 flex gap-3 z-20">
                            {experiences.map((exp, idx) => (
                                <button
                                    key={exp.id}
                                    onClick={() => {
                                        setDirection(idx > activeIndex ? 1 : -1)
                                        setActiveIndex(idx)
                                    }}
                                    className={cn(
                                        "w-12 h-1 rounded-full transition-all duration-300",
                                        activeIndex === idx ? "w-20 bg-primary" : "bg-white/30 hover:bg-white/60"
                                    )}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
