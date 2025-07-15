export interface AuthFormData {
  email: string;
  firstName: string;
  lastName: string;
  isCompany: boolean;
  companyName: string;
  nip: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  gdprConsent: boolean;
  marketingConsent: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: import('./User').User;
}

export interface MagicLinkResponse {
  success: boolean;
  message: string;
}

export interface OAuthResponse {
  success: boolean;
  message: string;
  data?: any;
}

export type AuthMode = 'login' | 'register';
export type AuthStep = 'email' | 'details';