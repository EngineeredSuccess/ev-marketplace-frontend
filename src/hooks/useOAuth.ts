import { useState, useCallback } from 'react';
import { oauthService } from '@/services/oauthService';

export interface OAuthState {
  isLoading: boolean;
  error: string | null;
  message: string | null;
}

export const useOAuth = () => {
  const [state, setState] = useState<OAuthState>({
    isLoading: false,
    error: null,
    message: null
  });

  const signInWithGoogle = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null, message: null }));
    
    try {
      const result = await oauthService.signInWithGoogle();
      
      if (result.success) {
        setState(prev => ({ ...prev, message: result.message, isLoading: false }));
      } else {
        setState(prev => ({ ...prev, error: result.message, isLoading: false }));
      }
      
      return result;
    } catch (error) {
      const errorMessage = 'Błąd podczas logowania przez Google.';
      setState(prev => ({ ...prev, error: errorMessage, isLoading: false }));
      return { success: false, message: errorMessage };
    }
  }, []);

  const signInWithApple = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null, message: null }));
    
    try {
      const result = await oauthService.signInWithApple();
      
      if (result.success) {
        setState(prev => ({ ...prev, message: result.message, isLoading: false }));
      } else {
        setState(prev => ({ ...prev, error: result.message, isLoading: false }));
      }
      
      return result;
    } catch (error) {
      const errorMessage = 'Błąd podczas logowania przez Apple.';
      setState(prev => ({ ...prev, error: errorMessage, isLoading: false }));
      return { success: false, message: errorMessage };
    }
  }, []);

  const clearState = useCallback(() => {
    setState({
      isLoading: false,
      error: null,
      message: null
    });
  }, []);

  return {
    ...state,
    signInWithGoogle,
    signInWithApple,
    clearState
  };
};