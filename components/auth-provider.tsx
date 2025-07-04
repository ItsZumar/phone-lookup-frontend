"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export type User = {
  id: string
  email: string
  name: string
  role: "admin" | "user"
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem("auth-token")
    if (token) {
      // Verify token and get user data
      fetch("/api/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user)
          } else {
            localStorage.removeItem("auth-token")
          }
        })
        .catch(() => {
          localStorage.removeItem("auth-token")
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok && data.token) {
        localStorage.setItem("auth-token", data.token)
        console.log("Auth Provider - Login response user:", data.user)
        console.log("Auth Provider - User role:", data.user?.role)
        setUser(data.user)
        return true
      }
      return false
    } catch {
      return false
    }
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (response.ok && data.token) {
        localStorage.setItem("auth-token", data.token)
        console.log("Auth Provider - Signup response user:", data.user)
        console.log("Auth Provider - User role:", data.user?.role)
        setUser(data.user)
        return true
      }
      return false
    } catch {
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("auth-token")
    setUser(null)
  }

  const refreshUser = async () => {
    const token = localStorage.getItem("auth-token")
    if (token) {
      try {
        const response = await fetch("/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()
        if (data.user) {
          setUser(data.user)
        } else {
          localStorage.removeItem("auth-token")
          setUser(null)
        }
      } catch {
        localStorage.removeItem("auth-token")
        setUser(null)
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
