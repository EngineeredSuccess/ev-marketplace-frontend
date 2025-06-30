import React from ‘react’;
import { Phone } from ‘lucide-react’;
import { AuthMode } from ‘../../types/User’;
import { validatePhoneNumber } from ‘../../utils/validation’;
import { formatPhoneNumber } from ‘../../utils/phoneFormatter’;

interface PhoneVerificationProps {
phone: string;
onPhoneChange: (phone: string) => void;
onSendCode: () => void;
onModeChange: (mode: AuthMode) => void;
authMode: AuthMode;
loading: boolean;
}

export const PhoneVerification: React.FC<PhoneVerificationProps> = ({
phone,
onPhoneChange,
onSendCode,
onModeChange,
authMode,
loading
}) => {
const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const formattedPhone = formatPhoneNumber(e.target.value);
onPhoneChange(formattedPhone);
};

const isValidPhone = validatePhoneNumber(phone);

return (
<div>
<div style={{ textAlign: ‘center’, marginBottom: ‘24px’ }}>
<Phone style={{ height: ‘48px’, width: ‘48px’, color: ‘#10b981’, margin: ‘0 auto 16px’ }} />
<p style={{ color: ‘#6b7280’, lineHeight: ‘1.5’ }}>
{authMode === ‘login’
? ‘Podaj numer telefonu, aby się zalogować’
: ‘Podaj numer telefonu, aby rozpocząć rejestrację’
}
</p>
</div>

```
  <div style={{ marginBottom: '20px' }}>
    <label style={{ 
      display: 'block', 
      fontSize: '14px', 
      fontWeight: '600', 
      color: '#374151', 
      marginBottom: '8px' 
    }}>
      Numer telefonu *
    </label>
    <input
      type="tel"
      placeholder="+48 123 456 789"
      value={phone}
      onChange={handlePhoneChange}
      style={{
        width: '100%',
        padding: '12px 16px',
        border: '2px solid #e5e7eb',
        borderRadius: '12px',
        fontSize: '16px',
        outline: 'none',
        transition: 'border-color 0.2s'
      }}
      onFocus={(e) => e.target.style.borderColor = '#10b981'}
      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
    />
    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
      Format: +48 XXX XXX XXX
    </div>
  </div>

  <button
    onClick={onSendCode}
    disabled={loading || !phone || !isValidPhone}
    style={{
      width: '100%',
      background: loading || !phone || !isValidPhone ? '#9ca3af' : 'linear-gradient(135deg, #10b981, #059669)',
      color: 'white',
      border: 'none',
      padding: '14px',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: loading || !phone || !isValidPhone ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s'
    }}
  >
    {loading ? 'Wysyłanie...' : 'Wyślij kod weryfikacyjny'}
  </button>

  <div style={{ textAlign: 'center', marginTop: '16px' }}>
    <button
      onClick={() => onModeChange(authMode === 'login' ? 'register' : 'login')}
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
```

);
};