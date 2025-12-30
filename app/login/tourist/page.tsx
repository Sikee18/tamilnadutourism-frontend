"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, Mail, Lock, User, Heart, Users, Compass } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function TouristLoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login("tourist")
  }

  return (
    <main className="min-h-screen flex">
      {/* Left - Image with Info */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop"
          alt="Tamil Nadu Tourism"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-temple-gold flex items-center justify-center">
              <span className="text-deep-indigo font-bold">TN</span>
            </div>
            <span className="text-lg font-serif">Tamil Nadu Tourism</span>
          </Link>

          <div>
            <h2 className="text-3xl font-serif font-light mb-6">For Tourists</h2>
            <p className="text-white/80 font-sans leading-relaxed mb-8 max-w-md">
              Your personal gateway to experiencing Tamil Nadu's culture, heritage, and hidden gems with authentic local
              insights.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans font-medium mb-1">Personalized Recommendations</h3>
                  <p className="text-white/60 text-sm font-sans">
                    Get suggestions based on your interests and travel style
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans font-medium mb-1">Smart Crowd Advisory</h3>
                  <p className="text-white/60 text-sm font-sans">
                    Real-time crowd levels and alternative recommendations
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans font-medium mb-1">Connect with Local Guides</h3>
                  <p className="text-white/60 text-sm font-sans">Book verified guides for authentic experiences</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-white/40 text-sm font-sans">A Government of Tamil Nadu Initiative</p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link href="/" className="flex items-center gap-3 mb-12 lg:hidden">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">TN</span>
            </div>
            <div>
              <h1 className="text-lg font-serif text-foreground">Tamil Nadu</h1>
              <p className="text-xs font-sans tracking-widest uppercase text-muted-foreground">Digital Tourism</p>
            </div>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-light text-foreground mb-2">
              {isLogin ? "Welcome Back, Traveler" : "Create Your Account"}
            </h2>
            <p className="text-muted-foreground font-sans">
              {isLogin ? "Sign in to continue your exploration" : "Join us to discover Tamil Nadu"}
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
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-sans font-medium text-foreground mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-sm text-foreground font-sans placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-sans font-medium text-foreground mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-sm text-foreground font-sans placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-sans font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-12 py-3 bg-muted border border-border rounded-sm text-foreground font-sans placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                <Link href="/forgot-password" className="text-sm font-sans text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[oklch(0.65_0.08_145)] text-white font-sans font-medium rounded-sm hover:bg-[oklch(0.6_0.09_145)] transition-all duration-300 hover:shadow-md"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm font-sans text-muted-foreground">or continue with</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="flex gap-4">
            <button className="flex-1 py-3 border border-border rounded-sm text-foreground hover:bg-muted transition-all duration-300 hover:shadow-sm flex items-center justify-center gap-2 font-sans">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
          </div>

          {/* Guide Login Link */}
          <p className="text-center mt-8 text-sm font-sans text-muted-foreground">
            Are you a local guide?{" "}
            <Link href="/login/guide" className="text-primary hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
