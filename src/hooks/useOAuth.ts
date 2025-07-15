import { useState, useCallback } from 'react'
import { oauthService } from '@/services/oauthService'

export interface OAuthState {
  isLoading: boolean
  error: string | null
}

export const useOAuth = () => {
  const [state, setState] = useState<OAuthState>({
    isLoading: false,
    error: null
  })

  const signInWithGoogle = useCallback(async (): Promise<boolean> => {
    setState(prev => ({ 
      ...prev, 
      isLoading: true, 
      error: null 
    }))

    try {
      const result = await oauthService.signInWithGoogle()
      
      if (result.success) {
        // OAuth redirect will happen automatically
        return true
      } else {
        setState(prev => ({ 
          ...prev, 
          error: result.message, 
          isLoading: false 
        }))
        return false
      }
    } catch (error: any) {
      setState(prev => ({ 
        ...prev, 
        error: 'Błąd podczas logowania przez Google', 
        isLoading: false 
      }))
      return false
    }
  }, [])

  const signInWithApple = useCallback(async (): Promise<boolean> => {
    setState(prev => ({ 
      ...prev, 
      isLoading: true, 
      error: null 
    }))

    try {
      const result = await oauthService.signInWithApple()
      
      if (result.success) {
        // OAuth redirect will happen automatically
        return true
      } else {
        setState(prev => ({ 
          ...prev, 
          error: result.message, 
          isLoading: false 
        }))
        return false
      }
    } catch (error: any) {
      setState(prev => ({ 
        ...prev, 
        error: 'Błąd podczas logowania przez Apple', 
        isLoading: false 
      }))
      return false
    }
  }, [])

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
  }, [])

  return {
    ...state,
    signInWithGoogle,
    signInWithApple,
    clearError
  }
}