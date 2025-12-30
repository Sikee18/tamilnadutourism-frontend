"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Volume2, VolumeX, ArrowLeft, ChevronDown } from "lucide-react"
import Link from "next/link"

const ALL_VIDEOS = [
    {
        id: "thanjavur",
        title: "Brihadeeswara Temple",
        location: "Thanjavur",
        src: "/videos/Brihadesswararkovil.mp4",
        youtubeId: undefined, // Force local video
        aspect: "video",
    },
    {
        id: "ooty",
        title: "Queen of Hills",
        location: "Ooty",
        src: "/videos/Ooty.mp4",
        aspect: "video",
    },
    {
        id: "rameshwaram",
        title: "Pamban Bridge & Ocean",
        location: "Rameshwaram",
        src: "/videos/Rameshwaram2.mp4",
        aspect: "video",
    },
    {
        id: "mahabalipuram",
        title: "Shore Temple Heritage",
        location: "Mahabalipuram",
        src: "/videos/Mahabalipuram (2).mp4",
        aspect: "video",
    },
    {
        id: "madurai-main",
        title: "Meenakshi Amman Temple",
        location: "Madurai",
        src: "/videos/Madurai.mp4",
        youtubeId: undefined, // Removed YouTube ID to force local video
        aspect: "video",
    },
    {
        id: "kanyakumari",
        title: "Land's End Sunrise",
        location: "Kanyakumari",
        src: "/videos/Kanyakumari.mp4",
        aspect: "video",
    },
    {
        id: "chettinad",
        title: "Heritage Mansions",
        location: "Chettinad",
        src: "/videos/chettinadhouse.mp4",
        aspect: "video",
    },
    {
        id: "courtallam",
        title: "Courtallam Falls",
        location: "Tenkasi",
        src: "/videos/Thenkasi.mp4",
        aspect: "vertical",
    },
    {
        id: "thoothukudi",
        title: "Shivan Temple",
        location: "Thoothukudi",
        src: "/videos/ThoothukudiShivanTemple.mp4",
        aspect: "video",
    },
    {
        id: "hills-general",
        title: "Misty Western Ghats",
        location: "Tamil Nadu",
        src: "/videos/Hillstations.mp4",
        aspect: "video",
    },
    {
        id: "madurai-rituals",
        title: "Temple Rituals",
        location: "Madurai",
        src: "/videos/Madurai2.mp4",
        aspect: "video",
    },
]

export default function GalleryPage() {
    return (
        <main className="h-screen w-full bg-black text-white overflow-y-scroll snap-y snap-mandatory scroll-smooth">
            {/* Fixed Header / Back Button */}
            <div className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-start pointer-events-none">
                <Link href="/explore" className="pointer-events-auto group">
                    <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:bg-black/40 transition-all">
                        <ArrowLeft className="w-4 h-4 text-white" />
                        <span className="text-xs font-medium tracking-widest uppercase text-white/90">Back to Explore</span>
                    </div>
                </Link>
            </div>

            {/* Hero Section - Pamban Bridge Intro */}
            <section className="relative h-screen w-full snap-start flex items-center justify-center overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                >
                    <source src="/videos/Rameshwaram2.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />

                <div className="relative z-10 text-center max-w-4xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <p className="text-primary text-sm md:text-base tracking-[0.4em] uppercase mb-6 font-medium">
                            The Visual Journey
                        </p>
                        <h1 className="text-5xl md:text-8xl font-serif font-light mb-8 leading-tight">
                            Tamil Nadu <br />
                            <span className="italic text-white/90">In Motion</span>
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
                            Experience the soul of the south through a curated collection of cinematic moments.
                            From ancient stones to endless shores.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 text-xs tracking-widest uppercase"
                >
                    <span>Scroll to Explore</span>
                    <ChevronDown className="w-5 h-5 animate-bounce" />
                </motion.div>
            </section>

            {ALL_VIDEOS.map((video, index) => (
                <GallerySection key={video.id} video={video} index={index} />
            ))}
        </main>
    )
}

function GallerySection({ video, index }: { video: any, index: number }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const isInView = useInView(containerRef, { amount: 0.6 })
    const [isMuted, setIsMuted] = useState(true)
    const [videoError, setVideoError] = useState(false)

    // Handle Play/Pause based on viewport visibility
    useEffect(() => {
        if (isInView && !video.youtubeId) {
            if (videoRef.current) {
                videoRef.current.currentTime = 0
                videoRef.current.play().catch(() => {
                    // Autoplay might be blocked if not muted, but we start muted
                })
            }
        } else if (!isInView && !video.youtubeId) {
            if (videoRef.current) {
                videoRef.current.pause()
            }
        }
    }, [isInView, video.youtubeId])

    const toggleMute = () => setIsMuted(!isMuted)

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full snap-start flex items-center justify-center overflow-hidden bg-zinc-950"
        >
            {/* Video Layer */}
            <div className="absolute inset-0 w-full h-full">
                {video.youtubeId ? (
                    <div className="relative w-full h-full pointer-events-none">
                        {/* YouTube Embed - using a background-style embed */}
                        {isInView && (
                            <iframe
                                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=${video.youtubeId}&playsinline=1&rel=0&showinfo=0&modestbranding=1`}
                                className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover scale-[1.35] md:scale-125" // Scale to cover black bars
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                style={{ pointerEvents: 'none' }}
                            />
                        )}
                        {/* Cover div to prevent interaction with YouTube interactions if needed, though pointer-events-none handles it */}
                    </div>
                ) : (
                    <video
                        ref={videoRef}
                        src={video.src}
                        className="w-full h-full object-cover"
                        muted={isMuted}
                        loop
                        playsInline
                        onError={() => setVideoError(true)}
                    />
                )}
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 pointer-events-none" />

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20 flex flex-col items-start gap-4 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 rounded bg-primary/20 backdrop-blur-sm border border-primary/20 text-primary text-[10px] tracking-[0.2em] uppercase font-bold">
                            {index + 1} / {ALL_VIDEOS.length}
                        </span>
                        <span className="text-white/60 text-xs tracking-widest uppercase font-medium">
                            {video.location}
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif font-light text-white mb-4 leading-tight">
                        {video.title}
                    </h2>
                    <p className="text-white/70 max-w-md text-sm md:text-base leading-relaxed hidden md:block">
                        Experience the timeless beauty of Tamil Nadu. Each destination tells a story of heritage, nature, and spirituality.
                    </p>
                </motion.div>
            </div>

            {/* Controls Overlay (Interactive) */}
            <div className="absolute top-1/2 right-8 -translate-y-1/2 flex flex-col gap-6 z-30">
                <button
                    onClick={toggleMute}
                    className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:scale-110 transition-all text-white group"
                >
                    {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                </button>
            </div>

            {/* Scroll Indicator (Only on first slide) */}
            {index === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 pointer-events-none mix-blend-screen"
                >
                    <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
                    <ChevronDown className="w-5 h-5 animate-bounce" />
                </motion.div>
            )}
        </section>
    )
}
