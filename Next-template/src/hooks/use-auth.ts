"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { getUserAction, logoutAction } from "@/src/app/_action/auth.action"
import { User } from "@/src/types"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const refreshUser = useCallback(async () => {
    try {
      const data = await getUserAction()
      setUser(data)
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    let ignore = false

    async function loadUser() {
      try {
        const data = await getUserAction()
        if (!ignore) {
          setUser(data)
        }
      } catch {
        if (!ignore) {
          setUser(null)
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    loadUser()

    return () => {
      ignore = true
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await logoutAction()
    } finally {
      setUser(null)
      router.push("/sign-in")
      router.refresh()
    }
  }, [router])

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    logout,
    refreshUser,
  }
}

