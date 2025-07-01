import React from 'react';
import { User, Building } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const AccountTypeSelector: React.FC = () => {
  const { authFormData, updateAuthFormData } = useAuth();

  return (
    <div>
      <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
        Typ konta *
      </label>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '12px',
        padding: '12px',
        border: '2px solid #e5e7eb',
        borderRadius: '12px',
        background: '#f9fafb'
      }}>
        <label style={{ 
          display: 'flex', 
          alignItems: 'center', 
          cursor: 'pointer',
          padding: '8px 12px',
          borderRadius: '8px',
          background: !authFormData.isCompany ? '#10b981' : 'transparent',
          color: !authFormData.isCompany ? 'white' : '#374151',
          transition: 'all 0.2s'
        }}>
          <input
            type="radio"
            name="accountType"
            checked={!authFormData.isCompany}
            onChange={() => updateAuthFormData({ 
              isCompany: false, 
              companyName: '', 
              nip: '' 
            })}
            style={{ marginRight: '8px' }}
          />
          <User size={16} style={{ marginRight: '6px' }} />
          Konto osobiste
        </label>
        <label style={{ 
          display: 'flex', 
          alignItems: 'center', 
          cursor: 'pointer',
          padding: '8px 12px',
          borderRadius: '8px',
          background: authFormData.isCompany ? '#10b981' : 'transparent',
          color: authFormData.isCompany ? 'white' : '#374151',
          transition: 'all 0.2s'
        }}>
          <input
            type="radio"
            name="accountType"
            checked={authFormData.isCompany}
            onChange={() => updateAuthFormData({ isCompany: true })}
            style={{ marginRight: '8px' }}
          />
          <Building size={16} style={{ marginRight: '6px' }} />
          Konto firmowe
        </label>
      </div>
    </div>
  );
};