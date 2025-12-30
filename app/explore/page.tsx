import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ExperienceCarousel } from "@/components/experience-carousel"
import { FeaturedDestinations } from "@/components/featured-destinations"
import { BeyondFamiliar } from "@/components/beyond-familiar"
import { ShopsAndMarkets } from "@/components/shops-and-markets"
import { ImmersiveVideoGallery } from "@/components/immersive-video-gallery"

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-card">
        <div className="container mx-auto px-6 text-center">
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4">Discover Tamil Nadu</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">Explore by Experience</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From ancient temples to misty hills, from spice-laden kitchens to serene shores — discover the many faces of
            Tamil Nadu.
          </p>
        </div>
      </section>

      <ExperienceCarousel />
      <ImmersiveVideoGallery />
      <FeaturedDestinations />
      <BeyondFamiliar />

      <ShopsAndMarkets />

      <Footer />
    </main>
  )
}
