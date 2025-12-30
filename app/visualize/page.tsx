"use client"

import { Navigation } from "@/components/navigation"
import { VisualizeMap } from "@/components/visualize-map"
import { motion } from "framer-motion"

export default function VisualizePage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-primary selection:text-black overflow-hidden relative">
            <Navigation />

            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.2)_0%,black_70%)] pointer-events-none" />

            <div className="container mx-auto px-6 pt-40 min-h-screen flex flex-col items-center justify-start relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4 font-medium">Interactive Journey</p>
                    <h1 className="text-4xl md:text-6xl font-serif font-light mb-6">
                        Visualize <span className="italic text-zinc-500">Tamil Nadu</span>
                    </h1>
                    <p className="text-zinc-400 max-w-lg mx-auto leading-relaxed">
                        Select a destination on the map to enter an immersive AR/VR experience.
                        Walk through temples, fly over hills, and explore heritage in 3D.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="w-full flex-1 flex items-center justify-center -mt-8"
                >
                    <VisualizeMap />
                </motion.div>
            </div>
        </main>
    )
}
