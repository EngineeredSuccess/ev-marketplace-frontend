import { useState, useEffect, useCallback } from ‘react’;
import { SMSService } from ‘../services/smsService’;

export const useSMSVerification = () => {
const [generatedCode, setGeneratedCode] = useState(’’);
const [codeExpiresAt, setCodeExpiresAt] = useState<Date | null>(null);
const [canResendCode, setCanResendCode] = useState(false);
const [resendCountdown, setResendCountdown] = useState(0);
const [loading, setLoading] = useState(false);

// Countdown timer for code resend
useEffect(() => {
if (resendCountdown > 0) {
const timer = setTimeout(() => {
setResendCountdown(resendCountdown - 1);
}, 1000);
return () => clearTimeout(timer);
} else if (resendCountdown === 0 && generatedCode) {
setCanResendCode(true);
}
}, [resendCountdown, generatedCode]);

const sendCode = useCallback(async (phoneNumber: string) => {
setLoading(true);
try {
const response = await SMSService.sendVerificationCode(phoneNumber);

```
  if (response.success && response.code && response.expiresAt) {
    setGeneratedCode(response.code);
    setCodeExpiresAt(response.expiresAt);
    setCanResendCode(false);
    setResendCountdown(60);
    
    // Show demo alert in development
    alert(`Demo: Kod weryfikacyjny to ${response.code}`);
    
    return { success: true };
  } else {
    return { success: false, error: response.error };
  }
} catch (error) {
  return { success: false, error: 'Błąd wysyłania SMS' };
} finally {
  setLoading(false);
}
```

}, []);

const resendCode = useCallback(async (phoneNumber: string) => {
if (!canResendCode) return { success: false, error: ‘Poczekaj przed ponownym wysłaniem’ };

```
setLoading(true);
try {
  const response = await SMSService.sendVerificationCode(phoneNumber);
  
  if (response.success && response.code && response.expiresAt) {
    setGeneratedCode(response.code);
    setCodeExpiresAt(response.expiresAt);
    setCanResendCode(false);
    setResendCountdown(60);
    
    // Show demo alert in development
    alert(`Demo: Nowy kod weryfikacyjny to ${response.code}`);
    
    return { success: true };
  } else {
    return { success: false, error: response.error };
  }
} catch (error) {
  return { success: false, error: 'Błąd wysyłania SMS' };
} finally {
  setLoading(false);
}
```

}, [canResendCode]);

const verifyCode = useCallback((inputCode: string): { success: boolean; error?: string } => {
if (!inputCode.trim()) {
return { success: false, error: ‘Podaj kod weryfikacyjny’ };
}

```
if (codeExpiresAt && SMSService.isCodeExpired(codeExpiresAt)) {
  return { success: false, error: 'Kod weryfikacyjny wygasł. Poproś o nowy kod.' };
}

if (inputCode !== generatedCode) {
  return { success: false, error: 'Nieprawidłowy kod weryfikacyjny' };
}

return { success: true };
```

}, [generatedCode, codeExpiresAt]);

const reset = useCallback(() => {
setGeneratedCode(’’);
setCodeExpiresAt(null);
setCanResendCode(false);
setResendCountdown(0);
setLoading(false);
}, []);

return {
loading,
canResendCode,
resendCountdown,
sendCode,
resendCode,
verifyCode,
reset
};
};