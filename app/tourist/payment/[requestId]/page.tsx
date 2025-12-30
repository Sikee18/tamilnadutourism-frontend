"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import { RequestStore, type PlaceRequest } from "@/lib/request-store"
import { MapPin, Calendar, Clock, Users, IndianRupee, CheckCircle, Info } from "lucide-react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PaymentPage() {
  const { isAuthenticated, userRole } = useAuth()
  const router = useRouter()
  const params = useParams()
  const requestId = params.requestId as string
  const [request, setRequest] = useState<PlaceRequest | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (!isAuthenticated || userRole !== "tourist") {
      router.push("/login")
      return
    }

    const allRequests = RequestStore.getAllRequests()
    const found = allRequests.find((r) => r.id === requestId)
    setRequest(found || null)
  }, [isAuthenticated, userRole, router, requestId])

  const handlePayDeposit = () => {
    if (!request) return

    RequestStore.payDeposit(requestId)
    setShowSuccess(true)

    setTimeout(() => {
      router.push("/tourist/bookings")
    }, 3000)
  }

  const handleCancel = () => {
    router.push("/tourist/requests")
  }

  if (!request) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground font-sans">Loading...</p>
      </main>
    )
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
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-serif text-foreground mb-3">Booking Confirmed!</h2>
          <p className="text-muted-foreground font-sans leading-relaxed mb-4">
            Your deposit has been paid (mock). Your booking is now confirmed.
          </p>
          <p className="text-sm text-muted-foreground font-sans">Redirecting to My Bookings...</p>
        </motion.div>
      </main>
    )
  }

  const depositAmount = Math.round((request.finalPrice || 0) * 0.15)
  const remaining = (request.finalPrice || 0) - depositAmount

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-4">Confirm Booking</h1>
              <p className="text-muted-foreground font-sans text-lg">Review and pay the refundable intent deposit</p>
            </motion.div>

            {/* Booking Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="p-6 mb-6">
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">{request.placeName}</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="font-sans">
                      <strong>Guide:</strong> {request.guideName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="font-sans">
                      {request.confirmedDate ? new Date(request.confirmedDate).toLocaleDateString() : "TBD"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="font-sans">{request.confirmedTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="font-sans">
                      {request.groupSize} {request.groupSize === 1 ? "person" : "people"}
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-foreground">Experience Price</span>
                    <span className="font-sans font-semibold text-xl text-foreground">
                      ₹{request.finalPrice?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-green-600">
                    <span className="font-sans">Refundable Intent Deposit (15%)</span>
                    <span className="font-sans font-semibold text-lg">₹{depositAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="font-sans">Remaining Amount</span>
                    <span className="font-sans">₹{remaining.toLocaleString()}</span>
                  </div>
                </div>
              </Card>

              {/* Revenue Model Explanation */}
              <Card className="p-6 mb-6 bg-blue-50 border-blue-200">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <h3 className="font-sans font-semibold text-blue-900">How Payment Works</h3>
                    <div className="text-sm text-blue-800 font-sans space-y-2">
                      <p>
                        <strong>Refundable Intent Deposit (₹{depositAmount.toLocaleString()}):</strong>
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Confirms your booking and guide's availability</li>
                        <li>Refundable if guide is unavailable</li>
                        <li>Includes platform service fee</li>
                        <li>Demonstrates seriousness of your request</li>
                      </ul>
                      <p className="mt-3">
                        <strong>Remaining Amount (₹{remaining.toLocaleString()}):</strong>
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Paid directly to guide on the day of visit</li>
                        <li>Cash or digital payment to guide</li>
                      </ul>
                      <p className="mt-3 text-xs text-blue-700 italic">
                        Note: This is a demo build. Payment gateway integration is planned for future phase.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Actions */}
              <div className="flex gap-4">
                <Button
                  onClick={handlePayDeposit}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-sans py-6 text-lg"
                >
                  <IndianRupee className="w-5 h-5 mr-2" />
                  Pay Deposit – Mock (₹{depositAmount.toLocaleString()})
                </Button>
                <Button onClick={handleCancel} variant="outline" className="px-8 py-6 text-lg bg-transparent">
                  Cancel
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
