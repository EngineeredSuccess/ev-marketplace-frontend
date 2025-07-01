import React from 'react';
import { User, Building } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { AccountTypeSelector } from './AccountTypeSelector';

export const RegistrationForm: React.FC = () => {
  const { authFormData, updateAuthFormData, completeRegistration, loading } = useAuth();

  const isFormValid = 
    authFormData.email &&
    authFormData.firstName &&
    authFormData.lastName &&
    authFormData.city &&
    authFormData.gdprConsent &&
    (!authFormData.isCompany || (authFormData.companyName && authFormData.nip));

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <User style={{ height: '48px', width: '48px', color: '#10b981', margin: '0 auto 16px' }} />
        <p style={{ color: '#6b7280' }}>
          Uzupełnij swoje dane, aby zakończyć rejestrację
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
            Email *
          </label>
          <input
            type="email"
            placeholder="twoj@email.com"
            value={authFormData.email}
            onChange={(e) => updateAuthFormData({ email: e.target.value })}
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              Imię *
            </label>
            <input
              type="text"
              placeholder="Jan"
              value={authFormData.firstName}
              onChange={(e) => updateAuthFormData({ firstName: e.target.value })}
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
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              Nazwisko *
            </label>
            <input
              type="text"
              placeholder="Kowalski"
              value={authFormData.lastName}
              onChange={(e) => updateAuthFormData({ lastName: e.target.value })}
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
        </div>

        <AccountTypeSelector />

        {authFormData.isCompany && (
          <>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Nazwa firmy *
              </label>
              <input
                type="text"
                placeholder="Nazwa Sp. z o.o."
                value={authFormData.companyName}
                onChange={(e) => updateAuthFormData({ companyName: e.target.value })}
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
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                NIP *
              </label>
              <input
                type="text"
                placeholder="1234567890"
                value={authFormData.nip}
                onChange={(e) => updateAuthFormData({ nip: e.target.value })}
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
          </>
        )}

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
            Miasto *
          </label>
          <input
            type="text"
            placeholder="Warszawa"
            value={authFormData.city}
            onChange={(e) => updateAuthFormData({ city: e.target.value })}
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

        {/* GDPR Compliance Section */}
        <div style={{
          padding: '16px',
          background: '#f8fafc',
          borderRadius: '12px',
          border: '2px solid #e5e7eb'
        }}>
          <h4 style={{ 
            fontSize: '14px', 
            fontWeight: '600', 
            color: '#374151', 
            marginBottom: '12px',
            margin: '0 0 12px 0'
          }}>
            Zgody na przetwarzanie danych osobowych (RODO)
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              cursor: 'pointer',
              fontSize: '13px',
              lineHeight: '1.4'
            }}>
              <input
                type="checkbox"
                checked={authFormData.gdprConsent}
                onChange={(e) => updateAuthFormData({ gdprConsent: e.target.checked })}
                style={{ 
                  marginRight: '8px', 
                  marginTop: '2px',
                  minWidth: '16px'
                }}
              />
              <span style={{ color: '#374151' }}>
                <strong>Wymagane:</strong> Wyrażam zgodę na przetwarzanie moich danych osobowych przez iVi Market w celu realizacji usług marketplace pojazdów elektrycznych zgodnie z Polityką Prywatności.
              </span>
            </label>
            
            <label style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              cursor: 'pointer',
              fontSize: '13px',
              lineHeight: '1.4'
            }}>
              <input
                type="checkbox"
                checked={authFormData.marketingConsent}
                onChange={(e) => updateAuthFormData({ marketingConsent: e.target.checked })}
                style={{ 
                  marginRight: '8px', 
                  marginTop: '2px',
                  minWidth: '16px'
                }}
              />
              <span style={{ color: '#6b7280' }}>
                Opcjonalne: Wyrażam zgodę na otrzymywanie informacji marketingowych o nowych ofertach i promocjach.
              </span>
            </label>
          </div>
        </div>
      </div>

      <button
        onClick={completeRegistration}
        disabled={loading || !isFormValid}
        style={{
          width: '100%',
          background: loading || !isFormValid ? '#9ca3af' : 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white',
          border: 'none',
          padding: '14px',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: loading || !isFormValid ? 'not-allowed' : 'pointer',
          marginTop: '24px'
        }}
      >
        {loading ? 'Rejestrowanie...' : 'Zakończ rejestrację'}
      </button>
    </div>
  );
};