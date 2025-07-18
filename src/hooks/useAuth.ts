import { useState, useCallback } from 'react';
import { User } from '../types/User';
import { AuthFormData, AuthMode } from '../types/Auth';
import { ProfileUpdateData } from '../types/Profile';
import { authService } from '../services/authService';
import { validateRegistrationForm } from '../utils/validation';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [authFormData, setAuthFormData] = useState<AuthFormData>({
    email: '',
    firstName: '',
    lastName: '',
    isCompany: false,
    companyName: '',
    nip: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'Polska',
    gdprConsent: false,
    marketingConsent: false
  });

  // Track authentication events
  const trackAuthEvent = useCallback((action: string, method?: string) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'auth_action',
        auth_action: action,
        auth_method: method || 'email'
      });
    }
  }, []);

  const completeRegistration = useCallback(async () => {
    if (!validateRegistrationForm(authFormData)) {
      setError('Proszę wypełnić wszystkie wymagane pola');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await authService.registerUser(authFormData);
      
      if (result.success && result.user) {
        setCurrentUser(result.user);
        setIsAuthenticated(true);
        setShowAuthModal(false);
        trackAuthEvent('registration_complete', authFormData.isCompany ? 'company' : 'individual');
        
        // Reset form
        setAuthFormData({
          email: '',
          firstName: '',
          lastName: '',
          isCompany: false,
          companyName: '',
          nip: '',
          street: '',
          city: '',
          postalCode: '',
          country: 'Polska',
          gdprConsent: false,
          marketingConsent: false
        });
      } else {
        setError(result.message || 'Błąd podczas rejestracji');
      }
    } catch (err) {
      setError('Błąd podczas rejestracji użytkownika');
    } finally {
      setLoading(false);
    }
  }, [authFormData, trackAuthEvent]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setShowAuthModal(false);
    setError(null);
    trackAuthEvent('logout');
    
    // Reset form
    setAuthFormData({
      email: '',
      firstName: '',
      lastName: '',
      isCompany: false,
      companyName: '',
      nip: '',
      street: '',
      city: '',
      postalCode: '',
      country: 'Polska',
      gdprConsent: false,
      marketingConsent: false
    });
  }, [trackAuthEvent]);

  const updateProfile = useCallback(async (profileData: ProfileUpdateData) => {
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const result = await authService.updateUserProfile(profileData);
      
      if (result) {
        setCurrentUser(result);
        trackAuthEvent('profile_updated');
        return result;
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentUser, trackAuthEvent]);

  const openAuthModal = useCallback((mode: AuthMode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setError(null);
  }, []);

  const closeAuthModal = useCallback(() => {
    setShowAuthModal(false);
    setError(null);
  }, []);

  const updateAuthFormData = useCallback((updates: Partial<AuthFormData>) => {
    setAuthFormData(prev => ({ ...prev, ...updates }));
    setError(null); // Clear error when user starts typing
  }, []);

  return {
    // State
    currentUser,
    isAuthenticated,
    showAuthModal,
    authMode,
    loading,
    error,
    authFormData,
    
    // Actions
    completeRegistration,
    logout,
    openAuthModal,
    closeAuthModal,
    updateAuthFormData,
    updateProfile,
    setAuthMode,
    trackAuthEvent
  };
};