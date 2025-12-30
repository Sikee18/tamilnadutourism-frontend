"use client"

import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ALL_DISTRICTS, getDistrictDetails } from "@/lib/tourism-data"
import { motion } from "framer-motion"
import { MapPin, Star, Compass, Info } from "lucide-react"

export default function DestinationPage() {
  const params = useParams()
  // Ensure slug is a string
  const slug = typeof params.slug === 'string' ? params.slug : ''

  // Find key district info
  const districtInfo = ALL_DISTRICTS.find(
    (d) => d.name.toLowerCase() === slug.toLowerCase()
  ) || {
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    region: "Tamil Nadu",
    identity: "Explore the unseen beauty of Tamil Nadu",
  }

  // Get detailed content
  const details = getDistrictDetails(slug)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={details.images[0]}
            alt={districtInfo.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs tracking-widest uppercase mb-4">
              {districtInfo.region} Region
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6">
              {districtInfo.name}
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
              {districtInfo.identity}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview & Highlights Grid */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Main Content - Left */}
          <div className="lg:col-span-8 space-y-12">

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <h2 className="text-3xl font-light mb-6 flex items-center gap-3">
                <Info className="w-6 h-6 text-primary" />
                About {districtInfo.name}
              </h2>
              <p className="text-muted-foreground leading-loose text-lg">
                {details.description}
              </p>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-light mb-6 flex items-center gap-3">
                <Star className="w-6 h-6 text-primary" />
                Key Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {details.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="group p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-card-foreground/90 group-hover:text-primary transition-colors">
                        {highlight}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Gallery Preview (Small Grid) */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {details.images.slice(1, 3).map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative aspect-video rounded-2xl overflow-hidden group"
                >
                  <img
                    src={img}
                    alt={`${districtInfo.name} view ${idx + 2}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </motion.div>
              ))}
            </div>

          </div>

          {/* Sidebar - Right */}
          <div className="lg:col-span-4 space-y-8">

            {/* Underrated Gems Widget */}
            {details.underrated.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-zinc-900/5 dark:bg-zinc-50/5 p-6 rounded-2xl border border-border/50"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Compass className="w-5 h-5 text-amber-500" />
                  <h3 className="text-lg font-medium text-amber-500 uppercase tracking-widest">Hidden Gems</h3>
                </div>

                <div className="space-y-6">
                  {details.underrated.map((gem, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-primary/20 hover:border-primary transition-colors">
                      <h4 className="font-medium text-foreground">{gem.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{gem.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Map Placeholder or Additional Info */}
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-light mb-2">Getting There</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {districtInfo.name} is well connected by road and rail. Plan your trip to explore the {districtInfo.region.toLowerCase()} beauty of Tamil Nadu.
              </p>
              <button className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                View on Map
              </button>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
