import React from 'react';
import { Phone } from 'lucide-react';
import { AuthMode } from '../../types/Auth';
import { useAuth } from '../../hooks/useAuth';

interface PhoneVerificationProps {
  authMode: AuthMode;
  onAuthModeChange: (mode: AuthMode) => void;
}

export const PhoneVerification: React.FC<PhoneVerificationProps> = ({
  authMode,
  onAuthModeChange
}) => {
  const { authFormData, updateAuthFormData, sendVerificationCode, loading } = useAuth();

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <Phone style={{ height: '48px', width: '48px', color: '#10b981', margin: '0 auto 16px' }} />
        <p style={{ color: '#6b7280' }}>
          {authMode === 'login' 
            ? 'Podaj numer telefonu, aby się zalogować'
            : 'Podaj numer telefonu, aby rozpocząć rejestrację'
          }
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
          Numer telefonu
        </label>
        <input
          type="tel"
          placeholder="+48 123 456 789"
          value={authFormData.phone}
          onChange={(e) => updateAuthFormData({ phone: e.target.value })}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '16px',
            outline: 'none'
          }}
        />
      </div>

      <button
        onClick={sendVerificationCode}
        disabled={loading || !authFormData.phone}
        style={{
          width: '100%',
          background: loading ? '#9ca3af' : 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white',
          border: 'none',
          padding: '14px',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Wysyłanie...' : 'Wyślij kod weryfikacyjny'}
      </button>

      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <button
          onClick={() => onAuthModeChange(authMode === 'login' ? 'register' : 'login')}
          style={{
            background: 'none',
            border: 'none',
            color: '#10b981',
            fontSize: '14px',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          {authMode === 'login' ? 'Nie masz konta? Zarejestruj się' : 'Masz już konto? Zaloguj się'}
        </button>
      </div>
    </div>
  );
};