"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type UserRole = "tourist" | "guide" | null

interface AuthContextType {
  userRole: UserRole
  isAuthenticated: boolean
  login: (role: UserRole, redirectTo?: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Load auth state from localStorage on mount
    const storedRole = localStorage.getItem("userRole") as UserRole
    if (storedRole) {
      setUserRole(storedRole)
      setIsAuthenticated(true)
    }
  }, [])

  const login = (role: UserRole, redirectTo?: string) => {
    if (role) {
      localStorage.setItem("userRole", role)
      setUserRole(role)
      setIsAuthenticated(true)

      // Redirect based on role
      if (redirectTo) {
        router.push(redirectTo)
      } else if (role === "guide") {
        router.push("/dashboard/guide")
      } else if (role === "tourist") {
        router.push("/dashboard/tourist")
      } else {
        router.push("/")
      }
    }
  }

  const logout = () => {
    localStorage.removeItem("userRole")
    setUserRole(null)
    setIsAuthenticated(false)
    router.push("/")
  }

  return <AuthContext.Provider value={{ userRole, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
