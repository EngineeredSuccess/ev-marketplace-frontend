// Import UserProfile from authService
import { UserProfile } from '@/services/authService'

// User is the same as UserProfile
export type User = UserProfile

export interface AuthFormData {
  email: string
  phone: string
  verificationCode: string
  firstName: string
  lastName: string
  isCompany: boolean
  companyName: string
  nip: string
  street: string
  city: string
  postalCode: string
  country: string
  gdprConsent: boolean
  marketingConsent: boolean
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: User
}

export interface MagicLinkResponse {
  success: boolean
  message: string
}

export interface OAuthResponse {
  success: boolean
  message: string
  data?: any
}

export type AuthMode = 'login' | 'register'

export type PhoneVerificationStep = 'phone' | 'code' | 'details' | 'complete'