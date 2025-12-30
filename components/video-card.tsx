"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Play, Volume2, VolumeX } from "lucide-react"

interface VideoCardProps {
    title: string
    subtitle: string
    thumbnail: string
    videoUrl: string
    className?: string
}

export function VideoCard({ title, subtitle, thumbnail, videoUrl, className = "" }: VideoCardProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const videoRef = useRef<HTMLVideoElement>(null)

    const handleMouseEnter = () => {
        setIsPlaying(true)
        if (videoRef.current) {
            videoRef.current.play().catch((err) => console.log("Video autoplay prevented:", err))
        }
    }

    const handleMouseLeave = () => {
        setIsPlaying(false)
        if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
        }
    }

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsMuted(!isMuted)
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
        }
    }

    return (
        <motion.div
            className={`relative rounded-xl overflow-hidden cursor-pointer group shadow-lg ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
        >
            {/* Aspect Ratio Container */}
            <div className="relative aspect-[9/16] md:aspect-[3/4] lg:aspect-video w-full bg-black">
                {/* Thumbnail Image */}
                <div className={`absolute inset-0 z-10 transition-opacity duration-500 ${isPlaying ? "opacity-0" : "opacity-100"}`}>
                    <Image src={thumbnail} alt={title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                    {/* Play Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-5 h-5 text-white fill-white" />
                        </div>
                    </div>
                </div>

                {/* Video Player */}
                <video
                    ref={videoRef}
                    src={videoUrl}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    loop
                    muted={isMuted}
                    playsInline
                />

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 z-20 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                        <p className="text-secondary text-xs uppercase tracking-widest font-sans font-medium mb-1">{subtitle}</p>
                        <h3 className="text-white text-xl font-serif font-light mb-2">{title}</h3>

                        <AnimatePresence>
                            {isPlaying && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center gap-2 mt-2"
                                >
                                    <button
                                        onClick={toggleMute}
                                        className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                                    >
                                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                                    </button>
                                    <span className="text-white/80 text-xs font-sans">
                                        {isMuted ? "Click to unmute" : "Listening"}
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
