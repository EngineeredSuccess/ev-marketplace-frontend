import { supabase } from '@/lib/supabase'

export interface MagicLinkResponse {
  success: boolean
  message: string
}

export const magicLinkService = {
  // Send magic link to email
  sendMagicLink: async (email: string): Promise<MagicLinkResponse> => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
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