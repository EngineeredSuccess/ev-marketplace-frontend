import { useState, useCallback } from 'react';
import { User } from '../types/User';
import { AuthFormData, AuthMode, PhoneVerificationStep } from '../types/Auth';
import { authService } from '../services/authService';
import { validateRegistrationForm } from '../utils/validation';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [phoneVerificationStep, setPhoneVerificationStep] = useState<PhoneVerificationStep>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [authFormData, setAuthFormData] = useState<AuthFormData>({
    phone: '',
    verificationCode: '',
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
        auth_method: method || 'phone'
      });
    }
  }, []);

  const sendVerificationCode = useCallback(async () => {
    if (!authFormData.phone) {
      setError('Numer telefonu jest wymagany');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const result = await authService.sendVerificationCode(authFormData.phone);
      if (result.success) {
        setPhoneVerificationStep('code');
        trackAuthEvent('verification_code_sent');
      } else {
        setError(result.message || 'Błąd podczas wysyłania kodu');
      }
    } catch (err) {
      setError('Błąd podczas wysyłania kodu weryfikacyjnego');
    } finally {
      setLoading(false);
    }
  }, [authFormData.phone, trackAuthEvent]);

  const verifyCode = useCallback(async () => {
    if (!authFormData.verificationCode) {
      setError('Kod weryfikacyjny jest wymagany');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await authService.verifyCode(authFormData.phone, authFormData.verificationCode);
      
      if (result.success) {
        if (result.user && authMode === 'login') {
          // User exists, log them in
          setCurrentUser(result.user);
          setIsAuthenticated(true);
          setShowAuthModal(false);
          setPhoneVerificationStep('phone');
          trackAuthEvent('login_success');
        } else if (authMode === 'register') {
          // New user, proceed to details form
          setPhoneVerificationStep('details');
          trackAuthEvent('verification_success');
        }
      } else {
        setError(result.message || 'Nieprawidłowy kod weryfikacyjny');
        trackAuthEvent('verification_failed');
      }
    } catch (err) {
      setError('Błąd podczas weryfikacji kodu');
      trackAuthEvent('verification_failed');
    } finally {
      setLoading(false);
    }
  }, [authFormData.phone, authFormData.verificationCode, authMode, trackAuthEvent]);

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
        setPhoneVerificationStep('phone');
        trackAuthEvent('registration_complete', authFormData.isCompany ? 'company' : 'individual');
        
        // Reset form
        setAuthFormData({
          phone: '',
          verificationCode: '',
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
    setPhoneVerificationStep('phone');
    setError(null);
    trackAuthEvent('logout');
    
    // Reset form
    setAuthFormData({
      phone: '',
      verificationCode: '',
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

  const openAuthModal = useCallback((mode: AuthMode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setError(null);
  }, []);

  const closeAuthModal = useCallback(() => {
    setShowAuthModal(false);
    setPhoneVerificationStep('phone');
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
    phoneVerificationStep,
    loading,
    error,
    authFormData,
    
    // Actions
    sendVerificationCode,
    verifyCode,
    completeRegistration,
    logout,
    openAuthModal,
    closeAuthModal,
    updateAuthFormData,
    setAuthMode,
    setPhoneVerificationStep,
    trackAuthEvent
  };
};