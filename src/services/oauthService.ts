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
      console.log('Initiating Google OAuth...')
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      console.log('OAuth response:', { data, error })

      if (error) {
        console.error('OAuth error:', error)
        return {
          success: false,
          message: `Google OAuth error: ${error.message}`
        }
      }

      // Check if we got a URL for redirect
      if (data?.url) {
        console.log('Redirecting to:', data.url)
        window.location.href = data.url
        return {
          success: true,
          message: 'Przekierowanie do Google...',
          data
        }
      }

      return {
        success: true,
        message: 'Przekierowanie do Google...',
        data
      }
    } catch (error: any) {
      console.error('OAuth service error:', error)
      return {
        success: false,
        message: error.message || 'Błąd podczas logowania przez Google'
      }
    }
  },

  // Sign in with Apple
  signInWithApple: async (): Promise<OAuthResponse> => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
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