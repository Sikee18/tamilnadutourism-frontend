"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Search, MapPin, Users, Clock, Star, IndianRupee } from "lucide-react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    id: 1,
    hostName: "Ravi Kumar",
    hostType: "Auto Driver",
    location: "Chennai",
    title: "Local Street Food Tour",
    description: "Explore the hidden street food gems of Chennai with a local auto driver who knows every corner",
    duration: "3 hours",
    groupSize: "1-4 people",
    price: 1200,
    rating: 4.8,
    reviews: 24,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80",
  },
  {
    id: 2,
    hostName: "Priya Lakshmi",
    hostType: "Student",
    location: "Madurai",
    title: "Temple Architecture Walk",
    description: "A university student studying archaeology shares stories of Madurai's ancient temples",
    duration: "2.5 hours",
    groupSize: "2-6 people",
    price: 950,
    rating: 4.9,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80",
  },
  {
    id: 3,
    hostName: "Murugan S",
    hostType: "Resident",
    location: "Ooty",
    title: "Tea Estate Morning Tour",
    description: "Join a local resident for an early morning walk through tea estates with breakfast included",
    duration: "4 hours",
    groupSize: "2-8 people",
    price: 1800,
    rating: 5.0,
    reviews: 31,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
  },
  {
    id: 4,
    hostName: "Anitha Rajan",
    hostType: "Resident",
    location: "Pondicherry",
    title: "Cooking Class & Market Visit",
    description: "Learn to cook authentic Tamil dishes after shopping at local markets",
    duration: "5 hours",
    groupSize: "1-5 people",
    price: 2500,
    rating: 4.7,
    reviews: 22,
    image: "https://images.unsplash.com/photo-1596040033229-a0b73b7c3b03?w=400&q=80",
  },
  {
    id: 5,
    hostName: "Senthil Kumar",
    hostType: "Auto Driver",
    location: "Trichy",
    title: "Rock Fort Sunrise Experience",
    description: "Early morning climb to Rock Fort temple with stories of local history",
    duration: "2 hours",
    groupSize: "1-3 people",
    price: 800,
    rating: 4.6,
    reviews: 15,
    image: "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=400&q=80",
  },
  {
    id: 6,
    hostName: "Divya Bharathi",
    hostType: "Student",
    location: "Coimbatore",
    title: "Campus Heritage Walk",
    description: "Explore historic college campuses and learn about educational heritage",
    duration: "3 hours",
    groupSize: "3-10 people",
    price: 1100,
    rating: 4.5,
    reviews: 12,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80",
  },
]

export default function LocalBoardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedExperience, setSelectedExperience] = useState<(typeof experiences)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const filteredExperiences = experiences.filter(
    (exp) =>
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.hostType.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleRequestJoin = (experience: (typeof experiences)[0]) => {
    setSelectedExperience(experience)
    setIsDialogOpen(true)
    setShowSuccess(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
    setTimeout(() => {
      setIsDialogOpen(false)
      setFormData({ name: "", email: "", message: "" })
      setShowSuccess(false)
    }, 2000)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-primary text-sm font-sans tracking-[0.3em] uppercase mb-4">Local Experiences</p>
            <h1 className="text-4xl md:text-6xl font-serif font-light text-foreground mb-6">What Locals Are Hosting</h1>
            <p className="text-muted-foreground font-sans text-lg leading-relaxed mb-8">
              Connect with real locals offering authentic experiences. From auto drivers to students, discover Tamil
              Nadu through the eyes of those who call it home.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by location, host type, or experience..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-base rounded-xl shadow-sm"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-card rounded-xl overflow-hidden shadow-md border border-border group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <motion.img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                  <Badge className="absolute top-3 left-3 bg-temple-gold text-black font-sans">
                    {experience.hostType}
                  </Badge>
                  <Badge className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm text-foreground font-sans flex items-center gap-1">
                    <IndianRupee className="w-3 h-3" />
                    {experience.price}
                  </Badge>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-serif font-semibold text-foreground">{experience.hostName}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="w-3 h-3" />
                        <span className="font-sans">{experience.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-temple-gold text-temple-gold" />
                      <span className="text-sm font-sans font-semibold">{experience.rating}</span>
                      <span className="text-xs text-muted-foreground">({experience.reviews})</span>
                    </div>
                  </div>

                  <h4 className="text-xl font-serif text-foreground mb-2">{experience.title}</h4>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-4">
                    {experience.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span className="font-sans">{experience.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span className="font-sans">{experience.groupSize}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 p-3 bg-muted rounded-sm">
                    <span className="text-sm font-sans text-muted-foreground">Price per person</span>
                    <div className="flex items-center gap-1 text-lg font-semibold text-foreground">
                      <IndianRupee className="w-4 h-4" />
                      {experience.price}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleRequestJoin(experience)}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-sans transition-all duration-300 active:scale-95"
                  >
                    Request to Join
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {!showSuccess ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">Request to Join</DialogTitle>
                <DialogDescription className="font-sans">
                  Send a request to join {selectedExperience?.title} with {selectedExperience?.hostName}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-sans font-medium mb-2 block">Your Name</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-sans font-medium mb-2 block">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-sans font-medium mb-2 block">Message to Host</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell the host about yourself and when you'd like to join..."
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" className="w-full font-sans">
                  Send Request
                </Button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center"
            >
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Request Sent!</h3>
              <p className="text-sm text-muted-foreground font-sans">
                {selectedExperience?.hostName} will get back to you soon.
              </p>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  )
}
