// components/auth/AuthModal.tsx
import React from ‘react’;
import { X } from ‘lucide-react’;
import PhoneVerification from ‘./PhoneVerification’;
import CodeVerification from ‘./CodeVerification’;  
import RegistrationForm from ‘./RegistrationForm’;
import { AuthFormData, AuthMode, PhoneVerificationStep } from ‘../../types/Auth’;

interface AuthModalProps {
showAuthModal: boolean;
setShowAuthModal: (show: boolean) => void;
authMode: AuthMode;
setAuthMode: (mode: AuthMode) => void;
phoneVerificationStep: PhoneVerificationStep;
setPhoneVerificationStep: (step: PhoneVerificationStep) => void;
authFormData: AuthFormData;
setAuthFormData: (data: AuthFormData) => void;
loading: boolean;
onSendVerificationCode: () => void;
onVerifyCode: () => void;
onCompleteRegistration: () => void;
onTrackAuthEvent: (action: string, method?: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
showAuthModal,
setShowAuthModal,
authMode,
setAuthMode,
phoneVerificationStep,
setPhoneVerificationStep,
authFormData,
setAuthFormData,
loading,
onSendVerificationCode,
onVerifyCode,
onCompleteRegistration,
onTrackAuthEvent
}) => {
if (!showAuthModal) return null;

const handleClose = () => {
setShowAuthModal(false);
setPhoneVerificationStep(‘phone’);
};

const getModalTitle = () => {
switch (phoneVerificationStep) {
case ‘phone’:
return authMode === ‘login’ ? ‘Zaloguj się’ : ‘Zarejestruj się’;
case ‘code’:
return ‘Weryfikacja kodu’;
case ‘details’:
return ‘Uzupełnij dane’;
default:
return ‘Uwierzytelnianie’;
}
};

const renderCurrentStep = () => {
switch (phoneVerificationStep) {
case ‘phone’:
return (
<PhoneVerification
authMode={authMode}
setAuthMode={setAuthMode}
authFormData={authFormData}
setAuthFormData={setAuthFormData}
loading={loading}
onSendVerificationCode={onSendVerificationCode}
onTrackAuthEvent={onTrackAuthEvent}
/>
);
case ‘code’:
return (
<CodeVerification
phone={authFormData.phone}
verificationCode={authFormData.verificationCode}
setVerificationCode={(code) =>
setAuthFormData({…authFormData, verificationCode: code})
}
loading={loading}
onVerifyCode={onVerifyCode}
onBackToPhone={() => setPhoneVerificationStep(‘phone’)}
onTrackAuthEvent={onTrackAuthEvent}
/>
);
case ‘details’:
return authMode === ‘register’ ? (
<RegistrationForm
authFormData={authFormData}
setAuthFormData={setAuthFormData}
loading={loading}
onCompleteRegistration={onCompleteRegistration}
onTrackAuthEvent={onTrackAuthEvent}
/>
) : null;
default:
return null;
}
};

return (
<div style={{
position: ‘fixed’,
top: 0,
left: 0,
right: 0,
bottom: 0,
background: ‘rgba(0, 0, 0, 0.5)’,
display: ‘flex’,
alignItems: ‘center’,
justifyContent: ‘center’,
zIndex: 1000,
backdropFilter: ‘blur(5px)’
}}>
<div style={{
background: ‘white’,
borderRadius: ‘20px’,
padding: ‘32px’,
maxWidth: ‘500px’,
width: ‘90%’,
maxHeight: ‘90vh’,
overflowY: ‘auto’,
boxShadow: ‘0 20px 40px rgba(0, 0, 0, 0.15)’
}}>
{/* Modal Header */}
<div style={{
display: ‘flex’,
justifyContent: ‘space-between’,
alignItems: ‘center’,
marginBottom: ‘24px’
}}>
<h2 style={{
fontSize: ‘24px’,
fontWeight: ‘800’,
color: ‘#1f2937’,
margin: 0
}}>
{getModalTitle()}
</h2>
<button
onClick={handleClose}
style={{
background: ‘none’,
border: ‘none’,
fontSize: ‘24px’,
cursor: ‘pointer’,
color: ‘#6b7280’,
padding: ‘4px’,
borderRadius: ‘8px’,
display: ‘flex’,
alignItems: ‘center’,
justifyContent: ‘center’
}}
onMouseEnter={(e) => {
e.currentTarget.style.background = ‘#f3f4f6’;
}}
onMouseLeave={(e) => {
e.currentTarget.style.background = ‘none’;
}}
>
<X style={{ height: ‘24px’, width: ‘24px’ }} />
</button>
</div>

```
    {/* Modal Content */}
    <div style={{ minHeight: '200px' }}>
      {renderCurrentStep()}
    </div>

    {/* Progress Indicator */}
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '8px',
      marginTop: '24px',
      paddingTop: '16px',
      borderTop: '1px solid #e5e7eb'
    }}>
      {['phone', 'code', authMode === 'register' ? 'details' : null].filter(Boolean).map((step, index) => (
        <div
          key={step}
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: phoneVerificationStep === step || 
                      (phoneVerificationStep === 'details' && step === 'code' && authMode === 'register') ||
                      (phoneVerificationStep === 'code' && step === 'phone')
              ? '#10b981' 
              : '#e5e7eb',
            transition: 'all 0.3s ease'
          }}
        />
      ))}
    </div>
  </div>
</div>
```

);
};

export default AuthModal;