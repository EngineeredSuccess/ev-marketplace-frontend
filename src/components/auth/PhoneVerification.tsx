'use client'

import React, { useState } from 'react'
import { Phone } from 'lucide-react'
import { smsService } from '@/services/smsService'

interface PhoneVerificationProps {
  authMode: 'login' | 'register'
  onAuthModeChange: (mode: 'login' | 'register') => void
  onVerificationComplete: (phone: string) => void
}

export const PhoneVerification: React.FC<PhoneVerificationProps> = ({
  authMode,
  onAuthModeChange,
  onVerificationComplete
}) => {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await smsService.sendVerificationCode(phone)
      
      if (result.success) {
        setStep('otp')
      } else {
        setError(result.message)
      }
    } catch (err: any) {
      setError(err.message || 'Błąd podczas wysyłania kodu')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await smsService.verifyCode(phone, otp)
      
      if (result.success && result.isValid) {
        onVerificationComplete(phone)
      } else {
        setError(result.message)
      }
    } catch (err: any) {
      setError(err.message || 'Błąd weryfikacji')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'phone') {
    return (
      <div>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Phone style={{ height: '48px', width: '48px', color: '#10b981', margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>
            {authMode === 'login' ? 'Podaj numer telefonu, aby się zalogować' : 'Podaj numer telefonu, aby rozpocząć rejestrację'}
          </h2>
        </div>

        <form onSubmit={handleSendOTP}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600' }}>
              Numer telefonu
            </label>
            <input
              type="tel"
              placeholder="+48 123 456 789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none'
              }}
              required
            />
          </div>

          {error && (
            <div style={{ 
              color: '#ef4444', 
              backgroundColor: '#fef2f2', 
              padding: '12px', 
              borderRadius: '8px', 
              marginBottom: '16px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !phone}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none'
            }}
          >
            {loading ? 'Wysyłanie...' : 'Wyślij kod weryfikacyjny'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button
              type="button"
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
        </form>
      </div>
    )
  }

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>
          Wprowadź kod weryfikacyjny
        </h2>
        <p style={{ color: '#6b7280' }}>
          Wysłaliśmy 6-cyfrowy kod na numer {phone}
        </p>
      </div>

      <form onSubmit={handleVerifyOTP}>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '24px',
              textAlign: 'center',
              letterSpacing: '8px',
              outline: 'none'
            }}
            maxLength={6}
            required
          />
        </div>

        {error && (
          <div style={{ 
            color: '#ef4444', 
            backgroundColor: '#fef2f2', 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || otp.length !== 6}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none'
          }}
        >
          {loading ? 'Weryfikowanie...' : 'Zweryfikuj kod'}
        </button>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <button
            type="button"
            onClick={() => setStep('phone')}
            style={{
              background: 'none',
              border: 'none',
              color: '#6b7280',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Zmień numer telefonu
          </button>
        </div>
      </form>
    </div>
  )
}