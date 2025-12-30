import Link from "next/link"

const footerLinks = {
  explore: [
    { href: "/explore/culture", label: "Culture & Heritage" },
    { href: "/explore/nature", label: "Hills & Nature" },
    { href: "/explore/spiritual", label: "Temples & Spirituality" },
    { href: "/explore/coastal", label: "Coastal Life" },
    { href: "/culinary", label: "Culinary Tamil Nadu" },
  ],
  destinations: [
    { href: "/destinations/mahabalipuram", label: "Mahabalipuram" },
    { href: "/destinations/madurai", label: "Madurai" },
    { href: "/destinations/ooty", label: "Ooty" },
    { href: "/destinations/thanjavur", label: "Thanjavur" },
    { href: "/destinations/kanyakumari", label: "Kanyakumari" },
  ],
  platform: [
    { href: "/login/tourist", label: "Tourist Login" },
    { href: "/login/guide", label: "Guide Login" },
    { href: "/heritage", label: "Digital Heritage" },
    { href: "/map", label: "Interactive Map" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-deep-indigo text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-temple-gold flex items-center justify-center">
                <span className="text-deep-indigo font-bold text-xl">TN</span>
              </div>
              <div>
                <h3 className="text-xl font-serif font-semibold">Tamil Nadu</h3>
                <p className="text-sm font-sans text-white/70 tracking-widest uppercase">Digital Tourism</p>
              </div>
            </div>
            <p className="text-white/70 font-sans leading-relaxed text-sm">
              A digital gateway to experience the rich culture, heritage, and traditions of Tamil Nadu. Discover beyond
              places.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-temple-gold font-sans font-semibold mb-6 tracking-wide uppercase text-sm">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 font-sans hover:text-white transition-colors text-sm cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-temple-gold font-sans font-semibold mb-6 tracking-wide uppercase text-sm">
              Destinations
            </h4>
            <ul className="space-y-3">
              {footerLinks.destinations.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 font-sans hover:text-white transition-colors text-sm cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-temple-gold font-sans font-semibold mb-6 tracking-wide uppercase text-sm">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 font-sans hover:text-white transition-colors text-sm cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm font-sans">
            © {new Date().getFullYear()} Tamil Nadu Digital Tourism Platform. A Government of Tamil Nadu Initiative.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-white/50 font-sans hover:text-white text-sm transition-colors cursor-pointer"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/50 font-sans hover:text-white text-sm transition-colors cursor-pointer"
            >
              Terms of Service
            </Link>
            <Link
              href="/accessibility"
              className="text-white/50 font-sans hover:text-white text-sm transition-colors cursor-pointer"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
