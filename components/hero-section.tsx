"use client"

import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  const scale = useTransform(scrollY, [0, 500], [1, 1.2])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ scale }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1920&q=80"
          alt="Tamil Nadu Heritage"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-zinc-950" />

        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.1),transparent_50%)]"
          style={{
            // @ts-ignore
            "--mouse-x": `${mousePosition.x}px`,
            "--mouse-y": `${mousePosition.y}px`,
          }}
        />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-white text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-tight max-w-4xl mb-12 text-balance"
        >
          Experience Tamil Nadu
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="block text-temple-gold italic mt-4"
          >
            Beyond Places
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/explore"
            className="group px-10 py-4 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-sans font-medium rounded-lg hover:bg-primary/90 hover:shadow-2xl transition-all duration-500 flex items-center gap-3 cursor-pointer"
          >
            Explore Tamil Nadu
            <svg
              className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
