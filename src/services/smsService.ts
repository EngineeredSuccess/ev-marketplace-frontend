import { supabase } from '@/lib/supabase'

export interface SMSResponse {
  success: boolean
  message: string
  messageId?: string
}

export interface SMSVerificationResponse {
  success: boolean
  message: string
  isValid?: boolean
}

export const smsService = {
  // Send SMS verification code using Supabase Auth
  sendVerificationCode: async (phoneNumber: string): Promise<SMSResponse> => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phoneNumber,
      })

      if (error) {
        return {
          success: false,
          message: error.message
        }
      }

      return {
        success: true,
        message: 'Kod weryfikacyjny został wysłany'
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Błąd podczas wysyłania kodu'
      }
    }
  },

  // Verify SMS code using Supabase Auth
  verifyCode: async (phoneNumber: string, code: string): Promise<SMSVerificationResponse> => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: phoneNumber,
        token: code,
        type: 'sms',
      })

      if (error) {
        return {
          success: false,
          message: error.message,
          isValid: false
        }
      }

      return {
        success: true,
        message: 'Kod został zweryfikowany pomyślnie',
        isValid: true
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Nieprawidłowy kod',
        isValid: false
      }
    }
  }
}