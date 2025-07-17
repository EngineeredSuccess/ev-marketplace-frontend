import { supabase } from '@/lib/supabase'

export interface MagicLinkResponse {
  success: boolean
  message: string
}

export const magicLinkService = {
  // Send magic link to email
  sendMagicLink: async (email: string): Promise<MagicLinkResponse> => {
    try {
      console.log('Sending magic link to:', email)
      console.log('Redirect URL:', `${window.location.origin}/auth/callback`)
      console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
      
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        console.error('Magic link error:', error)
        return {
          success: false,
          message: `Magic link error: ${error.message}. Please check email configuration in Supabase.`
        }
      }

      console.log('Magic link sent successfully')
      return {
        success: true,
        message: 'Link weryfikacyjny został wysłany na Twój email. Sprawdź również folder spam.'
      }
    } catch (error: any) {
      console.error('Magic link service error:', error)
      return {
        success: false,
        message: error.message || 'Błąd podczas wysyłania linku. Sprawdź konfigurację email w Supabase.'
      }
    }
  }
}