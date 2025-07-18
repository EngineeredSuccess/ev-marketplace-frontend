'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { authService, UserProfile } from '@/services/authService'

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial user
    const getInitialUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        
        if (user) {
          try {
            const profile = await authService.getUserProfile()
            setProfile(profile)
          } catch (error) {
            console.error('Error getting user profile:', error)
            setProfile(null)
          }
        }
      } catch (error) {
        console.error('Error getting user:', error)
        setUser(null)
        setProfile(null)
      } finally {
        setLoading(false)
        clearTimeout(timeoutId)
      }
    }

    getInitialUser()

    // Add a timeout to prevent stuck loading state
    const timeoutId = setTimeout(() => {
      console.warn('Auth loading timeout reached, clearing loading state')
      setLoading(false)
    }, 5000)

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        setUser(session?.user || null)
        
        if (session?.user) {
          try {
            const profile = await authService.getUserProfile()
            setProfile(profile)
          } catch (error) {
            console.error('Error getting user profile on auth change:', error)
            setProfile(null)
          }
        } else {
          setProfile(null)
        }
      } catch (error) {
        console.error('Error handling auth state change:', error)
        setUser(null)
        setProfile(null)
      } finally {
        setLoading(false)
        clearTimeout(timeoutId)
      }
    })

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeoutId)
    }
  }, [])

  const signOut = async () => {
    await authService.signOut()
    setUser(null)
    setProfile(null)
  }

  const refreshProfile = async () => {
    if (user) {
      const profile = await authService.getUserProfile()
      setProfile(profile)
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      signOut,
      refreshProfile
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}