export type AuthMode = 'login' | 'register'

export type PhoneVerificationStep = 'phone' | 'verification' | 'registration'

export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  isCompany: boolean
  street: string
  city: string
  postalCode: string
  country: string
  companyName?: string
  nip?: string
  isVerified: boolean
  authProvider: string
  registrationDate: Date
}

export interface AuthFormData {
  phone: string
  verificationCode: string
  email: string
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