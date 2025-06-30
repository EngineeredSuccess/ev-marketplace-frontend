import React from ‘react’;
import { Shield } from ‘lucide-react’;

interface CodeVerificationProps {
phone: string;
code: string;
onCodeChange: (code: string) => void;
onVerifyCode: () => void;
onResendCode: () => void;
onBackToPhone: () => void;
loading: boolean;
canResendCode: boolean;
resendCountdown: number;
}

export const CodeVerification: React.FC<CodeVerificationProps> = ({
phone,
code,
onCodeChange,
onVerifyCode,
onResendCode,
onBackToPhone,
loading,
canResendCode,
resendCountdown
}) => {
const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const value = e.target.value.replace(/\D/g, ‘’);
onCodeChange(value);
};

const isValidCode = code.length === 6;

return (
<div>
<div style={{ textAlign: ‘center’, marginBottom: ‘24px’ }}>
<Shield style={{ height: ‘48px’, width: ‘48px’, color: ‘#10b981’, margin: ‘0 auto 16px’ }} />
<p style={{ color: ‘#6b7280’, lineHeight: ‘1.5’ }}>
Wysłaliśmy kod weryfikacyjny SMS na numer<br />
<strong>{phone}</strong>
</p>
<p style={{ fontSize: ‘12px’, color: ‘#9ca3af’, marginTop: ‘8px’ }}>
Kod ważny przez 5 minut
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
      Kod weryfikacyjny *
    </label>
    <input
      type="text"
      placeholder="000000"
      maxLength={6}
      value={code}
      onChange={handleCodeChange}
      style={{
        width: '100%',
        padding: '12px 16px',
        border: '2px solid #e5e7eb',
        borderRadius: '12px',
        fontSize: '20px',
        outline: 'none',
        textAlign: 'center',
        letterSpacing: '0.2em',
        fontWeight: '600'
      }}
      onFocus={(e) => e.target.style.borderColor = '#10b981'}
      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
    />
  </div>

  <button
    onClick={onVerifyCode}
    disabled={loading || !isValidCode}
    style={{
      width: '100%',
      background: loading || !isValidCode ? '#9ca3af' : 'linear-gradient(135deg, #10b981, #059669)',
      color: 'white',
      border: 'none',
      padding: '14px',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: loading || !isValidCode ? 'not-allowed' : 'pointer',
      marginBottom: '16px'
    }}
  >
    {loading ? 'Weryfikowanie...' : 'Zweryfikuj kod'}
  </button>

  <div style={{ textAlign: 'center' }}>
    {canResendCode ? (
      <button
        onClick={onResendCode}
        disabled={loading}
        style={{
          background: 'none',
          border: 'none',
          color: '#10b981',
          fontSize: '14px',
          cursor: 'pointer',
          textDecoration: 'underline'
        }}
      >
        Wyślij kod ponownie
      </button>
    ) : (
      <span style={{ color: '#6b7280', fontSize: '14px' }}>
        Wyślij ponownie za {resendCountdown}s
      </span>
    )}
  </div>

  <div style={{ textAlign: 'center', marginTop: '16px' }}>
    <button
      onClick={onBackToPhone}
      style={{
        background: 'none',
        border: 'none',
        color: '#6b7280',
        fontSize: '14px',
        cursor: 'pointer',
        textDecoration: 'underline'
      }}
    >
      Zmień numer telefonu
    </button>
  </div>
</div>
```

);
};