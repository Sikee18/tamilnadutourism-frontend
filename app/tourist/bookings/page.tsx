"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import { RequestStore, type PlaceRequest } from "@/lib/request-store"
import { MapPin, Calendar, Clock, Users, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function TouristBookingsPage() {
  const { isAuthenticated, userRole } = useAuth()
  const router = useRouter()
  const [bookings, setBookings] = useState<PlaceRequest[]>([])

  useEffect(() => {
    if (!isAuthenticated || userRole !== "tourist") {
      router.push("/login")
      return
    }

    // Load tourist's confirmed bookings (deposit-paid)
    const touristRequests = RequestStore.getTouristRequests("tourist_1")
    const confirmedBookings = touristRequests.filter((req) => req.status === "deposit-paid")
    setBookings(confirmedBookings)
  }, [isAuthenticated, userRole, router])

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
            <h1 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-4">My Bookings</h1>
            <p className="text-muted-foreground font-sans text-lg">Your confirmed place visits with guides</p>
          </motion.div>

          {bookings.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground font-sans mb-4">You don't have any confirmed bookings yet.</p>
              <Button onClick={() => router.push("/request-guide")}>Make a Request</Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-serif font-semibold text-foreground">{booking.placeName}</h3>
                      <div className="flex items-center gap-1 px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-xs font-sans font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Confirmed
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="font-sans">
                          <strong>Guide:</strong> {booking.guideName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="font-sans">
                          {booking.confirmedDate ? new Date(booking.confirmedDate).toLocaleDateString() : "TBD"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="font-sans">{booking.confirmedTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="font-sans">
                          {booking.groupSize} {booking.groupSize === 1 ? "person" : "people"}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-sans text-muted-foreground">Final Price</span>
                        <span className="font-sans font-semibold text-foreground">
                          ₹{booking.finalPrice?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-sans text-muted-foreground">Deposit Paid</span>
                        <span className="font-sans font-semibold text-green-600">
                          ₹{booking.depositAmount?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-sans text-muted-foreground">Remaining (Pay on visit)</span>
                        <span className="font-sans font-semibold text-foreground">
                          ₹{((booking.finalPrice || 0) - (booking.depositAmount || 0)).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs font-sans text-blue-800">
                        <CheckCircle className="w-3 h-3 inline mr-1" />
                        Deposit Status: <strong>Paid (Mock)</strong>
                      </p>
                    </div>
                  </Card>
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
