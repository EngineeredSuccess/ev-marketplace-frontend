'use client'

import React, { useState } from 'react'
import { Mail, ArrowRight } from 'lucide-react'
import { useMagicLink } from '@/hooks/useMagicLink'

interface MagicLinkFormProps {
  onSuccess?: () => void
}

export default function MagicLinkForm({ onSuccess }: MagicLinkFormProps) {
  const [email, setEmail] = useState('')
  const { isSending, isLinkSent, error, sendMagicLink, clearError } = useMagicLink()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    const success = await sendMagicLink(email)
    if (success && onSuccess) {
      onSuccess()
    }
  }

  if (isLinkSent) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <Mail style={{ height: '48px', width: '48px', color: '#10b981', margin: '0 auto 16px' }} />
        <h3 style={{ color: '#1f2937', marginBottom: '8px' }}>Sprawdź swoją skrzynkę email</h3>
        <p style={{ color: '#6b7280', marginBottom: '16px' }}>
          Wysłaliśmy link logowania na adres:<br />
          <strong>{email}</strong>
        </p>
        <p style={{ fontSize: '14px', color: '#9ca3af' }}>
          Kliknij link w emailu, aby się zalogować
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
          Adres email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) clearError()
          }}
          placeholder="twoj@email.com"
          required
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => e.target.style.borderColor = '#10b981'}
          onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
        />
      </div>

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

      <button
        type="submit"
        disabled={isSending || !email}
        style={{
          width: '100%',
          background: isSending || !email ? '#9ca3af' : 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white',
          border: 'none',
          padding: '14px',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: isSending || !email ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'all 0.2s'
        }}
      >
        {isSending ? 'Wysyłanie...' : (
          <>
            Wyślij link logowania
            <ArrowRight size={16} />
          </>
        )}
      </button>
    </form>
  )
}