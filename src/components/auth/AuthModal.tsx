import React, { useState } from 'react';
import { X } from 'lucide-react';
import { AuthMode, PhoneVerificationStep } from '../../types/Auth';
import { PhoneVerification } from './PhoneVerification';
import { CodeVerification } from './CodeVerification';
import { RegistrationForm } from './RegistrationForm';

interface AuthModalProps {
  isOpen: boolean;
  authMode: AuthMode;
  phoneVerificationStep: PhoneVerificationStep;
  onClose: () => void;
  onAuthModeChange: (mode: AuthMode) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  authMode,
  phoneVerificationStep,
  onClose,
  onAuthModeChange
}) => {
  const [verifiedPhone, setVerifiedPhone] = useState<string>('')
  const [currentStep, setCurrentStep] = useState<'phone' | 'registration' | 'complete'>('phone')

  if (!isOpen) return null;

  const handleVerificationComplete = (phone: string) => {
    setVerifiedPhone(phone)
    if (authMode === 'register') {
      setCurrentStep('registration')
    } else {
      // For login, you might want to redirect or show a different flow
      setCurrentStep('complete')
      onClose()
    }
  }

  const handleRegistrationComplete = () => {
    setCurrentStep('complete')
    onClose()
    // You might want to redirect to dashboard or show success message
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '32px',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1f2937' }}>
            {authMode === 'login' ? 'Zaloguj się' : 'Zarejestruj się'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            <X style={{ height: '24px', width: '24px' }} />
          </button>
        </div>

        {currentStep === 'phone' && phoneVerificationStep === 'phone' && (
          <PhoneVerification
            authMode={authMode}
            onAuthModeChange={onAuthModeChange}
            onVerificationComplete={handleVerificationComplete}
          />
        )}

        {phoneVerificationStep === 'code' && (
          <CodeVerification />
        )}

        {currentStep === 'registration' && authMode === 'register' && (
          <RegistrationForm 
            phone={verifiedPhone}
            onRegistrationComplete={handleRegistrationComplete}
          />
        )}
      </div>
    </div>
  );
};