"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Compass, Users } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<"tourist" | "guide" | null>(null)

  const handleRoleSelection = (role: "tourist" | "guide") => {
    setSelectedRole(role)
    // Smooth transition before navigation
    setTimeout(() => {
      router.push(`/login/${role}`)
    }, 300)
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1920&auto=format&fit=crop"
          alt="Tamil Nadu Tourism"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col">
        {/* Header */}
        <div className="container mx-auto px-6 py-6">
          <Link href="/" className="flex items-center gap-3 w-fit">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <span className="text-white font-bold">TN</span>
            </div>
            <div>
              <h1 className="text-lg font-serif text-white">Tamil Nadu</h1>
              <p className="text-xs font-sans tracking-widest uppercase text-white/70">Digital Tourism</p>
            </div>
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-6xl">
            {/* Title */}
            <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 text-balance">
                Welcome to Tamil Nadu Tourism
              </h2>
              <p className="text-lg text-white/80 font-sans max-w-2xl mx-auto text-balance">
                Choose how you'd like to continue your journey with us
              </p>
            </div>

            {/* Role Selection Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Tourist Card */}
              <button
                onClick={() => handleRoleSelection("tourist")}
                className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-500 animate-in fade-in slide-in-from-left-8 ${selectedRole === "tourist"
                  ? "border-white scale-105 shadow-2xl"
                  : selectedRole === null
                    ? "border-white/30 hover:border-white/60 hover:scale-105"
                    : "border-white/10 scale-95 opacity-50"
                  }`}
                style={{ animationDelay: "200ms" }}
              >
                {/* Background */}
                <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-md" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />

                {/* Content */}
                <div className="relative p-8 md:p-10 text-left">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Compass className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-3">Continue as Tourist</h3>
                  <p className="text-white/90 font-sans leading-relaxed mb-8">
                    Explore destinations, discover hidden gems, and connect with local guides for authentic experiences
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-white/90">
                      <div className="w-2 h-2 rounded-full bg-white/60" />
                      <span className="text-sm font-sans">Personalized recommendations</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/90">
                      <div className="w-2 h-2 rounded-full bg-white/60" />
                      <span className="text-sm font-sans">Real-time crowd updates</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/90">
                      <div className="w-2 h-2 rounded-full bg-white/60" />
                      <span className="text-sm font-sans">Cultural insights & guides</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-white font-sans font-medium group-hover:gap-4 transition-all">
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </button>

              {/* Guide Card */}
              <button
                onClick={() => handleRoleSelection("guide")}
                className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-500 animate-in fade-in slide-in-from-right-8 ${selectedRole === "guide"
                  ? "border-white scale-105 shadow-2xl"
                  : selectedRole === null
                    ? "border-white/30 hover:border-white/60 hover:scale-105"
                    : "border-white/10 scale-95 opacity-50"
                  }`}
                style={{ animationDelay: "400ms" }}
              >
                {/* Background */}
                <div className="absolute inset-0 bg-amber-900/20 backdrop-blur-md" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />

                {/* Content */}
                <div className="relative p-8 md:p-10 text-left">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Users className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-3">Continue as Guide</h3>
                  <p className="text-white/90 font-sans leading-relaxed mb-8">
                    Share your expertise, manage tour requests, and build your reputation as a certified local guide
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-white/90">
                      <div className="w-2 h-2 rounded-full bg-white/60" />
                      <span className="text-sm font-sans">Manage your schedule</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/90">
                      <div className="w-2 h-2 rounded-full bg-white/60" />
                      <span className="text-sm font-sans">Accept/decline requests</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/90">
                      <div className="w-2 h-2 rounded-full bg-white/60" />
                      <span className="text-sm font-sans">Government certification</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-white font-sans font-medium group-hover:gap-4 transition-all">
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </button>
            </div>

            {/* Info Text */}
            <p
              className="text-center mt-12 text-white/60 text-sm font-sans animate-in fade-in duration-700"
              style={{ animationDelay: "600ms" }}
            >
              New to the platform? You can create an account after selecting your role
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="container mx-auto px-6 py-6">
          <p className="text-center text-white/40 text-sm font-sans">A Government of Tamil Nadu Initiative</p>
        </div>
      </div>
    </main>
  )
}
