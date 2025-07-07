import { useState, useCallback, useRef } from 'react';
import { smsService } from '../services/smsService';

export interface SMSVerificationState {
  isCodeSent: boolean;
  isVerifying: boolean;
  isSending: boolean;
  error: string | null;
  canResend: boolean;
  timeUntilResend: number;
}

export const useSMSVerification = () => {
  const [state, setState] = useState<SMSVerificationState>({
    isCodeSent: false,
    isVerifying: false,
    isSending: false,
    error: null,
    canResend: false,
    timeUntilResend: 0
  });

  const resendTimerRef = useRef<NodeJS.Timeout | null>(null);
  const resendCountdownRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimers = useCallback(() => {
    if (resendTimerRef.current) {
      clearTimeout(resendTimerRef.current);
      resendTimerRef.current = null;
    }
    if (resendCountdownRef.current) {
      clearInterval(resendCountdownRef.current);
      resendCountdownRef.current = null;
    }
  }, []);

  const startResendTimer = useCallback(() => {
    const RESEND_DELAY = 60; // 60 seconds
    
    setState(prev => ({ 
      ...prev, 
      canResend: false, 
      timeUntilResend: RESEND_DELAY 
    }));

    // Countdown timer
    resendCountdownRef.current = setInterval(() => {
      setState(prev => {
        const newTime = prev.timeUntilResend - 1;
        if (newTime <= 0) {
          if (resendCountdownRef.current) {
            clearInterval(resendCountdownRef.current);
            resendCountdownRef.current = null;
          }
          return { ...prev, canResend: true, timeUntilResend: 0 };
        }
        return { ...prev, timeUntilResend: newTime };
      });
    }, 1000);
  }, []);

  const sendCode = useCallback(async (phoneNumber: string): Promise<boolean> => {
    setState(prev => ({ 
      ...prev, 
      isSending: true, 
      error: null 
    }));

    try {
      const result = await smsService.sendVerificationCode(phoneNumber);
      
      if (result.success) {
        setState(prev => ({ 
          ...prev, 
          isCodeSent: true, 
          isSending: false 
        }));
        startResendTimer();
        return true;
      } else {
        setState(prev => ({ 
          ...prev, 
          error: result.message, 
          isSending: false 
        }));
        return false;
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Błąd podczas wysyłania kodu SMS', 
        isSending: false 
      }));
      return false;
    }
  }, [startResendTimer]);

  const verifyCode = useCallback(async (phoneNumber: string, code: string): Promise<boolean> => {
    setState(prev => ({ 
      ...prev, 
      isVerifying: true, 
      error: null 
    }));

    try {
      const result = await smsService.verifyCode(phoneNumber, code);
      
      setState(prev => ({ 
        ...prev, 
        isVerifying: false 
      }));

      if (result.success && result.isValid) {
        return true;
      } else {
        setState(prev => ({ 
          ...prev, 
          error: result.message 
        }));
        return false;
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Błąd podczas weryfikacji kodu', 
        isVerifying: false 
      }));
      return false;
    }
  }, []);

  const resendCode = useCallback(async (phoneNumber: string): Promise<boolean> => {
    if (!state.canResend) {
      return false;
    }

    setState(prev => ({ 
      ...prev, 
      isSending: true, 
      error: null 
    }));

    try {
      const result = await smsService.resendVerificationCode(phoneNumber);
      
      if (result.success) {
        setState(prev => ({ 
          ...prev, 
          isSending: false 
        }));
        startResendTimer();
        return true;
      } else {
        setState(prev => ({ 
          ...prev, 
          error: result.message, 
          isSending: false 
        }));
        return false;
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Błąd podczas ponownego wysyłania kodu', 
        isSending: false 
      }));
      return false;
    }
  }, [state.canResend, startResendTimer]);

  const reset = useCallback(() => {
    clearTimers();
    setState({
      isCodeSent: false,
      isVerifying: false,
      isSending: false,
      error: null,
      canResend: false,
      timeUntilResend: 0
    });
  }, [clearTimers]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Cleanup on unmount
  const cleanup = useCallback(() => {
    clearTimers();
  }, [clearTimers]);

  return {
    ...state,
    sendCode,
    verifyCode,
    resendCode,
    reset,
    clearError,
    cleanup
  };
};