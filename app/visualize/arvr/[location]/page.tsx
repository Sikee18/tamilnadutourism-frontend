"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, Loader2 } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import the AR/VR Module (Placeholder for now)
// Disabling SSR for AR/VR usually helps with Canvas/Window objects
const VisualizeARVR = dynamic(() => import("@/components/arvr/VisualizeARVR"), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center h-screen w-full bg-black text-white gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="text-xs uppercase tracking-widest text-zinc-500">Loading Module...</span>
        </div>
    )
})

export default function ARVRPage() {
    const params = useParams()
    const router = useRouter()
    const location = params.location as string
    const [loading, setLoading] = useState(true)

    // Simulate a "Scene Prep" loading phase
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <main className="h-screen w-full bg-black relative">
            {/* UI Overlay */}
            <div className="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-start pointer-events-none">
                <button
                    onClick={() => router.back()}
                    className="pointer-events-auto group flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:bg-black/40 transition-all text-white"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs font-medium tracking-widest uppercase text-white/90">Back to Map</span>
                </button>

                <div className="bg-black/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/5 mx-auto">
                    <h1 className="text-sm uppercase tracking-[0.2em] font-medium text-white/80">
                        Visualize: <span className="text-primary">{location}</span>
                    </h1>
                </div>

                {/* Placeholder for standard controls if needed */}
                <div className="w-[100px]" />
            </div>

            {loading ? (
                <div className="absolute inset-0 z-40 bg-black flex flex-col items-center justify-center gap-4">
                    <div className="w-12 h-12 border-2 border-zinc-800 border-t-primary rounded-full animate-spin" />
                    <p className="text-zinc-500 text-xs uppercase tracking-widest animate-pulse">Initializing Environment</p>
                </div>
            ) : (
                <VisualizeARVR location={location} />
            )}
        </main>
    )
}
