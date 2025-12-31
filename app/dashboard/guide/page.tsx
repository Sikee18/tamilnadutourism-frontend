"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  Calendar,
  MessageSquare,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Bell,
  Settings,
  Shield,
  Award,
  BookOpen,
} from "lucide-react"

const incomingRequests = [
  {
    id: "1",
    tourist: {
      name: "Sarah Johnson",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
      country: "United States",
    },
    destination: "Kanyakumari",
    date: "Dec 30, 2025",
    duration: "Full Day",
    interests: ["Sunrise View", "History"],
    message: "Looking for a guide to explain the history of Vivekananda Rock Memorial.",
    status: "pending",
  },
  {
    id: "2",
    tourist: {
      name: "Hans Mueller",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      country: "Germany",
    },
    destination: "Mahabalipuram",
    date: "Jan 5, 2026",
    duration: "Half Day",
    interests: ["Architecture", "Sculpture"],
    message: "Interested in the Shore Temple and Five Rathas.",
    status: "pending",
  },
]

const stats = {
  totalTours: 234,
  rating: 4.9,
  reviews: 189,
  thisMonth: 12,
}

const guidelines = [
  {
    icon: Shield,
    text: "Always carry your government-issued guide ID",
  },
  {
    icon: BookOpen,
    text: "Respect temple dress codes and customs",
  },
  {
    icon: CheckCircle,
    text: "Provide accurate historical information",
  },
  {
    icon: Clock,
    text: "Be punctual for all scheduled tours",
  },
  {
    icon: Bell,
    text: "Report any safety concerns immediately",
  },
]

export default function GuideDashboard() {
  const [requests, setRequests] = useState(incomingRequests)

  const handleRequest = (id: string, action: "accept" | "decline") => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: action === "accept" ? "accepted" : "declined" } : req)),
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-secondary/20">
                <Image src="https://images.unsplash.com/photo-1622325996025-06048d087df2?q=80&w=200&auto=format&fit=crop" alt="Guide Photo" fill className="object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-serif font-light text-foreground">Welcome, Murugan</h1>
                  {/* Government Certification Badge */}
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-secondary/10 text-secondary text-xs font-sans font-medium rounded-sm border border-secondary/20">
                    <Award className="w-3 h-3" />
                    TN Tourism Certified
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm font-sans text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Tamil Nadu Certified Guide</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-sans font-medium rounded-sm hover:bg-primary/90 transition-all shadow-sm">
                <CheckCircle className="w-4 h-4" />
                Post New Experience
              </button>
              <button className="p-2 bg-card border border-border rounded-sm hover:bg-muted transition-colors relative">
                <Bell className="w-5 h-5 text-foreground" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs font-sans rounded-full flex items-center justify-center">
                  2
                </span>
              </button>
              <Link
                href="/dashboard/guide/settings"
                className="p-2 bg-card border border-border rounded-sm hover:bg-muted transition-colors"
              >
                <Settings className="w-5 h-5 text-foreground" />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-card border border-border rounded-sm p-5">
              <p className="text-sm font-sans text-muted-foreground mb-1">Total Tours</p>
              <p className="text-3xl font-serif font-light text-foreground">{stats.totalTours}</p>
            </div>
            <div className="bg-card border border-border rounded-sm p-5">
              <p className="text-sm font-sans text-muted-foreground mb-1">Rating</p>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary fill-primary" />
                <p className="text-3xl font-serif font-light text-foreground">{stats.rating}</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-sm p-5">
              <p className="text-sm font-sans text-muted-foreground mb-1">Reviews</p>
              <p className="text-3xl font-serif font-light text-foreground">{stats.reviews}</p>
            </div>
            <div className="bg-card border border-border rounded-sm p-5">
              <p className="text-sm font-sans text-muted-foreground mb-1">This Month</p>
              <p className="text-3xl font-serif font-light text-foreground">{stats.thisMonth}</p>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Incoming Requests */}
            <section className="lg:col-span-2">
              <h2 className="text-xl font-serif text-foreground mb-6">Incoming Requests</h2>
              <div className="space-y-4">
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className={`bg-card border rounded-sm p-6 transition-all ${request.status === "pending"
                      ? "border-border"
                      : request.status === "accepted"
                        ? "border-green-200 bg-green-50/50"
                        : "border-red-200 bg-red-50/50"
                      }`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                        <Image
                          src={request.tourist.photo || "/placeholder.svg"}
                          alt={request.tourist.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-sans font-medium text-foreground">{request.tourist.name}</h3>
                            <p className="text-sm font-sans text-muted-foreground">{request.tourist.country}</p>
                          </div>
                          {request.status !== "pending" && (
                            <span
                              className={`px-3 py-1 text-xs font-sans rounded-sm ${request.status === "accepted"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                }`}
                            >
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm font-sans">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{request.destination}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{request.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{request.duration}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {request.interests.map((interest) => (
                        <span
                          key={interest}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs font-sans rounded-sm"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm font-sans text-muted-foreground mb-4 italic border-l-2 border-muted pl-3">
                      {request.message}
                    </p>

                    {request.status === "pending" && (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleRequest(request.id, "accept")}
                          className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground text-sm font-sans font-medium rounded-sm hover:bg-secondary/90 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleRequest(request.id, "decline")}
                          className="flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground text-sm font-sans font-medium rounded-sm hover:bg-muted/80 transition-colors"
                        >
                          <XCircle className="w-4 h-4" />
                          Decline
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 text-primary text-sm font-sans font-medium hover:underline">
                          <MessageSquare className="w-4 h-4" />
                          Message
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {requests.length === 0 && (
                  <div className="text-center py-12 bg-muted/50 rounded-sm">
                    <p className="text-muted-foreground font-sans">No pending requests</p>
                  </div>
                )}
              </div>
            </section>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Profile Card */}
              <div className="bg-card border border-border rounded-sm p-6">
                <h3 className="font-serif text-foreground mb-4">Your Profile</h3>
                <div className="space-y-3 text-sm font-sans">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Districts</span>
                    <span className="text-foreground">Chennai, Mahabalipuram, Kanyakumari</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Languages</span>
                    <span className="text-foreground">Tamil, English, Hindi</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Expertise</span>
                    <span className="text-foreground">Temple Architecture</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Certification</span>
                    <span className="text-secondary flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Verified
                    </span>
                  </div>
                </div>
                <Link
                  href="/dashboard/guide/profile"
                  className="block w-full text-center mt-4 py-2 bg-muted text-foreground text-sm font-sans font-medium rounded-sm hover:bg-muted/80 transition-colors"
                >
                  Edit Profile
                </Link>
              </div>

              {/* Cultural Guidelines */}
              <div className="bg-accent/5 border border-accent/20 rounded-sm p-6">
                <h3 className="font-serif text-accent mb-4">Cultural Guidelines</h3>
                <ul className="space-y-3">
                  {guidelines.map((guideline, index) => {
                    const Icon = guideline.icon
                    return (
                      <li key={index} className="flex items-start gap-3 text-sm font-sans text-foreground">
                        <Icon className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{guideline.text}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Government Badge */}
              <div className="bg-secondary/5 border border-secondary/20 rounded-sm p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Award className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-serif text-foreground mb-2">Government Certified</h3>
                <p className="text-sm font-sans text-muted-foreground mb-3">
                  Official recognition from the Department of Tourism, Tamil Nadu
                </p>
                <p className="text-xs font-sans text-secondary">License: TN/GUIDE/2024/1847</p>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
