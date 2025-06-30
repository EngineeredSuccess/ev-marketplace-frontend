// types/Auth.ts
export type AuthMode = 'login' | 'register';

export type PhoneVerificationStep = 'phone' | 'code' | 'details';

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
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (phone: string, code: string) => Promise<void>;
  register: (userData: AuthFormData) => Promise<void>;
  logout: () => void;
  sendVerificationCode: (phone: string) => Promise<void>;
  verifyCode: (phone: string, code: string) => Promise<boolean>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  clearError: () => void;
}

export interface VerificationResponse {
  success: boolean;
  message: string;
  user?: User;
}

export interface SMSVerificationState {
  isLoading: boolean;
  isCodeSent: boolean;
  error: string | null;
  retryCount: number;
  lastSentTime: number | null;
}

// Re-export User interface for convenience
export interface User {
  id: number;
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  isCompany: boolean;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  companyName?: string;
  nip?: string;
  isVerified: boolean;
  registrationDate: Date;
}