"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, X, MapPin, Utensils, Compass, Eye, Map } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { ALL_DISTRICTS, FEATURED_DESTINATIONS, UNDERRATED_PLACES, EXPERIENCE_CATEGORIES } from "@/lib/tourism-data"

interface SearchResult {
  id: string
  title: string
  type: "district" | "destination" | "category" | "hidden-gem" | "culinary"
  subtitle: string
  href: string
  icon: React.ReactNode
}

export function GlobalSearch({ isScrolled }: { isScrolled: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchQuery = query.toLowerCase()
    const searchResults: SearchResult[] = []

    // Search districts
    ALL_DISTRICTS.forEach((district) => {
      if (district.name.toLowerCase().includes(searchQuery) || district.identity.toLowerCase().includes(searchQuery)) {
        searchResults.push({
          id: `district-${district.name}`,
          title: district.name,
          type: "district",
          subtitle: district.identity,
          href: `/explore?district=${district.name}`,
          icon: <MapPin className="w-4 h-4" />,
        })
      }
    })

    // Search featured destinations
    FEATURED_DESTINATIONS.forEach((dest) => {
      if (
        dest.name.toLowerCase().includes(searchQuery) ||
        dest.description.toLowerCase().includes(searchQuery) ||
        dest.district.toLowerCase().includes(searchQuery)
      ) {
        searchResults.push({
          id: `destination-${dest.id}`,
          title: dest.name,
          type: "destination",
          subtitle: `${dest.district} • ${dest.category}`,
          href: `/explore?highlight=${dest.id}`,
          icon: <Map className="w-4 h-4" />,
        })
      }
    })

    // Search underrated places
    UNDERRATED_PLACES.forEach((place) => {
      if (
        place.name.toLowerCase().includes(searchQuery) ||
        place.description.toLowerCase().includes(searchQuery) ||
        place.district.toLowerCase().includes(searchQuery)
      ) {
        searchResults.push({
          id: `hidden-${place.id}`,
          title: place.name,
          type: "hidden-gem",
          subtitle: `Hidden Gem • ${place.district}`,
          href: `/explore/underrated?place=${place.id}`,
          icon: <Eye className="w-4 h-4" />,
        })
      }
    })

    // Search experience categories
    Object.values(EXPERIENCE_CATEGORIES).forEach((category) => {
      if (category.title.toLowerCase().includes(searchQuery) || category.subtitle.toLowerCase().includes(searchQuery)) {
        searchResults.push({
          id: `category-${category.id}`,
          title: category.title,
          type: "category",
          subtitle: category.subtitle,
          href: `/explore/${category.id}`,
          icon: <Compass className="w-4 h-4" />,
        })
      }

      // Search within experiences
      category.experiences.forEach((exp) => {
        if (
          exp.title.toLowerCase().includes(searchQuery) ||
          exp.description.toLowerCase().includes(searchQuery) ||
          exp.district.toLowerCase().includes(searchQuery)
        ) {
          searchResults.push({
            id: `experience-${exp.id}`,
            title: exp.title,
            type: "category",
            subtitle: `${category.title} • ${exp.district}`,
            href: `/explore/${category.id}?experience=${exp.id}`,
            icon: <Compass className="w-4 h-4" />,
          })
        }
      })
    })

    // Culinary search (placeholder - can be expanded)
    if ("culinary".includes(searchQuery) || "food".includes(searchQuery) || "cuisine".includes(searchQuery)) {
      searchResults.push({
        id: "culinary-main",
        title: "Culinary Experiences",
        type: "culinary",
        subtitle: "Explore Tamil Nadu cuisine and food trails",
        href: "/culinary",
        icon: <Utensils className="w-4 h-4" />,
      })
    }

    setResults(searchResults.slice(0, 8)) // Limit to 8 results
  }, [query])

  const handleResultClick = (href: string) => {
    router.push(href)
    setIsOpen(false)
    setQuery("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false)
    } else if (e.key === "Enter" && results.length > 0) {
      handleResultClick(results[0].href)
    }
  }

  return (
    <div ref={searchRef} className="relative">
      {/* Search Button/Input */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300",
          isScrolled
            ? "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            : "bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm",
        )}
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline text-sm">Search destinations...</span>
      </button>

      {/* Search Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="bg-background border border-border rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-top-4 duration-300">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search districts, destinations, experiences..."
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                />
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-muted rounded-md transition-colors">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Results */}
              {query.trim() && (
                <div className="max-h-96 overflow-y-auto">
                  {results.length > 0 ? (
                    <div className="py-2">
                      {results.map((result, index) => (
                        <button
                          key={result.id}
                          onClick={() => handleResultClick(result.href)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left animate-in slide-in-from-top-2 duration-200"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div
                            className={cn(
                              "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
                              result.type === "district" && "bg-blue-500/10 text-blue-600",
                              result.type === "destination" && "bg-green-500/10 text-green-600",
                              result.type === "category" && "bg-purple-500/10 text-purple-600",
                              result.type === "hidden-gem" && "bg-orange-500/10 text-orange-600",
                              result.type === "culinary" && "bg-red-500/10 text-red-600",
                            )}
                          >
                            {result.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{result.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{result.subtitle}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-8 text-center text-muted-foreground">
                      <p className="text-sm">No results found for "{query}"</p>
                      <p className="text-xs mt-1">Try searching for districts, temples, or experiences</p>
                    </div>
                  )}
                </div>
              )}

              {/* Quick Links */}
              {!query.trim() && (
                <div className="py-3 px-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">Quick Links</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Explore All", href: "/explore" },
                      { label: "Hidden Gems", href: "/explore/underrated" },
                      { label: "Culinary", href: "/culinary" },
                      { label: "Heritage Sites", href: "/heritage" },
                    ].map((link) => (
                      <button
                        key={link.href}
                        onClick={() => handleResultClick(link.href)}
                        className="px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
