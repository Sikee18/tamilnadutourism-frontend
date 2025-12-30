"use client"

import { VideoCard } from "@/components/video-card"
import { motion } from "framer-motion"
import { Play } from "lucide-react"
import Link from "next/link"

const immersiveContent = [
    {
        id: "madurai-temple",
        title: "Meenakshi Temple",
        subtitle: "Madurai",
        thumbnail: "https://images.unsplash.com/photo-1660122405026-02206229acc5?fm=jpg&q=80&w=1200",
        videoUrl: "/videos/Madurai.mp4",
    },
    {
        id: "thanjavur-temple",
        title: "Brihadeeswarar Temple",
        subtitle: "Thanjavur",
        thumbnail: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200",
        videoUrl: "/videos/Brihadesswararkovil.mp4",
    },
    {
        id: "kanyakumari-shore",
        title: "Southern Tip",
        subtitle: "Kanyakumari",
        thumbnail: "https://images.unsplash.com/photo-1657265284292-ac60361140a5?fm=jpg&q=80&w=1200",
        videoUrl: "/videos/Kanyakumari.mp4",
    },
]

export function ImmersiveVideoGallery() {
    return (
        <section className="py-24 bg-zinc-950 text-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex items-end justify-between mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-serif font-light mb-4 text-white">
                            Immersive <span className="text-primary italic">Visuals</span>
                        </h2>
                        <p className="text-zinc-400 font-sans text-lg">
                            Experience the sights and sounds of Tamil Nadu through curated video moments.
                            Hover to play.
                        </p>
                    </div>
                    <Link href="/explore/gallery">
                        <button className="hidden md:flex items-center gap-2 px-6 py-3 border border-zinc-800 rounded-full hover:bg-zinc-900 transition-colors group">
                            <Play className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-sans">View Full Gallery</span>
                        </button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {immersiveContent.map((item, index) => (
                        <VideoCard
                            key={item.id}
                            title={item.title}
                            subtitle={item.subtitle}
                            thumbnail={item.thumbnail}
                            videoUrl={item.videoUrl}
                            className={index === 1 ? "md:translate-y-12" : ""}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
