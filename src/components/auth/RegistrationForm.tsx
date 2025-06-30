import React from ‘react’;
import { User, CheckCircle } from ‘lucide-react’;
import { AuthFormData, FormErrors } from ‘../../types/User’;
import { AccountTypeSelector } from ‘./AccountTypeSelector’;
import { formatPostalCode, formatNIP } from ‘../../utils/phoneFormatter’;

interface RegistrationFormProps {
formData: AuthFormData;
errors: FormErrors;
onFieldChange: (field: keyof AuthFormData, value: any) => void;
onSubmit: () => void;
onPrivacyClick: () => void;
loading: boolean;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
formData,
errors,
onFieldChange,
onSubmit,
onPrivacyClick,
loading
}) => {
const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const formatted = formatPostalCode(e.target.value);
onFieldChange(‘postalCode’, formatted);
};

const handleNIPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const formatted = formatNIP(e.target.value);
onFieldChange(‘nip’, formatted);
};

return (
<div>
<div style={{ textAlign: ‘center’, marginBottom: ‘24px’ }}>
<User style={{ height: ‘48px’, width: ‘48px’, color: ‘#10b981’, margin: ‘0 auto 16px’ }} />
<p style={{ color: ‘#6b7280’, lineHeight: ‘1.5’ }}>
Uzupełnij swoje dane, aby zakończyć rejestrację
</p>
</div>

```
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    {/* Account Type Selection */}
    <AccountTypeSelector
      isCompany={formData.isCompany}
      onTypeChange={(isCompany) => onFieldChange('isCompany', isCompany)}
    />

    {/* Email */}
    <div>
      <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
        Email *
      </label>
      <input
        type="email"
        placeholder="twoj@email.com"
        value={formData.email}
        onChange={(e) => onFieldChange('email', e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px',
          border: `2px solid ${errors.email ? '#ef4444' : '#e5e7eb'}`,
          borderRadius: '12px',
          fontSize: '14px',
          outline: 'none'
        }}
      />
      {errors.email && (
        <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
          {errors.email}
        </div>
      )}
    </div>

    {/* Name fields */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
          Imię *
        </label>
        <input
          type="text"
          placeholder="Jan"
          value={formData.firstName}
          onChange={(e) => onFieldChange('firstName', e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: `2px solid ${errors.firstName ? '#ef4444' : '#e5e7eb'}`,
            borderRadius: '12px',
            fontSize: '14px',
            outline: 'none'
          }}
        />
        {errors.firstName && (
          <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
            {errors.firstName}
          </div>
        )}
      </div>
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
          Nazwisko *
        </label>
        <input
          type="text"
          placeholder="Kowalski"
          value={formData.lastName}
          onChange={(e) => onFieldChange('lastName', e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: `2px solid ${errors.lastName ? '#ef4444' : '#e5e7eb'}`,
            borderRadius: '12px',
            fontSize: '14px',
            outline: 'none'
          }}
        />
        {errors.lastName && (
          <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
            {errors.lastName}
          </div>
        )}
      </div>
    </div>

    {/* Company fields */}
    {formData.isCompany && (
      <>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
            Nazwa firmy *
          </label>
          <input
            type="text"
            placeholder="Auto Salon Sp. z o.o."
            value={formData.companyName}
            onChange={(e) => onFieldChange('companyName', e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `2px solid ${errors.companyName ? '#ef4444' : '#e5e7eb'}`,
              borderRadius: '12px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          {errors.companyName && (
            <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
              {errors.companyName}
            </div>
          )}
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
            NIP *
          </label>
          <input
            type="text"
            placeholder="1234567890"
            value={formData.nip}
            onChange={handleNIPChange}
            maxLength={10}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `2px solid ${errors.nip ? '#ef4444' : '#e5e7eb'}`,
              borderRadius: '12px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          {errors.nip && (
            <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
              {errors.nip}
            </div>
          )}
        </div>
      </>
    )}

    {/* Address */}
    <div>
      <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
        Miasto *
      </label>
      <input
        type="text"
        placeholder="Warszawa"
        value={formData.city}
        onChange={(e) => onFieldChange('city', e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px',
          border: `2px solid ${errors.city ? '#ef4444' : '#e5e7eb'}`,
          borderRadius: '12px',
          fontSize: '14px',
          outline: 'none'
        }}
      />
      {errors.city && (
        <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
          {errors.city}
        </div>
      )}
    </div>

    {/* Optional address fields */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
          Kod pocztowy
        </label>
        <input
          type="text"
          placeholder="00-001"
          value={formData.postalCode}
          onChange={handlePostalCodeChange}
          maxLength={6}
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
          Ulica i numer
        </label>
        <input
          type="text"
          placeholder="ul. Marszałkowska 1"
          value={formData.street}
          onChange={(e) => onFieldChange('street', e.target.value)}
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

    {/* GDPR Compliance */}
    <div style={{
      padding: '20px',
      background: '#f8fafc',
      borderRadius: '12px',
      border: `2px solid ${errors.gdprConsent ? '#ef4444' : '#e5e7eb'}`
    }}>
      <h4 style={{ 
        fontSize: '14px', 
        fontWeight: '600', 
        color: '#374151', 
        marginBottom: '16px',
        margin: '0 0 16px 0'
      }}>
        Zgody na przetwarzanie danych (RODO)
      </h4>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <label style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          cursor: 'pointer',
          fontSize: '13px',
          lineHeight: '1.4'
        }}>
          <input
            type="checkbox"
            checked={formData.gdprConsent}
            onChange={(e) => onFieldChange('gdprConsent', e.target.checked)}
            style={{ 
              marginRight: '12px', 
              marginTop: '2px',
              minWidth: '16px',
              accentColor: '#10b981'
            }}
          />
          <span style={{ color: '#374151' }}>
            <strong>Wymagane:</strong> Wyrażam zgodę na przetwarzanie moich danych osobowych przez iVi Market w celu realizacji usług marketplace pojazdów elektrycznych zgodnie z{' '}
            <button
              type="button"
              onClick={onPrivacyClick}
              style={{
                background: 'none',
                border: 'none',
                color: '#10b981',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '13px',
                padding: '0'
              }}
            >
              Polityką Prywatności
            </button>
            .
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
            checked={formData.marketingConsent}
            onChange={(e) => onFieldChange('marketingConsent', e.target.checked)}
            style={{ 
              marginRight: '12px', 
              marginTop: '2px',
              minWidth: '16px',
              accentColor: '#10b981'
            }}
          />
          <span style={{ color: '#6b7280' }}>
            Opcjonalne: Wyrażam zgodę na otrzymywanie informacji marketingowych o nowych ofertach i promocjach oraz newsletter z branży EV.
          </span>
        </label>
      </div>
      
      {errors.gdprConsent && (
        <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '8px' }}>
          {errors.gdprConsent}
        </div>
      )}
    </div>
  </div>

  <button
    onClick={onSubmit}
    disabled={loading}
    style={{
      width: '100%',
      background: loading ? '#9ca3af' : 'linear-gradient(135deg, #10b981, #059669)',
      color: 'white',
      border: 'none',
      padding: '16px',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: loading ? 'not-allowed' : 'pointer',
      marginTop: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    }}
  >
    {loading ? (
      <>
        <div style={{
          width: '16px',
          height: '16px',
          border: '2px solid rgba(255,255,255,0.3)',
          borderTopColor: 'white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        Rejestrowanie...
      </>
    ) : (
      <>
        <CheckCircle style={{ height: '18px', width: '18px' }} />
        Zakończ rejestrację
      </>
    )}
  </button>
</div>
```

);
};