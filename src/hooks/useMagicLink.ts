import { useState, useCallback } from 'react';
import { magicLinkService } from '@/services/magicLinkService';

export interface MagicLinkState {
  isSending: boolean;
  isVerifying: boolean;
  error: string | null;
  message: string | null;
}

export const useMagicLink = () => {
  const [state, setState] = useState<MagicLinkState>({
    isSending: false,
    isVerifying: false,
    error: null,
    message: null
  });

  const sendMagicLink = useCallback(async (email: string) => {
    setState(prev => ({ ...prev, isSending: true, error: null, message: null }));
    
    try {
      const result = await magicLinkService.sendMagicLink(email);
      
      if (result.success) {
        setState(prev => ({ ...prev, message: result.message, isSending: false }));
      } else {
        setState(prev => ({ ...prev, error: result.message, isSending: false }));
      }
      
      return result;
    } catch (error) {
      const errorMessage = 'Błąd podczas wysyłania magic link. Spróbuj ponownie.';
      setState(prev => ({ ...prev, error: errorMessage, isSending: false }));
      return { success: false, message: errorMessage };
    }
  }, []);

  const verifyMagicLink = useCallback(async (token: string) => {
    setState(prev => ({ ...prev, isVerifying: true, error: null, message: null }));
    
    try {
      const result = await magicLinkService.verifyMagicLink(token);
      
      if (result.success) {
        setState(prev => ({ ...prev, message: result.message, isVerifying: false }));
      } else {
        setState(prev => ({ ...prev, error: result.message, isVerifying: false }));
      }
      
      return result;
    } catch (error) {
      const errorMessage = 'Błąd podczas weryfikacji magic link.';
      setState(prev => ({ ...prev, error: errorMessage, isVerifying: false }));
      return { success: false, message: errorMessage };
    }
  }, []);

  const clearState = useCallback(() => {
    setState({
      isSending: false,
      isVerifying: false,
      error: null,
      message: null
    });
  }, []);

  return {
    ...state,
    sendMagicLink,
    verifyMagicLink,
    clearState
  };
};