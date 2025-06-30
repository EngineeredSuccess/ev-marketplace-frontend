import React from ‘react’;
import { User, Building } from ‘lucide-react’;

interface AccountTypeSelectorProps {
isCompany: boolean;
onTypeChange: (isCompany: boolean) => void;
}

export const AccountTypeSelector: React.FC<AccountTypeSelectorProps> = ({
isCompany,
onTypeChange
}) => {
return (
<div>
<label style={{
display: ‘block’,
fontSize: ‘14px’,
fontWeight: ‘600’,
color: ‘#374151’,
marginBottom: ‘12px’
}}>
Typ konta *
</label>
<div style={{
display: ‘grid’,
gridTemplateColumns: ‘1fr 1fr’,
gap: ‘12px’
}}>
<button
type=“button”
onClick={() => onTypeChange(false)}
style={{
padding: ‘16px 12px’,
border: `2px solid ${!isCompany ? '#10b981' : '#e5e7eb'}`,
borderRadius: ‘12px’,
background: !isCompany ? ‘#f0fdf4’ : ‘white’,
cursor: ‘pointer’,
display: ‘flex’,
flexDirection: ‘column’,
alignItems: ‘center’,
gap: ‘8px’,
transition: ‘all 0.2s’
}}
>
<User size={24} style={{ color: !isCompany ? ‘#10b981’ : ‘#6b7280’ }} />
<span style={{
fontSize: ‘14px’,
fontWeight: ‘600’,
color: !isCompany ? ‘#10b981’ : ‘#6b7280’
}}>
Konto osobiste
</span>
<span style={{
fontSize: ‘12px’,
color: ‘#6b7280’,
textAlign: ‘center’
}}>
Dla osób prywatnych
</span>
</button>

```
    <button
      type="button"
      onClick={() => onTypeChange(true)}
      style={{
        padding: '16px 12px',
        border: `2px solid ${isCompany ? '#10b981' : '#e5e7eb'}`,
        borderRadius: '12px',
        background: isCompany ? '#f0fdf4' : 'white',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s'
      }}
    >
      <Building size={24} style={{ color: isCompany ? '#10b981' : '#6b7280' }} />
      <span style={{ 
        fontSize: '14px', 
        fontWeight: '600', 
        color: isCompany ? '#10b981' : '#6b7280' 
      }}>
        Konto firmowe
      </span>
      <span style={{ 
        fontSize: '12px', 
        color: '#6b7280',
        textAlign: 'center'
      }}>
        Dla firm i dealerów
      </span>
    </button>
  </div>
</div>
```

);
};