"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Sparkles, Clock, DollarSign, Users, Heart, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const benefits = [
  {
    icon: DollarSign,
    title: "Earn Extra Income",
    description: "Turn your local knowledge into a flexible side hustle. Set your own schedule and rates.",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Host experiences when it suits you. No commitments, no obligations.",
  },
  {
    icon: Users,
    title: "Meet People",
    description: "Connect with travelers from around the world and share your passion for Tamil Nadu.",
  },
  {
    icon: Heart,
    title: "Share Your Culture",
    description: "Be an ambassador for your city and help others discover its hidden gems.",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Network",
    description: "Build connections and develop skills that can open new opportunities.",
  },
  {
    icon: Sparkles,
    title: "Make an Impact",
    description: "Create memorable experiences and contribute to sustainable tourism.",
  },
]

const hostTypes = [
  {
    type: "Auto Driver",
    description: "Share your routes and favorite local spots",
    example: "Street food tours, city navigation tips",
  },
  {
    type: "Student",
    description: "Connect through your studies and campus life",
    example: "Heritage walks, college tours, study cafes",
  },
  {
    type: "Resident",
    description: "Open your neighborhood to curious travelers",
    example: "Cooking classes, market visits, home stays",
  },
  {
    type: "Professional",
    description: "Share your expertise and industry insights",
    example: "Industry tours, skill workshops, mentoring",
  },
]

export default function BecomeHostPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-temple-gold/10 border border-temple-gold/20 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-temple-gold" />
              <span className="text-sm font-sans font-medium text-temple-gold">Earn While You Share</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-serif font-light text-foreground mb-6">Become a Local Host</h1>
            <p className="text-xl text-muted-foreground font-sans leading-relaxed mb-4">
              Turn your local expertise into a rewarding side hustle
            </p>
            <p className="text-base text-muted-foreground font-sans leading-relaxed mb-8">
              Whether you're an auto driver, student, or resident — if you love Tamil Nadu and enjoy meeting people, you
              can become a host. This isn't a job, it's an opportunity to earn extra income doing what you already love.
            </p>

            <Link href="/login/guide">
              <Button
                size="lg"
                className="bg-temple-gold text-black hover:bg-temple-gold/90 font-sans text-base px-8 py-6 rounded-lg shadow-lg active:scale-95 transition-all duration-300"
              >
                Start Hosting
              </Button>
            </Link>

            <p className="text-sm text-muted-foreground font-sans mt-4">
              Free to join • No experience required • Start in minutes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary text-sm font-sans tracking-[0.3em] uppercase mb-4">Why Host</p>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-4">The Benefits of Hosting</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-6 bg-background rounded-xl border border-border"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground font-sans leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Host */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary text-sm font-sans tracking-[0.3em] uppercase mb-4">Anyone Can Host</p>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-4">No Matter Who You Are</h2>
            <p className="text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed">
              From auto drivers to students to everyday residents — everyone has something unique to share
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {hostTypes.map((host, index) => (
              <motion.div
                key={host.type}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="p-8 bg-card rounded-xl border border-border"
              >
                <h3 className="text-2xl font-serif font-semibold text-foreground mb-2">{host.type}</h3>
                <p className="text-muted-foreground font-sans mb-3">{host.description}</p>
                <p className="text-sm text-primary font-sans italic">Example: {host.example}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary text-sm font-sans tracking-[0.3em] uppercase mb-4">Simple Process</p>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-4">How It Works</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-8">
            {[
              {
                step: "1",
                title: "Sign Up as a Guide",
                description: "Create your profile in minutes. Tell us about yourself and what makes your area special.",
              },
              {
                step: "2",
                title: "Post Your Experience",
                description: "List what you want to share — a tour, a class, a meal, or just your local knowledge.",
              },
              {
                step: "3",
                title: "Connect with Travelers",
                description: "Receive booking requests and connect with tourists who want authentic experiences.",
              },
              {
                step: "4",
                title: "Host & Earn",
                description: "Meet up, share your passion, and earn money doing something you love.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="w-12 h-12 bg-temple-gold text-black rounded-full flex items-center justify-center font-serif font-bold text-xl shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-serif font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground font-sans leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-serif font-light mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl font-sans leading-relaxed mb-8 opacity-90">
              Join hundreds of locals who are already earning extra income by sharing their passion for Tamil Nadu
            </p>
            <Link href="/login/guide">
              <Button
                size="lg"
                className="bg-temple-gold text-black hover:bg-temple-gold/90 font-sans text-base px-8 py-6 rounded-lg shadow-lg active:scale-95 transition-all duration-300"
              >
                Start Hosting Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
