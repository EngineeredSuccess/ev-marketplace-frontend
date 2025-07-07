import React from 'react';
import { Shield } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const CodeVerification: React.FC = () => {
  const { authFormData, updateAuthFormData, verifyCode, loading } = useAuth();

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <Shield style={{ height: '48px', width: '48px', color: '#10b981', margin: '0 auto 16px' }} />
        <p style={{ color: '#6b7280' }}>
          Wysłaliśmy kod weryfikacyjny na numer<br />
          <strong>{authFormData.phone}</strong>
        </p>
        <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>
          Demo: użyj kodu <strong>123456</strong>
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
          Kod weryfikacyjny
        </label>
        <input
          type="text"
          placeholder="123456"
          value={authFormData.verificationCode}
          onChange={(e) => updateAuthFormData({ verificationCode: e.target.value })}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '20px',
            outline: 'none',
            textAlign: 'center',
            letterSpacing: '0.2em'
          }}
        />
      </div>

      <button
        onClick={verifyCode}
        disabled={loading || !authFormData.verificationCode}
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
        {loading ? 'Weryfikowanie...' : 'Zweryfikuj kod'}
      </button>
    </div>
  );
};