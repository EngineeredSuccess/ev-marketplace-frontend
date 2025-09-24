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
      console.log('Current origin:', window.location.origin)
      console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
      
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

      console.log("OAuth data:", data)
      console.error("OAuth error:", error)

      if (error) {
        console.error('OAuth error:', error)
        return {
          success: false,
          message: `Google OAuth error: ${error.message}. Please check Supabase OAuth configuration.`
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
        success: false,
        message: 'No redirect URL received. Please check OAuth configuration in Supabase dashboard.'
      }
    } catch (error: any) {
      console.error('OAuth service error:', error)
      return {
        success: false,
        message: error.message || 'Błąd podczas logowania przez Google. Sprawdź konfigurację OAuth.'
      }
    }
  },

  // Sign in with Apple
  signInWithApple: async (): Promise<OAuthResponse> => {
    try {
      console.log('Initiating Apple OAuth...')
      console.log('Current origin:', window.location.origin)
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      console.log('Apple OAuth response:', { data, error })

      if (error) {
        console.error('Apple OAuth error:', error)
        return {
          success: false,
          message: `Apple OAuth error: ${error.message}. Please check Supabase OAuth configuration.`
        }
      }

      // Check if we got a URL for redirect
      if (data?.url) {
        console.log('Redirecting to Apple:', data.url)
        window.location.href = data.url
        return {
          success: true,
          message: 'Przekierowanie do Apple...',
          data
        }
      }

      return {
        success: false,
        message: 'No redirect URL received. Please check Apple OAuth configuration in Supabase dashboard.'
      }
    } catch (error: any) {
      console.error('Apple OAuth service error:', error)
      return {
        success: false,
        message: error.message || 'Błąd podczas logowania przez Apple. Sprawdź konfigurację OAuth.'
      }
    }
  }
}