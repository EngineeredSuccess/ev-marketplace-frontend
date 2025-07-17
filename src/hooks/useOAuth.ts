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
      console.log('Starting Google OAuth flow...')
      const result = await oauthService.signInWithGoogle()
      
      if (result.success) {
        console.log('OAuth initiated successfully')
        // Keep loading state as redirect will happen
        // Don't set loading to false here as the page will redirect
        return true
      } else {
        console.error('OAuth failed:', result.message)
        setState(prev => ({
          ...prev,
          error: `Google OAuth failed: ${result.message}`,
          isLoading: false
        }))
        return false
      }
    } catch (error: any) {
      console.error('OAuth hook error:', error)
      setState(prev => ({
        ...prev,
        error: `Błąd podczas logowania przez Google: ${error.message}`,
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