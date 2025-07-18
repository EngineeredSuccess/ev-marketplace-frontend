'use client'

import React, { useState, useEffect } from 'react'
import { User, Building } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { authService } from '@/services/authService'

interface FormData {
  email: string
  firstName: string
  lastName: string
  city: string
  postalCode: string
  street: string
  isCompany: boolean
  companyName: string
  nip: string
  gdprConsent: boolean
}

interface RegistrationFormProps {
  phone?: string
  onRegistrationComplete: () => void
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  phone,
  onRegistrationComplete
}) => {
  const { refreshProfile, user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    city: '',
    postalCode: '',
    street: '',
    isCompany: false,
    companyName: '',
    nip: '',
    gdprConsent: false
  })

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  // Determine auth provider based on user data
  const getAuthProvider = (): string => {
    if (!user) return 'email'
    
    // Check if user has OAuth identities
    if (user.identities && user.identities.length > 0) {
      const oauthIdentity = user.identities.find(identity => 
        identity.provider === 'google' || identity.provider === 'apple'
      )
      if (oauthIdentity) {
        return oauthIdentity.provider
      }
    }
    
    // Default to email if no OAuth provider found
    return 'email'
  }

  // Pre-fill email from authenticated user
  useEffect(() => {
    if (user?.email && !formData.email) {
      setFormData(prev => ({ ...prev, email: user.email || '' }))
    }
  }, [user, formData.email])

  const isFormValid =
    formData.email &&
    formData.firstName &&
    formData.lastName &&
    formData.city &&
    formData.gdprConsent &&
    (!formData.isCompany || (formData.companyName && formData.nip))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isFormValid) return

    setLoading(true)
    setError(null)

    try {
      // Create user profile in Supabase
      await authService.createUserProfile({
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        is_company: formData.isCompany,
        street: formData.street || '',
        city: formData.city,
        postal_code: formData.postalCode || '',
        country: 'Poland',
        company_name: formData.isCompany ? formData.companyName : undefined,
        nip: formData.isCompany ? formData.nip : undefined,
        auth_provider: getAuthProvider()
      })

      // Refresh the user profile in context
      await refreshProfile()
      
      // Call completion callback
      onRegistrationComplete()
      
    } catch (err: any) {
      console.error('Registration error:', err)
      setError(err.message || 'Błąd podczas rejestracji. Spróbuj ponownie.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <User style={{ height: '48px', width: '48px', color: '#10b981', margin: '0 auto 16px' }} />
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>
          Uzupełnij swoje dane
        </h2>
        <p style={{ color: '#6b7280' }}>
          {phone ? `Aby zakończyć rejestrację dla numeru ${phone}` : 'Aby zakończyć rejestrację'}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Email Field */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              Email *
            </label>
            <input
              type="email"
              placeholder="twoj@email.com"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '14px',
                outline: 'none'
              }}
              required
            />
          </div>

          {/* Name Fields */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Imię *
              </label>
              <input
                type="text"
                placeholder="Jan"
                value={formData.firstName}
                onChange={(e) => updateFormData({ firstName: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Nazwisko *
              </label>
              <input
                type="text"
                placeholder="Kowalski"
                value={formData.lastName}
                onChange={(e) => updateFormData({ lastName: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                required
              />
            </div>
          </div>

          {/* Account Type Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              Typ konta
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => updateFormData({ isCompany: false, companyName: '', nip: '' })}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: `2px solid ${!formData.isCompany ? '#10b981' : '#e5e7eb'}`,
                  borderRadius: '12px',
                  backgroundColor: !formData.isCompany ? '#f0fdf4' : 'white',
                  color: !formData.isCompany ? '#10b981' : '#374151',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <User size={20} />
                Osoba prywatna
              </button>
              <button
                type="button"
                onClick={() => updateFormData({ isCompany: true })}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: `2px solid ${formData.isCompany ? '#10b981' : '#e5e7eb'}`,
                  borderRadius: '12px',
                  backgroundColor: formData.isCompany ? '#f0fdf4' : 'white',
                  color: formData.isCompany ? '#10b981' : '#374151',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <Building size={20} />
                Firma
              </button>
            </div>
          </div>

          {/* Company Fields (if company selected) */}
          {formData.isCompany && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  Nazwa firmy *
                </label>
                <input
                  type="text"
                  placeholder="Nazwa Twojej firmy"
                  value={formData.companyName}
                  onChange={(e) => updateFormData({ companyName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  required={formData.isCompany}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  NIP *
                </label>
                <input
                  type="text"
                  placeholder="1234567890"
                  value={formData.nip}
                  onChange={(e) => updateFormData({ nip: e.target.value.replace(/\D/g, '') })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  maxLength={10}
                  required={formData.isCompany}
                />
              </div>
            </div>
          )}

          {/* Location Fields */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Miasto *
              </label>
              <input
                type="text"
                placeholder="Warszawa"
                value={formData.city}
                onChange={(e) => updateFormData({ city: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Kod pocztowy
              </label>
              <input
                type="text"
                placeholder="00-000"
                value={formData.postalCode}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '')
                  if (value.length > 2) {
                    value = value.slice(0, 2) + '-' + value.slice(2, 5)
                  }
                  updateFormData({ postalCode: value })
                }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                maxLength={6}
              />
            </div>
          </div>

          {/* Street Field */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              Ulica
            </label>
            <input
              type="text"
              placeholder="ul. Przykładowa 123"
              value={formData.street}
              onChange={(e) => updateFormData({ street: e.target.value })}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          {/* GDPR Consent */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="checkbox"
              id="gdpr"
              checked={formData.gdprConsent}
              onChange={(e) => updateFormData({ gdprConsent: e.target.checked })}
              style={{ width: '16px', height: '16px' }}
              required
            />
            <label htmlFor="gdpr" style={{ fontSize: '14px', color: '#374151' }}>
              Akceptuję regulamin i politykę prywatności *
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{ 
              color: '#ef4444', 
              backgroundColor: '#fef2f2', 
              padding: '12px', 
              borderRadius: '8px', 
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || loading}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: isFormValid && !loading ? '#10b981' : '#d1d5db',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isFormValid && !loading ? 'pointer' : 'not-allowed'
            }}
          >
            {loading ? 'Rejestrowanie...' : 'Zakończ rejestrację'}
          </button>
        </div>
      </form>
    </div>
  )
}