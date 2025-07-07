import React from 'react';
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
  if (!isOpen) return null;

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

        {phoneVerificationStep === 'phone' && (
          <PhoneVerification
            authMode={authMode}
            onAuthModeChange={onAuthModeChange}
          />
        )}

        {phoneVerificationStep === 'code' && (
          <CodeVerification />
        )}

        {phoneVerificationStep === 'details' && authMode === 'register' && (
          <RegistrationForm />
        )}
      </div>
    </div>
  );
};