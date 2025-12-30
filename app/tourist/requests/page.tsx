"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import { RequestStore, type PlaceRequest } from "@/lib/request-store"
import { Calendar, Clock, Users, MessageSquare, X, Send } from "lucide-react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function TouristRequestsPage() {
  const { isAuthenticated, userRole } = useAuth()
  const router = useRouter()
  const [requests, setRequests] = useState<PlaceRequest[]>([])
  const [selectedRequest, setSelectedRequest] = useState<PlaceRequest | null>(null)
  const [showCounterModal, setShowCounterModal] = useState(false)
  const [counterPrice, setCounterPrice] = useState("")
  const [counterMessage, setCounterMessage] = useState("")

  useEffect(() => {
    if (!isAuthenticated || userRole !== "tourist") {
      router.push("/login")
      return
    }

    // Load tourist's requests
    const touristRequests = RequestStore.getTouristRequests("tourist_1")
    setRequests(touristRequests)
  }, [isAuthenticated, userRole, router])

  const handleAcceptQuote = (requestId: string) => {
    RequestStore.acceptQuote(requestId)
    router.push(`/tourist/payment/${requestId}`)
  }

  const handleDeclineQuote = (requestId: string) => {
    if (confirm("Are you sure you want to decline this quote?")) {
      RequestStore.declineQuote(requestId)
      const updated = RequestStore.getTouristRequests("tourist_1")
      setRequests(updated)
    }
  }

  const handleOpenCounterModal = (request: PlaceRequest) => {
    if (request.counterUsed) {
      alert("You have already used your one-time price negotiation for this request.")
      return
    }
    setSelectedRequest(request)
    setShowCounterModal(true)
    setCounterPrice("")
    setCounterMessage("")
  }

  const handleSubmitCounter = () => {
    if (!selectedRequest || !counterPrice) return

    const price = Number.parseInt(counterPrice)
    if (isNaN(price) || price <= 0) {
      alert("Please enter a valid price")
      return
    }

    RequestStore.sendCounterOffer(selectedRequest.id, price, counterMessage)
    setShowCounterModal(false)
    setSelectedRequest(null)

    const updated = RequestStore.getTouristRequests("tourist_1")
    setRequests(updated)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "quoted":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "counter-requested":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20"
      case "accepted":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "declined":
        return "bg-red-500/10 text-red-600 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending"
      case "quoted":
        return "Quoted"
      case "counter-requested":
        return "Counter Requested"
      case "accepted":
        return "Accepted"
      case "declined":
        return "Declined"
      default:
        return status
    }
  }

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
            <h1 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-4">My Requests</h1>
            <p className="text-muted-foreground font-sans text-lg">
              Track your place visit requests and guide responses
            </p>
          </motion.div>

          {requests.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground font-sans mb-4">You haven't made any requests yet.</p>
              <Button onClick={() => router.push("/request-guide")}>Make Your First Request</Button>
            </Card>
          ) : (
            <div className="space-y-6">
              {requests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-serif font-semibold text-foreground mb-2">{request.placeName}</h3>
                        <div
                          className={`inline-block px-3 py-1 rounded-full text-xs font-sans font-medium border ${getStatusColor(request.status)}`}
                        >
                          {getStatusLabel(request.status)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="font-sans">{new Date(request.preferredDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="font-sans">{request.preferredTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="font-sans">
                          {request.groupSize} {request.groupSize === 1 ? "person" : "people"}
                        </span>
                      </div>
                      {request.touristMessage && (
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <MessageSquare className="w-4 h-4 text-muted-foreground" />
                          <span className="font-sans italic">"{request.touristMessage}"</span>
                        </div>
                      )}
                    </div>

                    {/* Guide Response */}
                    {request.status === "quoted" && request.guideName && (
                      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="text-sm font-sans font-semibold text-blue-900 mb-3">Guide Quote Received</h4>
                        <div className="space-y-2 mb-4">
                          <p className="text-sm font-sans text-blue-800">
                            <strong>Guide:</strong> {request.guideName}
                          </p>
                          <p className="text-sm font-sans text-blue-800">
                            <strong>Quoted Price:</strong> ₹{request.quotedPrice?.toLocaleString()}
                          </p>
                          <p className="text-sm font-sans text-blue-800">
                            <strong>Confirmed Date:</strong>{" "}
                            {request.confirmedDate ? new Date(request.confirmedDate).toLocaleDateString() : "N/A"}
                          </p>
                          <p className="text-sm font-sans text-blue-800">
                            <strong>Confirmed Time:</strong> {request.confirmedTime || "N/A"}
                          </p>
                          {request.guideMessage && (
                            <p className="text-sm font-sans text-blue-800">
                              <strong>Message:</strong> {request.guideMessage}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-3 flex-wrap">
                          <Button
                            onClick={() => handleAcceptQuote(request.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Accept & Pay Deposit
                          </Button>
                          <Button
                            onClick={() => handleOpenCounterModal(request)}
                            variant="outline"
                            disabled={request.counterUsed}
                            className="border-purple-500 text-purple-600 hover:bg-purple-50"
                          >
                            {request.counterUsed ? "Counter Already Used" : "Request Price Adjustment"}
                          </Button>
                          <Button
                            onClick={() => handleDeclineQuote(request.id)}
                            variant="outline"
                            className="border-red-500 text-red-600 hover:bg-red-50"
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Counter Requested Status */}
                    {request.status === "counter-requested" && (
                      <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h4 className="text-sm font-sans font-semibold text-purple-900 mb-3">Counter Offer Sent</h4>
                        <p className="text-sm font-sans text-purple-800 mb-2">
                          <strong>Requested Price:</strong> ₹{request.counterPrice?.toLocaleString()}
                        </p>
                        {request.counterMessage && (
                          <p className="text-sm font-sans text-purple-800 mb-2">
                            <strong>Your Message:</strong> {request.counterMessage}
                          </p>
                        )}
                        <p className="text-sm font-sans text-purple-700">Waiting for guide's response...</p>
                      </div>
                    )}

                    {/* Accepted Status */}
                    {request.status === "accepted" && (
                      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="text-sm font-sans font-semibold text-green-900 mb-3">Request Accepted!</h4>
                        <p className="text-sm font-sans text-green-800 mb-2">
                          <strong>Final Price:</strong> ₹{request.finalPrice?.toLocaleString()}
                        </p>
                        <p className="text-sm font-sans text-green-800 mb-4">
                          <strong>Guide:</strong> {request.guideName}
                        </p>
                        <Button
                          onClick={() => router.push(`/tourist/payment/${request.id}`)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Proceed to Payment
                        </Button>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Counter Offer Modal */}
      {showCounterModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background rounded-lg p-8 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-serif font-semibold">Request Price Adjustment</h3>
              <button
                onClick={() => setShowCounterModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-sm text-muted-foreground font-sans mb-4">
                <strong>Original Quote:</strong> ₹{selectedRequest.quotedPrice?.toLocaleString()}
              </p>
              <p className="text-sm text-amber-600 font-sans mb-4">Note: You can only negotiate once per request.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-sans font-medium mb-2 block">Your Preferred Price (₹)</label>
                <Input
                  type="number"
                  value={counterPrice}
                  onChange={(e) => setCounterPrice(e.target.value)}
                  placeholder="Enter your price"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-sans font-medium mb-2 block">Message (Optional)</label>
                <Textarea
                  value={counterMessage}
                  onChange={(e) => setCounterMessage(e.target.value)}
                  placeholder="Explain why you're requesting this price (e.g., students, local resident)"
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSubmitCounter} className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Send Counter Offer
                </Button>
                <Button onClick={() => setShowCounterModal(false)} variant="outline">
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
