"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, Mail, Lock, User, MapPin, Languages, Calendar, Star, BadgeCheck } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function GuideLoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    region: "",
    languages: "",
  })
  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login("guide")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <main className="min-h-screen flex">
      {/* Left - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-secondary-foreground font-bold">TN</span>
            </div>
            <div>
              <h1 className="text-lg font-serif text-foreground">Tamil Nadu</h1>
              <p className="text-xs font-sans tracking-widest uppercase text-muted-foreground">Guide Portal</p>
            </div>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-light text-foreground mb-2">
              {isLogin ? "Welcome Back, Guide" : "Join Our Guide Network"}
            </h2>
            <p className="text-muted-foreground font-sans">
              {isLogin
                ? "Sign in to manage your tours and connect with travelers"
                : "Register to share your expertise with visitors"}
            </p>
          </div>

          {/* Toggle */}
          <div className="flex rounded-sm bg-muted p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-sm font-sans font-medium rounded-sm transition-all ${isLogin ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-sm font-sans font-medium rounded-sm transition-all ${!isLogin ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-sans font-medium text-foreground mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-sm text-foreground font-sans placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-sans font-medium text-foreground mb-2">Primary Region</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <select
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-sm text-foreground font-sans focus:outline-none focus:ring-2 focus:ring-secondary/20 appearance-none"
                    >
                      <option value="">Select your region</option>
                      <option value="chennai">Chennai</option>
                      <option value="madurai">Madurai</option>
                      <option value="thanjavur">Thanjavur</option>
                      <option value="coimbatore">Coimbatore</option>
                      <option value="nilgiris">Nilgiris (Ooty)</option>
                      <option value="rameswaram">Rameswaram</option>
                      <option value="kanyakumari">Kanyakumari</option>
                      <option value="chettinad">Chettinad</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-sans font-medium text-foreground mb-2">Languages Spoken</label>
                  <div className="relative">
                    <Languages className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      name="languages"
                      value={formData.languages}
                      onChange={handleChange}
                      placeholder="Tamil, English, Hindi..."
                      className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-sm text-foreground font-sans placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-sans font-medium text-foreground mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-sm text-foreground font-sans placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-sans font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-12 py-3 bg-muted border border-border rounded-sm text-foreground font-sans placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-sm font-sans text-muted-foreground">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm font-sans text-secondary hover:underline">
                  Forgot password?
                </Link>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-secondary text-secondary-foreground font-sans font-medium rounded-sm hover:bg-secondary/90 transition-colors"
            >
              {isLogin ? "Sign In" : "Submit Application"}
            </button>
          </form>

          {!isLogin && (
            <p className="mt-6 text-sm font-sans text-muted-foreground text-center">
              By registering, you agree to our verification process. A team member will review your application within
              48 hours.
            </p>
          )}

          {/* Tourist Login Link */}
          <p className="text-center mt-8 text-sm font-sans text-muted-foreground">
            Looking to explore Tamil Nadu?{" "}
            <Link href="/login/tourist" className="text-secondary hover:underline">
              Tourist login
            </Link>
          </p>
        </div>
      </div>

      {/* Right - Image with Info */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col">
        <img
          src="https://images.unsplash.com/photo-1577213456120-6c2995f874fd?fm=jpg&q=80&w=1920&auto=format&fit=crop"
          alt="Become a Guide"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/50 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
          <div />

          <div className="text-right">
            <h2 className="text-3xl font-serif font-light mb-6">For Guides</h2>
            <p className="text-white/80 font-sans leading-relaxed mb-8 max-w-md ml-auto">
              Join our certified guide network and help travelers discover the true essence of Tamil Nadu while building
              your tourism career.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 flex-row-reverse text-right">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans font-medium mb-1">Manage Your Schedule</h3>
                  <p className="text-white/60 text-sm font-sans">Accept or decline tour requests on your terms</p>
                </div>
              </div>
              <div className="flex items-start gap-4 flex-row-reverse text-right">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans font-medium mb-1">Build Your Reputation</h3>
                  <p className="text-white/60 text-sm font-sans">Earn reviews and grow your tour business</p>
                </div>
              </div>
              <div className="flex items-start gap-4 flex-row-reverse text-right">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <BadgeCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans font-medium mb-1">Government Certification</h3>
                  <p className="text-white/60 text-sm font-sans">Official recognition from Tamil Nadu Tourism</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-white/40 text-sm font-sans text-right">A Government of Tamil Nadu Initiative</p>
        </div>
      </div>
    </main>
  )
}
