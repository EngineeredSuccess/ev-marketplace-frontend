'use client'

import React, { useState } from 'react'
import { X } from 'lucide-react'
import MagicLinkForm from './MagicLinkForm'
import OAuthButtons from './OAuthButtons'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'login' | 'register'
  onModeChange: (mode: 'login' | 'register') => void
}

export default function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSuccess = () => {
    // Magic link sent successfully - keep modal open to show success message
  }

  const handleOAuthError = (error: string) => {
    setError(error)
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '32px',
        width: '100%',
        maxWidth: '400px',
        position: 'relative',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            color: '#6b7280'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: '700', 
            color: '#1f2937', 
            marginBottom: '8px' 
          }}>
            {mode === 'login' ? 'Zaloguj się' : 'Utwórz konto'}
          </h2>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
            {mode === 'login' 
              ? 'Witaj ponownie! Zaloguj się do swojego konta.'
              : 'Dołącz do największego marketplace pojazdów elektrycznych w Polsce.'
            }
          </p>
        </div>

        {/* OAuth Buttons */}
        <div style={{ marginBottom: '24px' }}>
          <OAuthButtons onError={handleOAuthError} />
        </div>

        {/* Divider */}
        <div style={{
          position: 'relative',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '1px',
            backgroundColor: '#e5e7eb'
          }} />
          <span style={{
            backgroundColor: 'white',
            padding: '0 16px',
            color: '#6b7280',
            fontSize: '14px'
          }}>
            lub kontynuuj z emailem
          </span>
        </div>

        {/* Magic Link Form */}
        <div style={{ marginBottom: '24px' }}>
          <MagicLinkForm onSuccess={handleSuccess} />
        </div>

        {/* Global Error Display */}
        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '14px',
            marginBottom: '16px'
          }}>
            {error}
          </div>
        )}

        {/* Mode Toggle */}
        <div style={{ textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
          {mode === 'login' ? (
            <>
              Nie masz jeszcze konta?{' '}
              <button
                onClick={() => {
                  onModeChange('register')
                  clearError()
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#10b981',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontSize: '14px'
                }}
              >
                Zarejestruj się
              </button>
            </>
          ) : (
            <>
              Masz już konto?{' '}
              <button
                onClick={() => {
                  onModeChange('login')
                  clearError()
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#10b981',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontSize: '14px'
                }}
              >
                Zaloguj się
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}