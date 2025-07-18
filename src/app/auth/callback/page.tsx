'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('Auth callback initiated...')
        console.log('Current URL:', window.location.href)
        console.log('URL params:', window.location.search)
        console.log('URL hash:', window.location.hash)
        
        // First, try to handle OAuth callback from URL (for tokens in hash)
        const { data: sessionData, error: sessionError } = await supabase.auth.getSessionFromUrl()
        console.log('Session from URL result:', { sessionData, sessionError })
        
        if (sessionError) {
          console.error('Session from URL error:', sessionError)
          router.push(`/?error=oauth_failed&message=${encodeURIComponent(sessionError.message)}`)
          return
        }

        if (sessionData.session && sessionData.session.user) {
          console.log('OAuth authentication successful from URL!')
          console.log('User data:', sessionData.session.user)
          
          // Store user data in localStorage for the main app
          localStorage.setItem('supabase_user', JSON.stringify(sessionData.session.user))
          localStorage.setItem('supabase_session', JSON.stringify(sessionData.session))
          
          // Redirect to home with success flag
          router.push('/?auth=oauth_success')
          return
        }

        // Fallback: try to get existing session
        const { data, error } = await supabase.auth.getSession()
        console.log('Fallback session result:', { data, error })
        
        if (error) {
          console.error('Session exchange error:', error)
          router.push(`/?error=oauth_failed&message=${encodeURIComponent(error.message)}`)
          return
        }

        if (data.session && data.session.user) {
          console.log('OAuth authentication successful from existing session!')
          console.log('User data:', data.session.user)
          
          // Store user data in localStorage for the main app
          localStorage.setItem('supabase_user', JSON.stringify(data.session.user))
          localStorage.setItem('supabase_session', JSON.stringify(data.session))
          
          // Redirect to home with success flag
          router.push('/?auth=oauth_success')
        } else {
          console.log('No session found after OAuth callback')
          // This might be a timing issue, let's try again after a short delay
          setTimeout(async () => {
            const { data: retryData, error: retryError } = await supabase.auth.getSession()
            if (retryData.session) {
              localStorage.setItem('supabase_user', JSON.stringify(retryData.session.user))
              localStorage.setItem('supabase_session', JSON.stringify(retryData.session))
              router.push('/?auth=oauth_success')
            } else {
              router.push('/?error=oauth_no_session')
            }
          }, 1000)
        }
      } catch (error: any) {
        console.error('Callback error:', error)
        router.push(`/?error=callback_failed&message=${encodeURIComponent(error.message)}`)
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f9fafb'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #e5e7eb',
          borderTop: '4px solid #10b981',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px'
        }} />
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Finalizowanie logowania...
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