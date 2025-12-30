"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Plus, MapPin, Users, DollarSign, Clock, Edit, Send, X, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RequestStore, type PlaceRequest } from "@/lib/request-store"

export default function GuideDashboardPage() {
  const [showForm, setShowForm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [customerRequests, setCustomerRequests] = useState<PlaceRequest[]>([])
  const [selectedRequest, setSelectedRequest] = useState<PlaceRequest | null>(null)
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [quoteData, setQuoteData] = useState({
    price: "",
    confirmedDate: "",
    confirmedTime: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
    setTimeout(() => {
      setShowForm(false)
      setShowSuccess(false)
      setFormData({
        title: "",
        description: "",
        location: "",
        duration: "",
        groupSize: "",
        price: "",
      })
    }, 2000)
  }

  const myExperiences = [
    {
      id: 1,
      title: "Temple Architecture Walk",
      description:
        "Explore the intricate Dravidian architecture of Meenakshi Temple with detailed explanations of gopurams, mandapams, and historical significance.",
      location: "Madurai",
      duration: "4 hours",
      price: "₹2,500",
      bookings: 5,
      status: "Active",
    },
    {
      id: 2,
      title: "Street Food Adventure",
      description:
        "Discover authentic Chennai street food from traditional breakfast spots to evening snacks, including filter coffee, idli, dosa, and local sweets.",
      location: "Chennai",
      duration: "3 hours",
      price: "₹1,800",
      bookings: 12,
      status: "Active",
    },
  ]

  const handleOpenQuoteModal = (request: PlaceRequest) => {
    setSelectedRequest(request)
    setQuoteData({
      price: "",
      confirmedDate: request.preferredDate,
      confirmedTime: request.preferredTime,
      message: "",
    })
    setShowQuoteModal(true)
  }

  const handleSendQuote = () => {
    if (!selectedRequest || !quoteData.price) return

    RequestStore.sendQuote(
      selectedRequest.id,
      "guide_1",
      "Guide User",
      Number.parseInt(quoteData.price),
      quoteData.confirmedDate,
      quoteData.confirmedTime,
      quoteData.message,
    )

    setShowQuoteModal(false)
    setSelectedRequest(null)

    const updated = RequestStore.getPendingRequests()
    setCustomerRequests(updated)
  }

  const handleDeclineRequest = (requestId: string) => {
    if (confirm("Are you sure you want to decline this request?")) {
      RequestStore.declineRequest(requestId, "guide_1", "Guide User")
      const updated = RequestStore.getPendingRequests()
      setCustomerRequests(updated)
    }
  }

  const handleAcceptCounter = (requestId: string) => {
    RequestStore.acceptCounterOffer(requestId)
    const updated = RequestStore.getPendingRequests()
    setCustomerRequests(updated)
    alert("Counter offer accepted! Tourist will proceed to payment.")
  }

  const handleRejectCounter = (requestId: string) => {
    RequestStore.rejectCounterOffer(requestId)
    const updated = RequestStore.getPendingRequests()
    setCustomerRequests(updated)
    alert("Counter offer rejected. Original price maintained. Tourist will proceed to payment.")
  }

  useEffect(() => {
    const requests = RequestStore.getPendingRequests()
    setCustomerRequests(requests)
  }, [])

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    duration: "",
    groupSize: "",
    price: "",
  })

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-4">Guide Dashboard</h1>
            <p className="text-muted-foreground font-sans text-lg">
              Manage your experiences and connect with travelers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-sans">Total Bookings</p>
                    <p className="text-3xl font-serif font-semibold">17</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-temple-gold/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-temple-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-sans">This Month</p>
                    <p className="text-3xl font-serif font-semibold">₹8,500</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-sans">Active Experiences</p>
                    <p className="text-3xl font-serif font-semibold">2</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-2xl font-serif font-semibold">Customer Board</h2>
            </div>

            {customerRequests.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground font-sans">No pending customer requests at the moment.</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {customerRequests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                  >
                    <Card className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-serif font-semibold text-foreground mb-2">{request.placeName}</h3>
                          <p className="text-sm font-sans text-muted-foreground">Request from: {request.touristName}</p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-sans font-medium ${
                            request.status === "pending"
                              ? "bg-yellow-500/10 text-yellow-600"
                              : "bg-purple-500/10 text-purple-600"
                          }`}
                        >
                          {request.status === "pending" ? "Pending" : "Counter Requested"}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="font-sans text-foreground">
                            {new Date(request.preferredDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="font-sans text-foreground">{request.preferredTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="font-sans text-foreground">
                            {request.groupSize} {request.groupSize === 1 ? "person" : "people"}
                          </span>
                        </div>
                      </div>

                      {request.touristMessage && (
                        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm font-sans text-foreground italic">"{request.touristMessage}"</p>
                        </div>
                      )}

                      {request.status === "counter-requested" && (
                        <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                          <h4 className="text-sm font-sans font-semibold text-purple-900 mb-2">Counter Offer</h4>
                          <p className="text-sm font-sans text-purple-800 mb-1">
                            <strong>Original Quoted Price:</strong> ₹{request.quotedPrice?.toLocaleString()}
                          </p>
                          <p className="text-sm font-sans text-purple-800 mb-1">
                            <strong>Requested Price:</strong> ₹{request.counterPrice?.toLocaleString()}
                          </p>
                          {request.counterMessage && (
                            <p className="text-sm font-sans text-purple-800 mt-2">
                              <strong>Customer Message:</strong> {request.counterMessage}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="flex gap-3 flex-wrap">
                        {request.status === "pending" && (
                          <>
                            <Button
                              onClick={() => handleOpenQuoteModal(request)}
                              className="bg-primary text-primary-foreground"
                            >
                              <Send className="w-4 h-4 mr-2" />
                              Send Quote
                            </Button>
                            <Button
                              onClick={() => handleDeclineRequest(request.id)}
                              variant="outline"
                              className="border-red-500 text-red-600 hover:bg-red-50"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Decline
                            </Button>
                          </>
                        )}
                        {request.status === "counter-requested" && (
                          <>
                            <Button
                              onClick={() => handleAcceptCounter(request.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Accept New Price
                            </Button>
                            <Button
                              onClick={() => handleRejectCounter(request.id)}
                              variant="outline"
                              className="border-orange-500 text-orange-600 hover:bg-orange-50"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject & Keep Original
                            </Button>
                          </>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Post Experience Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12"
          >
            {!showForm ? (
              <Button
                onClick={() => setShowForm(true)}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-sans"
              >
                <Plus className="w-5 h-5 mr-2" />
                Post New Experience
              </Button>
            ) : (
              <Card className="p-8">
                {!showSuccess ? (
                  <>
                    <h2 className="text-2xl font-serif font-semibold mb-6">Create New Experience</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="text-sm font-sans font-medium mb-2 block">Experience Title</label>
                        <Input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="e.g., Hidden Street Food Tour"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-sans font-medium mb-2 block">Description</label>
                        <Textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Describe what makes your experience special..."
                          rows={4}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-sans font-medium mb-2 block">Location</label>
                          <Select
                            value={formData.location}
                            onValueChange={(value) => setFormData({ ...formData, location: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="chennai">Chennai</SelectItem>
                              <SelectItem value="madurai">Madurai</SelectItem>
                              <SelectItem value="coimbatore">Coimbatore</SelectItem>
                              <SelectItem value="trichy">Trichy</SelectItem>
                              <SelectItem value="ooty">Ooty</SelectItem>
                              <SelectItem value="pondicherry">Pondicherry</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-sm font-sans font-medium mb-2 block">Duration</label>
                          <Input
                            type="text"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            placeholder="e.g., 3 hours"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-sans font-medium mb-2 block">Group Size</label>
                          <Input
                            type="text"
                            value={formData.groupSize}
                            onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                            placeholder="e.g., 1-4 people"
                            required
                          />
                        </div>

                        <div>
                          <label className="text-sm font-sans font-medium mb-2 block">Price per Person (₹)</label>
                          <Input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            placeholder="e.g., 500"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button type="submit" className="bg-primary text-primary-foreground font-sans">
                          Publish Experience
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowForm(false)}
                          className="font-sans"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-serif font-semibold mb-2">Experience Published!</h3>
                    <p className="text-muted-foreground font-sans">
                      Your experience is now live and visible to travelers.
                    </p>
                  </motion.div>
                )}
              </Card>
            )}
          </motion.div>

          {/* My Experiences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-serif font-semibold mb-6">My Experiences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myExperiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <Card className="p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-serif font-semibold text-foreground mb-2">{exp.title}</h3>
                        <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-3">
                          {exp.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="font-sans text-foreground">{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="font-sans text-foreground">{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="font-sans font-semibold text-foreground">{exp.price} per person</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="font-sans text-foreground">{exp.bookings} bookings</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                      <span className="px-3 py-1 bg-green-500/10 text-green-600 text-xs font-sans font-medium rounded-full">
                        {exp.status}
                      </span>
                      <Button variant="outline" size="sm" className="font-sans bg-transparent">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {showQuoteModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-serif font-semibold">Send Quote</h3>
              <button onClick={() => setShowQuoteModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-sm text-muted-foreground font-sans mb-2">
                <strong>Place:</strong> {selectedRequest.placeName}
              </p>
              <p className="text-sm text-muted-foreground font-sans mb-2">
                <strong>Tourist:</strong> {selectedRequest.touristName}
              </p>
              <p className="text-sm text-muted-foreground font-sans">
                <strong>Group Size:</strong> {selectedRequest.groupSize}{" "}
                {selectedRequest.groupSize === 1 ? "person" : "people"}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-sans font-medium mb-2 block">Quoted Price (₹)</label>
                <Input
                  type="number"
                  value={quoteData.price}
                  onChange={(e) => setQuoteData({ ...quoteData, price: e.target.value })}
                  placeholder="Enter your price"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-sans font-medium mb-2 block">Confirmed Date</label>
                <Input
                  type="date"
                  value={quoteData.confirmedDate}
                  onChange={(e) => setQuoteData({ ...quoteData, confirmedDate: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-sans font-medium mb-2 block">Confirmed Time</label>
                <select
                  value={quoteData.confirmedTime}
                  onChange={(e) => setQuoteData({ ...quoteData, confirmedTime: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground font-sans focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                >
                  <option value="">Select time</option>
                  <option value="Morning (6 AM - 10 AM)">Morning (6 AM - 10 AM)</option>
                  <option value="Late Morning (10 AM - 12 PM)">Late Morning (10 AM - 12 PM)</option>
                  <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                  <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-sans font-medium mb-2 block">Message (Optional)</label>
                <Textarea
                  value={quoteData.message}
                  onChange={(e) => setQuoteData({ ...quoteData, message: e.target.value })}
                  placeholder="Any message for the tourist..."
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSendQuote} className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Send Quote
                </Button>
                <Button onClick={() => setShowQuoteModal(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </main>
  )
}
