"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import { Calendar, MessageSquare, Check, X, Clock, Send, DollarSign } from "lucide-react"
import { motion } from "framer-motion"

interface TravelRequest {
  id: number
  destination: string
  startDate: string
  endDate: string
  interestType: string
  notes: string
  status: "pending" | "accepted" | "declined"
  createdAt: string
  guideResponse?: {
    availableTime: string
    price: string
    message: string
  }
}

export default function GuideRequestsPage() {
  const { isAuthenticated, userRole } = useAuth()
  const router = useRouter()
  const [requests, setRequests] = useState<TravelRequest[]>([])
  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "declined">("all")
  const [respondingTo, setRespondingTo] = useState<number | null>(null)
  const [responseForm, setResponseForm] = useState({
    availableTime: "",
    price: "",
    message: "",
  })

  useEffect(() => {
    if (!isAuthenticated || userRole !== "guide") {
      router.push("/login")
      return
    }

    const storedRequests = JSON.parse(localStorage.getItem("travelRequests") || "[]")
    setRequests(storedRequests)
  }, [isAuthenticated, userRole, router])

  const handleStatusUpdate = (requestId: number, newStatus: "accepted" | "declined") => {
    const updatedRequests = requests.map((req) => (req.id === requestId ? { ...req, status: newStatus } : req))
    setRequests(updatedRequests)
    localStorage.setItem("travelRequests", JSON.stringify(updatedRequests))
  }

  const handleSendResponse = (requestId: number) => {
    const updatedRequests = requests.map((req) =>
      req.id === requestId
        ? {
            ...req,
            status: "accepted" as const,
            guideResponse: { ...responseForm },
          }
        : req,
    )
    setRequests(updatedRequests)
    localStorage.setItem("travelRequests", JSON.stringify(updatedRequests))
    setRespondingTo(null)
    setResponseForm({ availableTime: "", price: "", message: "" })
  }

  const filteredRequests = requests.filter((req) => (filter === "all" ? true : req.status === filter))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "accepted":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "declined":
        return "bg-red-500/10 text-red-600 border-red-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getInterestIcon = (type: string) => {
    const icons: Record<string, string> = {
      culture: "🏛️",
      food: "🍛",
      nature: "🌿",
      heritage: "🕌",
    }
    return icons[type] || "📍"
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-serif text-foreground mb-2">Client Requests</h1>
            <p className="text-muted-foreground font-sans">Review and respond to incoming travel requests</p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            {(["all", "pending", "accepted", "declined"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-sans text-sm font-medium transition-all ${
                  filter === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status === "pending" && (
                  <span className="ml-2 px-2 py-0.5 bg-primary-foreground/20 rounded-full text-xs">
                    {requests.filter((r) => r.status === "pending").length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Requests List */}
          {filteredRequests.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-serif text-foreground mb-2">No {filter !== "all" ? filter : ""} requests</h3>
              <p className="text-muted-foreground font-sans">
                {filter === "pending"
                  ? "New travel requests will appear here"
                  : "Check back later for travel requests from tourists"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="flex flex-col gap-6">
                    {/* Request Details */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                            {getInterestIcon(request.interestType)}
                          </div>
                          <div>
                            <h3 className="text-lg font-serif font-semibold text-foreground">{request.destination}</h3>
                            <p className="text-sm text-muted-foreground font-sans capitalize">
                              {request.interestType} Experience
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 border rounded-full text-xs font-sans font-medium ${getStatusColor(request.status)}`}
                        >
                          {request.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span className="font-sans">
                            {new Date(request.startDate).toLocaleDateString()} -{" "}
                            {new Date(request.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span className="font-sans">
                            Requested {new Date(request.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {request.notes && (
                        <div className="bg-muted/50 rounded-lg p-4">
                          <p className="flex items-start gap-2 text-sm text-foreground font-sans">
                            <MessageSquare className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                            <span className="leading-relaxed">{request.notes}</span>
                          </p>
                        </div>
                      )}
                    </div>

                    {request.status === "pending" && (
                      <>
                        {respondingTo === request.id ? (
                          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-4">
                            <h4 className="text-sm font-sans font-semibold text-foreground">Send Your Response</h4>
                            <div className="space-y-3">
                              <div>
                                <label className="text-xs font-sans text-muted-foreground mb-1 block">
                                  Available Time
                                </label>
                                <input
                                  type="text"
                                  value={responseForm.availableTime}
                                  onChange={(e) => setResponseForm({ ...responseForm, availableTime: e.target.value })}
                                  placeholder="e.g., 9 AM - 5 PM"
                                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-sans"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-sans text-muted-foreground mb-1 block">Price (₹)</label>
                                <input
                                  type="text"
                                  value={responseForm.price}
                                  onChange={(e) => setResponseForm({ ...responseForm, price: e.target.value })}
                                  placeholder="e.g., ₹2,500"
                                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-sans"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-sans text-muted-foreground mb-1 block">Message</label>
                                <textarea
                                  value={responseForm.message}
                                  onChange={(e) => setResponseForm({ ...responseForm, message: e.target.value })}
                                  placeholder="Share your availability and what you can offer..."
                                  rows={3}
                                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-sans resize-none"
                                />
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <button
                                onClick={() => handleSendResponse(request.id)}
                                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-sans font-medium rounded-lg hover:bg-primary/90 transition-colors"
                              >
                                <Send className="w-4 h-4" />
                                Send Response
                              </button>
                              <button
                                onClick={() => setRespondingTo(null)}
                                className="px-4 py-2 bg-muted text-foreground text-sm font-sans font-medium rounded-lg hover:bg-muted/80 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex gap-3">
                            <button
                              onClick={() => setRespondingTo(request.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-sans font-medium rounded-lg hover:bg-primary/90 transition-colors"
                            >
                              <MessageSquare className="w-4 h-4" />
                              Respond with Details
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(request.id, "declined")}
                              className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground text-sm font-sans font-medium rounded-lg hover:bg-muted/80 transition-colors"
                            >
                              <X className="w-4 h-4" />
                              Decline
                            </button>
                          </div>
                        )}
                      </>
                    )}

                    {/* Show Guide Response if accepted */}
                    {request.status === "accepted" && request.guideResponse && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="text-sm font-sans font-semibold text-green-900 mb-3 flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          Your Response
                        </h4>
                        <div className="space-y-2 text-sm font-sans">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-green-600" />
                            <span className="text-green-900">
                              <strong>Available:</strong> {request.guideResponse.availableTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="text-green-900">
                              <strong>Price:</strong> {request.guideResponse.price}
                            </span>
                          </div>
                          <p className="text-green-800 mt-2">{request.guideResponse.message}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
