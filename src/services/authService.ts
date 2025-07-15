import { User } from '@/types/User';
import { AuthFormData, AuthResponse } from '@/types/Auth';
import { magicLinkService } from './magicLinkService';
import { oauthService } from './oauthService';

export const authService = {
  // Current user state (in memory for demo)
  currentUser: null as User | null,

  // Get current user
  getCurrentUser: (): User | null => {
    return authService.currentUser;
  },

  // Magic link authentication
  sendMagicLink: async (email: string) => {
    return await magicLinkService.sendMagicLink(email);
  },

  // OAuth authentication
  signInWithGoogle: async () => {
    const result = await oauthService.signInWithGoogle();
    if (result.success && result.data) {
      // Create user from OAuth data
      const user: User = {
        id: Date.now(),
        email: result.data.email,
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        isCompany: false,
        street: '',
        city: '',
        postalCode: '',
        country: 'Poland',
        companyName: undefined,
        nip: undefined,
        isVerified: true,
        authProvider: 'google',
        registrationDate: new Date()
      };
      
      authService.currentUser = user;
      return { success: true, user };
    }
    return result;
  },

  signInWithApple: async () => {
    const result = await oauthService.signInWithApple();
    if (result.success && result.data) {
      // Create user from OAuth data
      const user: User = {
        id: Date.now(),
        email: result.data.email,
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        isCompany: false,
        street: '',
        city: '',
        postalCode: '',
        country: 'Poland',
        companyName: undefined,
        nip: undefined,
        isVerified: true,
        authProvider: 'apple',
        registrationDate: new Date()
      };
      
      authService.currentUser = user;
      return { success: true, user };
    }
    return result;
  },

  // Register user after email verification
  registerUser: async (userData: AuthFormData): Promise<AuthResponse> => {
    try {
      const user: User = {
        id: Date.now(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        isCompany: userData.isCompany,
        street: userData.street,
        city: userData.city,
        postalCode: userData.postalCode,
        country: userData.country,
        companyName: userData.isCompany ? userData.companyName : undefined,
        nip: userData.isCompany ? userData.nip : undefined,
        isVerified: true,
        authProvider: 'email',
        registrationDate: new Date()
      };

      authService.currentUser = user;
      
      return {
        success: true,
        message: 'Rejestracja zakończona pomyślnie.',
        user: user
      };
    } catch (error) {
      return {
        success: false,
        message: 'Błąd podczas rejestracji. Spróbuj ponownie.'
      };
    }
  },

  // Login with magic link
  loginWithMagicLink: async (email: string): Promise<AuthResponse> => {
    try {
      // In a real implementation, this would verify the magic link token
      // For demo purposes, create a user
      const user: User = {
        id: Date.now(),
        email: email,
        firstName: 'Demo',
        lastName: 'User',
        isCompany: false,
        street: '',
        city: '',
        postalCode: '',
        country: 'Poland',
        companyName: undefined,
        nip: undefined,
        isVerified: true,
        authProvider: 'email',
        registrationDate: new Date()
      };

      authService.currentUser = user;
      
      return {
        success: true,
        message: 'Logowanie pomyślne.',
        user: user
      };
    } catch (error) {
      return {
        success: false,
        message: 'Błąd podczas logowania. Spróbuj ponownie.'
      };
    }
  },

  // Sign out
  signOut: (): void => {
    authService.currentUser = null;
  }
};