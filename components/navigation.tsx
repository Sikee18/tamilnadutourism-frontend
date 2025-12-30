"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { GlobalSearch } from "@/components/global-search"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const { userRole, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-black/40 backdrop-blur-md border-b border-white/10 shadow-lg text-white"
          : "bg-transparent text-white",
      )}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* LEFT ZONE - Logo/Brand */}
          <div className="flex items-center gap-3 group cursor-pointer active:scale-95 transition-transform">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-bold text-lg">TN</span>
              </div>
              <div className="hidden sm:block">
                <h1
                  className={cn(
                    "text-lg font-serif font-semibold tracking-wide transition-colors duration-300 whitespace-nowrap text-white",
                    // "text-white", // Deprecated: Always white for contrast
                  )}
                >
                  ThamizhTrails
                </h1>
              </div>
            </Link>
          </div>

          {/* CENTER ZONE - All Navigation Links (perfectly centered together) */}
          <div className="hidden md:flex items-center justify-center gap-6 flex-1">
            <Link
              href="/"
              className={cn(
                "text-sm font-sans tracking-wide uppercase font-medium transition-all duration-300 hover:opacity-70 cursor-pointer whitespace-nowrap",
                "text-white",
              )}
            >
              Home
            </Link>
            <Link
              href="/explore"
              className={cn(
                "text-sm font-sans tracking-wide uppercase font-medium transition-all duration-300 hover:opacity-70 cursor-pointer whitespace-nowrap",
                "text-white",
              )}
            >
              Explore
            </Link>
            <Link
              href="/visualize"
              className={cn(
                "text-sm font-sans tracking-wide uppercase font-medium transition-all duration-300 hover:opacity-70 cursor-pointer whitespace-nowrap",
                "text-white",
              )}
            >
              Visualize
            </Link>
            <Link
              href="/culinary"
              className={cn(
                "text-sm font-sans tracking-wide uppercase font-medium transition-all duration-300 hover:opacity-70 cursor-pointer whitespace-nowrap",
                "text-white",
              )}
            >
              Culinary
            </Link>
            <Link
              href="/heritage"
              className={cn(
                "text-sm font-sans tracking-wide uppercase font-medium transition-all duration-300 hover:opacity-70 cursor-pointer whitespace-nowrap",
                "text-white",
              )}
            >
              Heritage
            </Link>
            {isAuthenticated && userRole === "tourist" && (
              <Link
                href="/local-board"
                className={cn(
                  "text-sm font-sans tracking-wide uppercase font-medium transition-all duration-300 hover:opacity-70 cursor-pointer whitespace-nowrap",
                  "text-white",
                )}
              >
                Local Board
              </Link>
            )}
            {isAuthenticated && userRole === "tourist" && (
              <Link
                href="/games"
                className={cn(
                  "text-sm font-sans tracking-wide uppercase font-medium transition-all duration-300 hover:opacity-70 cursor-pointer whitespace-nowrap",
                  "text-white",
                )}
              >
                Discover & Play
              </Link>
            )}
          </div>

          {/* RIGHT ZONE - Search + Auth */}
          <div className="hidden md:flex items-center gap-5 justify-end">
            <GlobalSearch isScrolled={isScrolled} />

            {!isAuthenticated ? (
              <Link
                href="/login"
                className={cn(
                  "px-5 py-2 rounded-full border-2 text-sm font-sans tracking-wide uppercase font-medium transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap",
                  isScrolled
                    ? "border-primary text-primary hover:bg-primary hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-black",
                )}
              >
                Login
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  onBlur={() => setTimeout(() => setShowProfileDropdown(false), 200)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-sans tracking-wide uppercase font-medium transition-all duration-300 hover:opacity-70 cursor-pointer whitespace-nowrap",
                    isScrolled ? "border-primary text-primary" : "border-white text-white",
                  )}
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>
                {showProfileDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-xs font-sans text-muted-foreground uppercase tracking-wide">
                        {userRole === "tourist" ? "Client" : "Guide"}
                      </p>
                    </div>
                    {userRole === "tourist" && (
                      <>
                        <Link
                          href="/tourist/requests"
                          className="block px-4 py-2 text-sm font-sans text-foreground hover:bg-muted transition-colors"
                        >
                          My Requests
                        </Link>
                        <Link
                          href="/tourist/bookings"
                          className="block px-4 py-2 text-sm font-sans text-foreground hover:bg-muted transition-colors"
                        >
                          My Bookings
                        </Link>
                      </>
                    )}
                    {userRole === "guide" && (
                      <>
                        <Link
                          href="/guide/dashboard"
                          className="block px-4 py-2 text-sm font-sans text-foreground hover:bg-muted transition-colors"
                        >
                          My Dashboard
                        </Link>
                        <Link
                          href="/guide/requests"
                          className="block px-4 py-2 text-sm font-sans text-foreground hover:bg-muted transition-colors"
                        >
                          Client Requests
                        </Link>
                      </>
                    )}
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm font-sans text-foreground hover:bg-muted transition-colors"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm font-sans text-foreground hover:bg-muted transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 cursor-pointer active:scale-90 transition-transform ml-auto"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={cn("w-6 h-6 text-white")} />
            ) : (
              <Menu className={cn("w-6 h-6 text-white")} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg animate-in slide-in-from-top-2 duration-300">
            <div className="container mx-auto px-6 py-6 space-y-4">
              <div className="pb-4 border-b border-border">
                <GlobalSearch isScrolled={true} />
              </div>

              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-foreground text-lg font-serif py-2 hover:text-primary transition-colors cursor-pointer"
              >
                Home
              </Link>
              <Link
                href="/explore"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-foreground text-lg font-serif py-2 hover:text-primary transition-colors cursor-pointer"
              >
                Explore
              </Link>
              <Link
                href="/map"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-foreground text-lg font-serif py-2 hover:text-primary transition-colors cursor-pointer"
              >
                Visualize
              </Link>
              <Link
                href="/culinary"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-foreground text-lg font-serif py-2 hover:text-primary transition-colors cursor-pointer"
              >
                Culinary
              </Link>
              {isAuthenticated && userRole === "tourist" && (
                <Link
                  href="/games"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-foreground text-lg font-serif py-2 hover:text-primary transition-colors cursor-pointer"
                >
                  Discover & Play
                </Link>
              )}

              <div className="pt-4 border-t border-border space-y-3">
                {!isAuthenticated ? (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-foreground text-lg font-serif py-2 hover:text-primary transition-colors cursor-pointer"
                  >
                    Login
                  </Link>
                ) : (
                  <>
                    {userRole === "tourist" && (
                      <>
                        <Link
                          href="/tourist/requests"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-foreground text-lg font-serif py-2 hover:text-primary transition-colors cursor-pointer"
                        >
                          My Requests
                        </Link>
                        <Link
                          href="/tourist/bookings"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-foreground text-lg font-serif py-2 hover:text-primary transition-colors cursor-pointer"
                        >
                          My Bookings
                        </Link>
                      </>
                    )}
                    {userRole === "guide" && (
                      <>
                        <Link
                          href="/guide/dashboard"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-foreground text-lg font-serif py-2 hover:text-primary transition-colors cursor-pointer"
                        >
                          My Dashboard
                        </Link>
                        <Link
                          href="/guide/requests"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-foreground text-lg font-serif py-2 hover:text-primary transition-colors cursor-pointer"
                        >
                          Client Requests
                        </Link>
                      </>
                    )}
                    <Link
                      href="/settings"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-foreground text-lg font-serif py-2 hover:text-primary transition-colors cursor-pointer"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="block w-full text-left text-foreground text-lg font-serif py-2 hover:text-primary transition-colors cursor-pointer"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
