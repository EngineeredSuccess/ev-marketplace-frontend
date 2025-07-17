'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface OAuthHandlerProps {
  onAuthSuccess: (user: any) => void
  onAuthError: (error: string) => void
}

export default function OAuthHandler({ onAuthSuccess, onAuthError }: OAuthHandlerProps) {
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check for OAuth success in URL params
        const urlParams = new URLSearchParams(window.location.search)
        const authStatus = urlParams.get('auth')
        const errorStatus = urlParams.get('error')

        if (authStatus === 'oauth_success') {
          console.log('OAuth success detected in URL')
          
          // Try to get the current session
          const { data, error } = await supabase.auth.getSession()
          
          if (error) {
            console.error('Error getting session after OAuth:', error)
            onAuthError(`OAuth session error: ${error.message}`)
          } else if (data.session && data.session.user) {
            console.log('OAuth user authenticated:', data.session.user)
            onAuthSuccess(data.session.user)
            
            // Clean up URL params
            const newUrl = window.location.pathname
            window.history.replaceState({}, document.title, newUrl)
          } else {
            console.log('No session found after OAuth success')
            onAuthError('OAuth completed but no session found')
          }
        } else if (errorStatus) {
          const errorMessage = urlParams.get('message') || 'OAuth authentication failed'
          console.error('OAuth error from URL:', errorMessage)
          onAuthError(errorMessage)
          
          // Clean up URL params
          const newUrl = window.location.pathname
          window.history.replaceState({}, document.title, newUrl)
        } else {
          // Check if user is already authenticated
          const { data, error } = await supabase.auth.getSession()
          
          if (!error && data.session && data.session.user) {
            console.log('User already authenticated:', data.session.user)
            onAuthSuccess(data.session.user)
          }
        }
      } catch (error: any) {
        console.error('Auth check error:', error)
        onAuthError(`Authentication check failed: ${error.message}`)
      } finally {
        setIsChecking(false)
      }
    }

    checkAuthStatus()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: any, session: any) => {
        console.log('Auth state change:', event, session)
        
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('User signed in via auth state change:', session.user)
          onAuthSuccess(session.user)
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out')
          // Handle sign out if needed
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [onAuthSuccess, onAuthError])

  if (isChecking) {
    return (
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 9999
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '32px',
            height: '32px',
            border: '3px solid #e5e7eb',
            borderTop: '3px solid #10b981',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p style={{ color: '#6b7280', margin: 0 }}>
            Sprawdzanie stanu uwierzytelnienia...
          </p>
        </div>
        
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  return null
}