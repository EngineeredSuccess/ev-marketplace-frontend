'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { AuthMode, AuthStep } from '@/types/Auth';
import { MagicLinkForm } from './MagicLinkForm';
import { OAuthButtons } from './OAuthButtons';
import { RegistrationForm } from './RegistrationForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  mode,
  onModeChange
}) => {
  const [step, setStep] = useState<AuthStep>('email');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleMagicLinkSuccess = (emailSent: string) => {
    setEmail(emailSent);
    if (mode === 'register') {
      setStep('details');
    } else {
      // For login, simulate magic link click
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  const handleRegistrationComplete = () => {
    onClose();
    setStep('email');
  };

  const handleClose = () => {
    onClose();
    setStep('email');
  };

  return (
    <div style={{
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
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '32px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1f2937', margin: 0 }}>
            {mode === 'login' ? 'Zaloguj się' : 'Zarejestruj się'}
          </h2>
          <button
            onClick={handleClose}
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

        {step === 'email' && (
          <div>
            <MagicLinkForm onSuccess={handleMagicLinkSuccess} />
            <OAuthButtons />
            
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <button
                onClick={() => onModeChange(mode === 'login' ? 'register' : 'login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#10b981',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                {mode === 'login' ? 'Nie masz konta? Zarejestruj się' : 'Masz już konto? Zaloguj się'}
              </button>
            </div>
          </div>
        )}

        {step === 'details' && mode === 'register' && (
          <RegistrationForm onRegistrationComplete={handleRegistrationComplete} />
        )}
      </div>
    </div>
  );
};

export default AuthModal;