import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { smsService } from './smsService'

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
  street: string
  city: string
  postal_code: string
  country: string
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

  // Phone verification methods (delegate to smsService)
  sendVerificationCode: async (phone: string) => {
    return await smsService.sendVerificationCode(phone)
  },

  verifyCode: async (phone: string, code: string) => {
    return await smsService.verifyCode(phone, code)
  },

  // Register user (create profile after phone verification)
  registerUser: async (userData: any) => {
    try {
      const profile = await authService.createUserProfile({
        phone: userData.phone,
        email: userData.email,
        first_name: userData.firstName,
        last_name: userData.lastName,
        is_company: userData.isCompany,
        street: userData.street || '',
        city: userData.city,
        postal_code: userData.postalCode || '',
        country: userData.country || 'Poland',
        company_name: userData.isCompany ? userData.companyName : undefined,
        nip: userData.isCompany ? userData.nip : undefined
      })

      if (profile) {
        // Convert UserProfile to User format expected by useAuth
        const user = {
          id: profile.id,
          phone: profile.phone,
          email: profile.email,
          firstName: profile.first_name,
          lastName: profile.last_name,
          isCompany: profile.is_company,
          street: profile.street,
          city: profile.city,
          postalCode: profile.postal_code,
          country: profile.country,
          companyName: profile.company_name,
          nip: profile.nip,
          isVerified: profile.is_verified,
          registrationDate: new Date()
        }
        
        return {
          success: true,
          user: user,
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

  // Listen to auth changes
  onAuthStateChange: (callback: (user: AuthUser | null) => void) => {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null)
    })
  }
}