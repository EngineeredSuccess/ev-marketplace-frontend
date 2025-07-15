'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useOAuth } from '@/hooks/useOAuth';
import { useAuth } from '@/contexts/AuthContext';

export const OAuthButtons: React.FC = () => {
  const { isLoading, error, signInWithGoogle, signInWithApple } = useOAuth();
  const { signInWithGoogle: authSignInWithGoogle, signInWithApple: authSignInWithApple } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await authSignInWithGoogle();
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      await authSignInWithApple();
    } catch (error) {
      console.error('Apple sign in error:', error);
    }
  };

  return (
    <div>
      <div style={{ margin: '24px 0', textAlign: 'center', color: '#6b7280' }}>
        lub
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          style={{
            width: '100%',
            background: '#4285f4',
            color: 'white',
            border: 'none',
            padding: '12px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoading ? (
            <Loader2 style={{ height: '16px', width: '16px', animation: 'spin 1s linear infinite' }} />
          ) : (
            '🔍'
          )}
          Kontynuuj z Google
        </button>
        
        <button
          onClick={handleAppleSignIn}
          disabled={isLoading}
          style={{
            width: '100%',
            background: '#000000',
            color: 'white',
            border: 'none',
            padding: '12px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoading ? (
            <Loader2 style={{ height: '16px', width: '16px', animation: 'spin 1s linear infinite' }} />
          ) : (
            '🍎'
          )}
          Kontynuuj z Apple
        </button>
      </div>

      {error && (
        <div style={{ 
          color: '#ef4444', 
          backgroundColor: '#fef2f2', 
          padding: '12px', 
          borderRadius: '8px', 
          fontSize: '14px',
          marginTop: '16px'
        }}>
          {error}
        </div>
      )}
    </div>
  );
};