import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

export interface AuthUser {
  id: string
  phone?: string
  email?: string
  user_metadata?: any
}

export interface UserProfile {
  id: number
  phone: string
  email: string
  first_name: string
  last_name: string
  is_company: boolean
  city: string
  company_name?: string
  nip?: string
  is_verified: boolean
}

export const authService = {
  // Get current user
  getCurrentUser: async (): Promise<AuthUser | null> => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  // Get user profile from database
  getUserProfile: async (): Promise<UserProfile | null> => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return null

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('Error fetching user profile:', error)
      return null
    }

    return data
  },

  // Create user profile
  createUserProfile: async (profileData: Omit<UserProfile, 'id' | 'is_verified'>): Promise<UserProfile | null> => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('No authenticated user')

    const { data, error } = await supabase
      .from('users')
      .insert({
        id: parseInt(user.id),
        ...profileData,
        is_verified: true // Phone is already verified through auth
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating user profile:', error)
      throw error
    }

    return data
  },

  // Update user profile
  updateUserProfile: async (updates: Partial<UserProfile>): Promise<UserProfile | null> => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('No authenticated user')

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating user profile:', error)
      throw error
    }

    return data
  },

  // Sign out
  signOut: async (): Promise<void> => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error)
      throw error
    }
  },

  // Listen to auth changes
  onAuthStateChange: (callback: (user: AuthUser | null) => void) => {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null)
    })
  }
}