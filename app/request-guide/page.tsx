"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import { Calendar, MapPin, Clock, Users, MessageSquare, Send, Info } from "lucide-react"
import { motion } from "framer-motion"
import { RequestStore } from "@/lib/request-store"

export default function RequestGuidePage() {
  const { isAuthenticated, userRole } = useAuth()
  const router = useRouter()
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    placeName: "",
    preferredDate: "",
    preferredTime: "",
    groupSize: "1",
    touristMessage: "",
  })

  if (!isAuthenticated || userRole !== "tourist") {
    router.push("/login")
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    RequestStore.createRequest({
      touristName: "Tourist User", // In real app, get from auth context
      touristId: "tourist_1", // In real app, get from auth context
      placeName: formData.placeName,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      groupSize: Number.parseInt(formData.groupSize),
      touristMessage: formData.touristMessage,
    })

    setShowSuccess(true)
    setTimeout(() => {
      router.push("/tourist/requests")
    }, 2500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (showSuccess) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif text-foreground mb-3">Request Sent!</h2>
          <p className="text-muted-foreground font-sans leading-relaxed">
            Your request has been sent to local guides. They will review and respond with availability and pricing.
          </p>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 via-background to-background border-b border-border pt-32 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4 text-balance">Request a Visit</h1>
            <p className="text-lg text-muted-foreground font-sans text-balance">
              Request to visit a specific place and let local guides respond with their availability
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8"
          >
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="font-sans font-semibold text-foreground">How It Works</h3>
                <div className="text-sm text-muted-foreground font-sans space-y-2">
                  <p>1. Request to visit a specific place with your preferred date and time</p>
                  <p>2. Local guides review your request and send a quote with their availability</p>
                  <p>3. You can accept the quote, negotiate once, or decline</p>
                  <p>4. After agreement, pay a refundable intent deposit (15%) to confirm</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-2xl p-8 space-y-6"
          >
            {/* Place Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-sans font-medium text-foreground mb-3">
                <MapPin className="w-4 h-4 text-primary" />
                Place Name
              </label>
              <select
                name="placeName"
                value={formData.placeName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option value="">Select a place to visit</option>
                <option value="Meenakshi Temple, Madurai">Meenakshi Temple, Madurai</option>
                <option value="Brihadeeswarar Temple, Thanjavur">Brihadeeswarar Temple, Thanjavur</option>
                <option value="Shore Temple, Mahabalipuram">Shore Temple, Mahabalipuram</option>
                <option value="Ramanathaswamy Temple, Rameswaram">Ramanathaswamy Temple, Rameswaram</option>
                <option value="Thiruvalluvar Statue, Kanyakumari">Thiruvalluvar Statue, Kanyakumari</option>
                <option value="Government Museum, Chennai">Government Museum, Chennai</option>
                <option value="Ooty Lake & Botanical Garden">Ooty Lake & Botanical Garden</option>
                <option value="Kodaikanal Lake">Kodaikanal Lake</option>
                <option value="Chettinad Mansions">Chettinad Mansions</option>
                <option value="Auroville, Pondicherry">Auroville, Pondicherry</option>
              </select>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-sans font-medium text-foreground mb-3">
                  <Calendar className="w-4 h-4 text-primary" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-sans font-medium text-foreground mb-3">
                  <Clock className="w-4 h-4 text-primary" />
                  Preferred Time
                </label>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                >
                  <option value="">Select time</option>
                  <option value="Morning (6 AM - 10 AM)">Morning (6 AM - 10 AM)</option>
                  <option value="Late Morning (10 AM - 12 PM)">Late Morning (10 AM - 12 PM)</option>
                  <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                  <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                </select>
              </div>
            </div>

            {/* Group Size */}
            <div>
              <label className="flex items-center gap-2 text-sm font-sans font-medium text-foreground mb-3">
                <Users className="w-4 h-4 text-primary" />
                Group Size
              </label>
              <select
                name="groupSize"
                value={formData.groupSize}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option value="1">1 person</option>
                <option value="2">2 people</option>
                <option value="3">3 people</option>
                <option value="4">4 people</option>
                <option value="5">5 people</option>
                <option value="6">6+ people</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="flex items-center gap-2 text-sm font-sans font-medium text-foreground mb-3">
                <MessageSquare className="w-4 h-4 text-primary" />
                Message (Optional)
              </label>
              <textarea
                name="touristMessage"
                value={formData.touristMessage}
                onChange={handleChange}
                rows={4}
                placeholder="Any special requests or accessibility needs..."
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground font-sans placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground font-sans font-medium rounded-lg hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Send className="w-5 h-5" />
              Send Request
            </button>
          </motion.form>
        </div>
      </div>

      <Footer />
    </main>
  )
}
