export interface AuthFormData {
  phone: string;
  verificationCode: string;
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

export type AuthMode = 'login' | 'register';
export type PhoneVerificationStep = 'phone' | 'code' | 'details';