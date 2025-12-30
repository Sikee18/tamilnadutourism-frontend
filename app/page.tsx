import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ExperienceCarousel } from "@/components/experience-carousel"
import { DistrictPalette } from "@/components/district-palette"
import { FeaturedDestinations } from "@/components/featured-destinations"
import { BeyondFamiliar } from "@/components/beyond-familiar"
import { LocalGuides } from "@/components/local-guides"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ExperienceCarousel />
      <DistrictPalette />
      <FeaturedDestinations />
      <BeyondFamiliar />
      <LocalGuides />
      <Footer />
    </main>
  )
}
