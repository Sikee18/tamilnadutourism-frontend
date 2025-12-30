"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gift, Copy, Check, Store, Info } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock shop data
const MOCK_SHOPS = [
  {
    id: "1",
    name: "Kumaran Silk House",
    category: "Handloom",
    description: "Known for authentic Kanchipuram silk sarees with traditional designs",
    location: "Kanchipuram, Tamil Nadu",
    promoCode: "TN-KANCHI-SILK-15",
  },
  {
    id: "2",
    name: "Madurai Flower Market",
    category: "Flowers",
    description: "Fresh jasmine, roses, and temple flowers sourced daily",
    location: "Madurai, Tamil Nadu",
    promoCode: "TN-MAD-FLOWER-10",
  },
  {
    id: "3",
    name: "Thanjavur Art Palace",
    category: "Craft",
    description: "Traditional Tanjore paintings and bronze sculptures",
    location: "Thanjavur, Tamil Nadu",
    promoCode: "TN-THAN-ART-20",
  },
  {
    id: "4",
    name: "Chettinad Spice Bazaar",
    category: "Food",
    description: "Authentic Chettinad spices, masalas, and traditional recipes",
    location: "Karaikudi, Tamil Nadu",
    promoCode: "TN-CHETTI-SPICE-12",
  },
  {
    id: "5",
    name: "Coimbatore Cotton Weaves",
    category: "Handloom",
    description: "Handwoven cotton fabrics and traditional clothing",
    location: "Coimbatore, Tamil Nadu",
    promoCode: "TN-COIM-COTTON-10",
  },
  {
    id: "6",
    name: "Temple Town Crafts",
    category: "Craft",
    description: "Wooden carvings, stone sculptures, and traditional crafts",
    location: "Mahabalipuram, Tamil Nadu",
    promoCode: "TN-MAHA-CRAFT-15",
  },
]

export function ShopsAndMarkets() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [formData, setFormData] = useState({
    shopName: "",
    category: "",
    location: "",
    offerType: "",
    contact: "",
  })

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault()
    setShowRegistrationModal(false)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 5000)
    // Reset form
    setFormData({
      shopName: "",
      category: "",
      location: "",
      offerType: "",
      contact: "",
    })
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4">Support Local</p>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6">Shops & Markets</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover authentic local shops offering exclusive promotions for TN Heritage Explorer travelers.
          </p>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
            Thank you! Our team will review your request and get back to you soon.
          </div>
        )}

        {/* Shop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {MOCK_SHOPS.map((shop) => (
            <Card key={shop.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{shop.name}</h3>
                  <Badge variant="secondary" className="mb-2">
                    {shop.category}
                  </Badge>
                </div>
                <Gift className="w-6 h-6 text-primary" />
              </div>

              <p className="text-muted-foreground text-sm mb-3">{shop.description}</p>
              <p className="text-xs text-muted-foreground mb-4">{shop.location}</p>

              {/* Promo Code Section */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-xs text-primary font-medium mb-2">Offer for TN Heritage Explorer users</p>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-sm font-mono text-foreground bg-background px-3 py-1 rounded">
                    {shop.promoCode}
                  </code>
                  <Button size="sm" variant="ghost" onClick={() => handleCopyCode(shop.promoCode)} className="shrink-0">
                    {copiedCode === shop.promoCode ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Redeem this offer offline at the shop.</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Revenue Model Information */}
        <div className="max-w-3xl mx-auto mb-12">
          <Accordion type="single" collapsible className="bg-card rounded-lg">
            <AccordionItem value="revenue-model" className="border-none">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5 text-primary" />
                  <span className="text-lg font-medium">How Shop Promotions Work</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>Shops pay a fixed fee for promotional visibility on TN Heritage Explorer.</p>
                  <p>
                    Promo codes help shops identify visitors from our platform. Fees are for LISTING, not per
                    redemption.
                  </p>
                  <p className="text-sm">
                    Redemption happens offline at the shop. No tracking or online payments involved.
                  </p>

                  <div className="mt-6 space-y-3 bg-muted/30 p-4 rounded-lg">
                    <p className="font-medium text-foreground mb-3">Listing Pricing (Display Only)</p>
                    <div className="flex justify-between text-sm">
                      <span>Regular Listing</span>
                      <span className="font-semibold">₹300 / month</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Featured Shop</span>
                      <span className="font-semibold">₹500 / month</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Festival Special</span>
                      <span className="font-semibold">₹200 / week</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                      * Pricing shown for informational purposes only
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Shop Owner CTA */}
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 p-8 md:p-12 text-center">
          <Store className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-foreground mb-3">Are you a local shop owner?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            List your shop on TN Heritage Explorer and reach travelers looking for authentic local experiences.
          </p>
          <Button onClick={() => setShowRegistrationModal(true)} size="lg" className="bg-primary hover:bg-primary/90">
            Request to List Your Shop
          </Button>
        </Card>
      </div>

      {/* Registration Modal */}
      <Dialog open={showRegistrationModal} onOpenChange={setShowRegistrationModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Request Shop Listing</DialogTitle>
            <DialogDescription>Fill in your shop details and our team will review your request.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitRegistration} className="space-y-4">
            <div>
              <Label htmlFor="shopName">Shop Name *</Label>
              <Input
                id="shopName"
                required
                value={formData.shopName}
                onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                placeholder="Enter your shop name"
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                required
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="handloom">Handloom</SelectItem>
                  <SelectItem value="food">Food & Spices</SelectItem>
                  <SelectItem value="craft">Crafts & Art</SelectItem>
                  <SelectItem value="flowers">Flowers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City, Tamil Nadu"
              />
            </div>

            <div>
              <Label htmlFor="offerType">Offer Type *</Label>
              <Textarea
                id="offerType"
                required
                value={formData.offerType}
                onChange={(e) => setFormData({ ...formData, offerType: e.target.value })}
                placeholder="e.g., 10% off on all handloom products"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="contact">Contact Email / Phone *</Label>
              <Input
                id="contact"
                required
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="your@email.com or phone number"
              />
            </div>

            <Button type="submit" className="w-full">
              Submit Request
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
