'use client';

import React, { useState } from 'react';
import { Mail, Loader2 } from 'lucide-react';
import { useMagicLink } from '@/hooks/useMagicLink';

interface MagicLinkFormProps {
  onSuccess: (email: string) => void;
}

export const MagicLinkForm: React.FC<MagicLinkFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const { isSending, error, message, sendMagicLink } = useMagicLink();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    const result = await sendMagicLink(email);
    if (result.success) {
      onSuccess(email);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
      <Mail style={{ height: '48px', width: '48px', color: '#10b981', margin: '0 auto 16px' }} />
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#1f2937' }}>
        Wyślij Magic Link
      </h3>
      <p style={{ color: '#6b7280', marginBottom: '24px' }}>
        Wprowadź swój adres email, aby otrzymać link do logowania
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <input
            type="email"
            placeholder="twoj@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '14px',
              outline: 'none',
              background: 'white'
            }}
            required
            disabled={isSending}
          />
        </div>

        {error && (
          <div style={{ 
            color: '#ef4444', 
            backgroundColor: '#fef2f2', 
            padding: '12px', 
            borderRadius: '8px', 
            fontSize: '14px',
            marginBottom: '16px'
          }}>
            {error}
          </div>
        )}

        {message && (
          <div style={{ 
            color: '#10b981', 
            backgroundColor: '#f0fdf4', 
            padding: '12px', 
            borderRadius: '8px', 
            fontSize: '14px',
            marginBottom: '16px'
          }}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={!email || isSending}
          style={{
            width: '100%',
            background: !email || isSending ? '#9ca3af' : 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            border: 'none',
            padding: '14px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: !email || isSending ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          {isSending ? (
            <>
              <Loader2 style={{ height: '18px', width: '18px', animation: 'spin 1s linear infinite' }} />
              Wysyłanie...
            </>
          ) : (
            <>
              <Mail style={{ height: '18px', width: '18px' }} />
              Wyślij Magic Link
            </>
          )}
        </button>
      </form>
    </div>
  );
};