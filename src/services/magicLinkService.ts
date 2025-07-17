import { supabase } from '@/lib/supabase'

export interface MagicLinkResponse {
  success: boolean
  message: string
}

export const magicLinkService = {
  // Send magic link to email
  sendMagicLink: async (email: string): Promise<MagicLinkResponse> => {
    try {
      // Get the origin URL safely for both client and server environments
      const origin = typeof window !== 'undefined' 
        ? window.location.origin 
        : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${origin}/auth/callback`,
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
        message: 'Link weryfikacyjny został wysłany na Twój email'
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Błąd podczas wysyłania linku'
      }
    }
  }
}