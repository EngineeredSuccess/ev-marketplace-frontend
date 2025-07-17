import { supabase } from '@/lib/supabase'

export interface OAuthResponse {
  success: boolean
  message: string
  data?: any
}

export const oauthService = {
  // Sign in with Google
  signInWithGoogle: async (): Promise<OAuthResponse> => {
    try {
      // Get the origin URL safely for both client and server environments
      const origin = typeof window !== 'undefined' 
        ? window.location.origin 
        : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}/auth/callback`,
        },
      })

      if (error) {
        return {
          success: false,
          message: error.message
        }
      }

      return {
        success: true,
        message: 'Przekierowanie do Google...',
        data
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Błąd podczas logowania przez Google'
      }
    }
  },

  // Sign in with Apple
  signInWithApple: async (): Promise<OAuthResponse> => {
    try {
      // Get the origin URL safely for both client and server environments
      const origin = typeof window !== 'undefined' 
        ? window.location.origin 
        : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${origin}/auth/callback`,
        },
      })

      if (error) {
        return {
          success: false,
          message: error.message
        }
      }

      return {
        success: true,
        message: 'Przekierowanie do Apple...',
        data
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Błąd podczas logowania przez Apple'
      }
    }
  }
}