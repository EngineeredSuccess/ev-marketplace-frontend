import { useState, useCallback } from 'react'
import { magicLinkService } from '@/services/magicLinkService'

export interface MagicLinkState {
  isSending: boolean
  isLinkSent: boolean
  error: string | null
}

export const useMagicLink = () => {
  const [state, setState] = useState<MagicLinkState>({
    isSending: false,
    isLinkSent: false,
    error: null
  })

  const sendMagicLink = useCallback(async (email: string): Promise<boolean> => {
    setState(prev => ({ 
      ...prev, 
      isSending: true, 
      error: null 
    }))

    try {
      const result = await magicLinkService.sendMagicLink(email)
      
      if (result.success) {
        setState(prev => ({ 
          ...prev, 
          isLinkSent: true, 
          isSending: false 
        }))
        return true
      } else {
        setState(prev => ({ 
          ...prev, 
          error: result.message, 
          isSending: false 
        }))
        return false
      }
    } catch (error: any) {
      setState(prev => ({ 
        ...prev, 
        error: 'Błąd podczas wysyłania linku', 
        isSending: false 
      }))
      return false
    }
  }, [])

  const reset = useCallback(() => {
    setState({
      isSending: false,
      isLinkSent: false,
      error: null
    })
  }, [])

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
  }, [])

  return {
    ...state,
    sendMagicLink,
    reset,
    clearError
  }
}