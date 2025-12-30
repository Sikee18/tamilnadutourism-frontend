import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MapPin, Home } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <h1 className="text-9xl font-serif font-light text-primary mb-4">404</h1>
            <h2 className="text-3xl font-serif font-light text-foreground mb-4">Page Not Found</h2>
            <p className="text-muted-foreground leading-relaxed">
              This path doesn't exist in our tourism guide. Let's get you back on track.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              href="/explore/culture"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-sm hover:border-primary transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Explore Destinations
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
