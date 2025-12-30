"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

// Dynamically import the uploaded component to disable SSR (Window object usage)
const GoogleEarthViewer = dynamic(() => import("./arvr/src/components/GoogleEarthViewer"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-xs uppercase tracking-widest text-zinc-500">Initializing Satellite Feed...</p>
        </div>
    )
})

interface VisualizeARVRProps {
    location: string
}

export default function VisualizeARVR({ location }: VisualizeARVRProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="w-full h-full bg-black relative">
            <GoogleEarthViewer targetLocation={location} />
        </div>
    )
}
