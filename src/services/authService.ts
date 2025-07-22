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
  auth_user_id: string
  email: string
  first_name: string
  last_name: string
  phone?: string
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

// Utility function to add timeout to promises
const withTimeout = <T>(promise: Promise<T>, timeoutMs: number = 10000): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => 
      setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)
    )
  ])
}

// Utility function for retry logic
const withRetry = async <T>(
  operation: () => Promise<T>, 
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error
      console.warn(`Attempt ${attempt} failed:`, error)
      
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay * attempt))
      }
    }
  }
  
  throw lastError!
}

export const authService = {
  // Get current user
  getCurrentUser: async (): Promise<AuthUser | null> => {
    try {
      const result = await withTimeout(supabase.auth.getUser(), 5000)
      return result.data.user
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  },

  // Get user profile from database with timeout and retry
  getUserProfile: async (): Promise<UserProfile | null> => {
    try {
      const result = await withTimeout(supabase.auth.getUser(), 5000)
      const user = result.data.user
      
      if (!user) {
        console.log('No authenticated user found')
        return null
      }

      console.log('Fetching profile for user:', user.id)

      const profileOperation = async () => {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('auth_user_id', user.id)
          .single()

        if (error) {
          if (error.code === 'PGRST116') {
            // No profile found - this is expected for new users
            console.log('No profile found for user:', user.id)
            return null
          }
          throw error
        }

        return data
      }

      const profile = await withRetry(
        () => withTimeout(profileOperation(), 8000),
        2, // Max 2 retries
        2000 // 2 second delay between retries
      )

      console.log('Profile fetched successfully:', profile ? 'found' : 'not found')
      return profile

    } catch (error) {
      console.error('Error fetching user profile:', error)
      
      // Don't throw error - return null to allow app to continue
      if (error instanceof Error) {
        if (error.message.includes('timed out')) {
          console.error('Profile fetch timed out - continuing without profile')
        } else if (error.message.includes('network')) {
          console.error('Network error - continuing without profile')
        }
      }
      
      return null
    }
  },

  // Create user profile
  createUserProfile: async (profileData: Omit<UserProfile, 'id' | 'auth_user_id' | 'is_verified'>): Promise<UserProfile | null> => {
    try {
      const result = await withTimeout(supabase.auth.getUser(), 5000)
      const user = result.data.user
      
      if (!user) throw new Error('No authenticated user')

      console.log('Creating profile for user:', user.id)

      const createOperation = async () => {
        const { data, error } = await supabase
          .from('users')
          .insert({
            auth_user_id: user.id, // Store the UUID as auth_user_id
            ...profileData,
            is_verified: true // Email/OAuth is already verified
          })
          .select()
          .single()

        if (error) {
          console.error('Database error creating profile:', error)
          throw error
        }

        return data
      }

      const profile = await withRetry(
        () => withTimeout(createOperation(), 10000),
        2,
        2000
      )

      console.log('Profile created successfully:', profile.id)
      return profile

    } catch (error) {
      console.error('Error creating user profile:', error)
      throw error
    }
  },

  // Update user profile
  updateUserProfile: async (updates: Partial<UserProfile>): Promise<UserProfile | null> => {
    try {
      const result = await withTimeout(supabase.auth.getUser(), 5000)
      const user = result.data.user
      
      if (!user) throw new Error('No authenticated user')

      console.log('Updating profile for user:', user.id)

      const updateOperation = async () => {
        const { data, error } = await supabase
          .from('users')
          .update(updates)
          .eq('auth_user_id', user.id)
          .select()
          .single()

        if (error) {
          console.error('Database error updating profile:', error)
          throw error
        }

        return data
      }

      const profile = await withRetry(
        () => withTimeout(updateOperation(), 10000),
        2,
        2000
      )

      console.log('Profile updated successfully')
      return profile

    } catch (error) {
      console.error('Error updating user profile:', error)
      throw error
    }
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
      const result = await withTimeout(supabase.auth.getUser(), 5000)
      const user = result.data.user
      
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
      console.error('Registration error:', error)
      return {
        success: false,
        message: error.message || 'Registration failed'
      }
    }
  },

  // Sign out
  signOut: async (): Promise<void> => {
    try {
      const { error } = await withTimeout(supabase.auth.signOut(), 5000)
      if (error) {
        console.error('Error signing out:', error)
        throw error
      }
      console.log('Successfully signed out')
    } catch (error) {
      console.error('Sign out failed:', error)
      throw error
    }
  },

  // Listen to auth changes
  onAuthStateChange: (callback: (user: AuthUser | null) => void) => {
    return supabase.auth.onAuthStateChange((event: any, session: any) => {
      console.log('Auth state changed:', event, session?.user?.id || 'no user')
      callback(session?.user || null)
    })
  }
}
