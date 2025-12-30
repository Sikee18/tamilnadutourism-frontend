"use client"

import type React from "react"

import { useState } from "react"
import { Camera, User, Globe, Bell, Shield, ChevronRight, Upload } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const { isAuthenticated, userRole } = useAuth()
  const router = useRouter()
  const [language, setLanguage] = useState<"english" | "tamil">("english")
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    crowdAlerts: true,
  })
  const [preferences, setPreferences] = useState({
    showCrowdLevels: true,
    showAlternatives: true,
    distanceUnit: "km" as "km" | "mi",
  })
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)

  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push("/login")
    return null
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-foreground mb-2">Account Settings</h1>
          <p className="text-muted-foreground font-sans">Manage your profile and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-serif text-foreground">Profile Information</h2>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Profile Photo */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-muted overflow-hidden border-2 border-border">
                  {profilePhoto ? (
                    <img
                      src={profilePhoto || "https://source.unsplash.com/featured/?User,Profile,Avatar"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-10 h-10 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <label
                  htmlFor="photo-upload"
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  <Camera className="w-4 h-4 text-primary-foreground" />
                </label>
                <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </div>

              {/* Profile Details */}
              <div className="flex-1">
                <h3 className="text-lg font-sans font-medium text-foreground mb-1">
                  {userRole === "tourist" ? "Tourist Account" : "Guide Account"}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Update your profile photo by clicking the camera icon
                </p>
                <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-sans text-foreground hover:bg-muted transition-colors">
                  <Upload className="w-4 h-4" />
                  Change Photo
                </button>
              </div>
            </div>
          </div>

          {/* Language Preference */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Globe className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-serif text-foreground">Language Preference</h2>
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">🇬🇧</div>
                  <div>
                    <p className="font-sans font-medium text-foreground">English</p>
                    <p className="text-sm text-muted-foreground">Primary language</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="language"
                  checked={language === "english"}
                  onChange={() => setLanguage("english")}
                  className="w-5 h-5 text-primary"
                />
              </label>

              <label className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">தமிழ்</div>
                  <div>
                    <p className="font-sans font-medium text-foreground">Tamil</p>
                    <p className="text-sm text-muted-foreground">தமிழ் மொழி</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="language"
                  checked={language === "tamil"}
                  onChange={() => setLanguage("tamil")}
                  className="w-5 h-5 text-primary"
                />
              </label>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-serif text-foreground">Notifications</h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                <div>
                  <p className="font-sans font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                  className="w-5 h-5 text-primary rounded"
                />
              </label>

              <label className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                <div>
                  <p className="font-sans font-medium text-foreground">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Get real-time alerts on your device</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                  className="w-5 h-5 text-primary rounded"
                />
              </label>

              <label className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                <div>
                  <p className="font-sans font-medium text-foreground">Crowd Level Alerts</p>
                  <p className="text-sm text-muted-foreground">Be notified about crowd changes</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.crowdAlerts}
                  onChange={(e) => setNotifications({ ...notifications, crowdAlerts: e.target.checked })}
                  className="w-5 h-5 text-primary rounded"
                />
              </label>
            </div>
          </div>

          {/* Experience Preferences */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-serif text-foreground">Experience Preferences</h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                <div>
                  <p className="font-sans font-medium text-foreground">Show Crowd Levels</p>
                  <p className="text-sm text-muted-foreground">Display real-time visitor density</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.showCrowdLevels}
                  onChange={(e) => setPreferences({ ...preferences, showCrowdLevels: e.target.checked })}
                  className="w-5 h-5 text-primary rounded"
                />
              </label>

              <label className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                <div>
                  <p className="font-sans font-medium text-foreground">Suggest Alternatives</p>
                  <p className="text-sm text-muted-foreground">Get recommendations for crowded places</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.showAlternatives}
                  onChange={(e) => setPreferences({ ...preferences, showAlternatives: e.target.checked })}
                  className="w-5 h-5 text-primary rounded"
                />
              </label>

              <div className="p-4 border border-border rounded-lg">
                <p className="font-sans font-medium text-foreground mb-3">Distance Unit</p>
                <div className="flex gap-3">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="distanceUnit"
                      checked={preferences.distanceUnit === "km"}
                      onChange={() => setPreferences({ ...preferences, distanceUnit: "km" })}
                      className="sr-only"
                    />
                    <div
                      className={`p-3 text-center rounded-lg border-2 transition-all ${preferences.distanceUnit === "km"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50"
                        }`}
                    >
                      <p className="font-sans font-medium">Kilometers</p>
                      <p className="text-xs">(km)</p>
                    </div>
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="distanceUnit"
                      checked={preferences.distanceUnit === "mi"}
                      onChange={() => setPreferences({ ...preferences, distanceUnit: "mi" })}
                      className="sr-only"
                    />
                    <div
                      className={`p-3 text-center rounded-lg border-2 transition-all ${preferences.distanceUnit === "mi"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50"
                        }`}
                    >
                      <p className="font-sans font-medium">Miles</p>
                      <p className="text-xs">(mi)</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Settings Links */}
          <div className="bg-card border border-border rounded-xl divide-y divide-border">
            <button className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors text-left">
              <div>
                <p className="font-sans font-medium text-foreground">Privacy & Security</p>
                <p className="text-sm text-muted-foreground">Manage your data and security settings</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors text-left">
              <div>
                <p className="font-sans font-medium text-foreground">Help & Support</p>
                <p className="text-sm text-muted-foreground">Get assistance and contact us</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors text-left">
              <div>
                <p className="font-sans font-medium text-foreground">About</p>
                <p className="text-sm text-muted-foreground">Version 1.0.0</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="px-8 py-3 bg-primary text-primary-foreground font-sans font-medium rounded-lg hover:bg-primary/90 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
