import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { magicLinkService } from './magicLinkService'
import { oauthService } from './oauthService'

export interface AuthUser {
  id: string
  email?: string
  user_metadata?: any
}

export interface UserProfile {
  id: number
  email: string
  phone?: string
  first_name: string
  last_name: string
  is_company: boolean
  street: string
  city: string
  postal_code: string
  country: string
  company_name?: string
  nip?: string
  is_verified: boolean
  auth_provider: string
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
        is_verified: true // Email/OAuth is already verified
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

  // Magic link authentication
  sendMagicLink: async (email: string) => {
    return await magicLinkService.sendMagicLink(email)
  },

  // OAuth authentication
  signInWithGoogle: async () => {
    return await oauthService.signInWithGoogle()
  },

  signInWithApple: async () => {
    return await oauthService.signInWithApple()
  },

  // Register user (create profile after authentication)
  registerUser: async (userData: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        return {
          success: false,
          message: 'No authenticated user found'
        }
      }

      // Determine auth provider
      const authProvider = user.app_metadata?.provider || 'email'

      const profile = await authService.createUserProfile({
        email: userData.email || user.email || '',
        first_name: userData.firstName,
        last_name: userData.lastName,
        is_company: userData.isCompany,
        street: userData.street || '',
        city: userData.city,
        postal_code: userData.postalCode || '',
        country: userData.country || 'Poland',
        company_name: userData.isCompany ? userData.companyName : undefined,
        nip: userData.isCompany ? userData.nip : undefined,
        auth_provider: authProvider
      })

      if (profile) {
        return {
          success: true,
          user: profile,
          profile: profile
        }
      } else {
        return {
          success: false,
          message: 'Failed to create user profile'
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Registration failed'
      }
    }
  },

  // Sign out
  signOut: async (): Promise<void> => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error)
      throw error
    }
  },

  // Phone verification methods
  sendVerificationCode: async (phone: string): Promise<{ success: boolean; message: string }> => {
    try {
      // For now, just return success - implement actual SMS service later
      return {
        success: true,
        message: 'Verification code sent successfully'
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to send verification code'
      }
    }
  },

  verifyCode: async (phone: string, code: string): Promise<{ success: boolean; message: string; user?: any }> => {
    try {
      // For now, just return success for any 6-digit code - implement actual verification later
      if (code.length === 6) {
        return {
          success: true,
          message: 'Phone verified successfully',
          user: { phone: phone } // Minimal user data for now
        }
      } else {
        return {
          success: false,
          message: 'Invalid verification code'
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to verify code'
      }
    }
  },

  // Listen to auth changes
  onAuthStateChange: (callback: (user: AuthUser | null) => void) => {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null)
    })
  }
}