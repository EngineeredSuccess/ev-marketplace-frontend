'use client'

import React from 'react'
import { useOAuth } from '@/hooks/useOAuth'

interface OAuthButtonsProps {
  onError?: (error: string) => void
}

export default function OAuthButtons({ onError }: OAuthButtonsProps) {
  const { isLoading, error, signInWithGoogle, signInWithApple, clearError } = useOAuth()

  React.useEffect(() => {
    if (error && onError) {
      onError(error)
    }
  }, [error, onError])

  const handleGoogleSignIn = async () => {
    clearError()
    await signInWithGoogle()
  }

  const handleAppleSignIn = async () => {
    clearError()
    await signInWithApple()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Google OAuth Button */}
      <button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        style={{
          width: '100%',
          background: 'white',
          border: '2px solid #e5e7eb',
          color: '#374151',
          padding: '12px 16px',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          transition: 'all 0.2s',
          opacity: isLoading ? 0.6 : 1
        }}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.currentTarget.style.borderColor = '#10b981'
            e.currentTarget.style.backgroundColor = '#f9fafb'
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading) {
            e.currentTarget.style.borderColor = '#e5e7eb'
            e.currentTarget.style.backgroundColor = 'white'
          }
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Kontynuuj z Google
      </button>

      {/* Apple OAuth Button */}
      <button
        onClick={handleAppleSignIn}
        disabled={isLoading}
        style={{
          width: '100%',
          background: '#000000',
          border: '2px solid #000000',
          color: 'white',
          padding: '12px 16px',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          transition: 'all 0.2s',
          opacity: isLoading ? 0.6 : 1
        }}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.currentTarget.style.backgroundColor = '#1f2937'
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading) {
            e.currentTarget.style.backgroundColor = '#000000'
          }
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
        </svg>
        Kontynuuj z Apple
      </button>
    </div>
  )
}