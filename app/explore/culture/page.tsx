"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin } from "lucide-react"
import { EXPERIENCE_CATEGORIES } from "@/lib/tourism-data"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"

const experiences = EXPERIENCE_CATEGORIES.culture.experiences

export default function CulturePage() {
  const [selectedExperience, setSelectedExperience] = useState<(typeof experiences)[number] | null>(null)

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1920&q=80"
            alt="Culture & Heritage"
            fill
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-sans">Back to Home</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white mb-4 text-balance">
              Culture & Heritage
            </h1>
            <p className="text-xl text-white/80 font-sans max-w-2xl text-balance">
              Ancient traditions, classical arts, and living heritage of Tamil Nadu
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-6">
              Immerse Yourself in Tradition
            </h2>
            <p className="text-muted-foreground font-sans leading-relaxed max-w-3xl">
              Tamil Nadu's cultural heritage spans millennia, from traditional crafts to classical arts passed down
              through generations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                onClick={() => setSelectedExperience(experience)}
                className="bg-card rounded-xl overflow-hidden shadow-md border border-border group cursor-pointer hover:shadow-xl transition-shadow duration-300"
              >
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
                    >
                      <Image
                        src={experience.image}
                        alt={experience.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {experience.district}
                    </div>

                    <h3 className="text-2xl font-serif text-foreground mb-2 text-balance">{experience.title}</h3>
                    <p className="text-muted-foreground font-sans leading-relaxed text-sm text-balance">
                      {experience.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Detail Modal */}
      <Dialog open={!!selectedExperience} onOpenChange={() => setSelectedExperience(null)}>
        <DialogContent className="max-w-2xl">
          {selectedExperience && (
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-serif font-light text-foreground mb-1">{selectedExperience.title}</h2>
                  <p className="text-sm text-muted-foreground">{selectedExperience.district} District</p>
                </div>
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-sans font-semibold text-sm mb-2">What it is</h3>
                  <p className="text-sm text-muted-foreground">{selectedExperience.description}</p>
                </div>

                <div>
                  <h3 className="font-sans font-semibold text-sm mb-2">Cultural Significance</h3>
                  <p className="text-sm text-muted-foreground">{selectedExperience.significance}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  )
}
