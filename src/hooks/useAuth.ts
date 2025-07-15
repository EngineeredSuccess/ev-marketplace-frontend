import { useState, useCallback } from 'react';
import { User } from '../types/User';
import { AuthFormData, AuthMode } from '../types/Auth';
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
        auth_method: method || 'google'
      });
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await authService.signInWithGoogle();
      if (result.success) {
        trackAuthEvent('google_login_success');
        // Handle successful login - user profile should be available
        const profile = await authService.getUserProfile();
        if (profile) {
          setCurrentUser(profile); // UserProfile matches User type now
          setIsAuthenticated(true);
          setShowAuthModal(false);
        }
      } else {
        setError(result.message || 'Błąd podczas logowania przez Google');
        trackAuthEvent('google_login_failed');
      }
    } catch (err) {
      setError('Błąd podczas logowania przez Google');
      trackAuthEvent('google_login_failed');
    } finally {
      setLoading(false);
    }
  }, [trackAuthEvent]);

  const signInWithApple = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await authService.signInWithApple();
      if (result.success) {
        trackAuthEvent('apple_login_success');
        // Handle successful login - user profile should be available
        const profile = await authService.getUserProfile();
        if (profile) {
          setCurrentUser(profile); // UserProfile matches User type now
          setIsAuthenticated(true);
          setShowAuthModal(false);
        }
      } else {
        setError(result.message || 'Błąd podczas logowania przez Apple');
        trackAuthEvent('apple_login_failed');
      }
    } catch (err) {
      setError('Błąd podczas logowania przez Apple');
      trackAuthEvent('apple_login_failed');
    } finally {
      setLoading(false);
    }
  }, [trackAuthEvent]);

  const sendMagicLink = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await authService.sendMagicLink(email);
      if (result.success) {
        trackAuthEvent('magic_link_sent');
      } else {
        setError(result.message || 'Błąd podczas wysyłania magic link');
      }
    } catch (err) {
      setError('Błąd podczas wysyłania magic link');
    } finally {
      setLoading(false);
    }
  }, [trackAuthEvent]);

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

  const logout = useCallback(async () => {
    try {
      await authService.signOut();
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
    } catch (err) {
      setError('Błąd podczas wylogowania');
    }
  }, [trackAuthEvent]);

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
    signInWithGoogle,
    signInWithApple,
    sendMagicLink,
    completeRegistration,
    logout,
    openAuthModal,
    closeAuthModal,
    updateAuthFormData,
    setAuthMode,
    trackAuthEvent
  };
};