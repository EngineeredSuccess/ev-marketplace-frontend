'use client'

import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function GoogleOAuthDebug() {
  const [logs, setLogs] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testGoogleOAuth = async () => {
    setIsLoading(true)
    setLogs([])
    
    try {
      addLog('Starting Google OAuth test...')
      
      // Check if we can access Supabase
      const { data: { session } } = await supabase.auth.getSession()
      addLog(`Current session: ${session ? 'Exists' : 'None'}`)
      
      // Try to initiate OAuth
      addLog('Attempting to initiate Google OAuth...')
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) {
        addLog(`OAuth Error: ${error.message}`)
        addLog(`Error details: ${JSON.stringify(error, null, 2)}`)
      } else {
        addLog('OAuth initiated successfully')
        addLog(`Response data: ${JSON.stringify(data, null, 2)}`)
        
        if (data?.url) {
          addLog(`Redirect URL: ${data.url}`)
          // Don't actually redirect in debug mode
          // window.location.href = data.url
        }
      }
    } catch (err: any) {
      addLog(`Catch Error: ${err.message}`)
      addLog(`Error stack: ${err.stack}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      width: '400px',
      maxHeight: '500px',
      backgroundColor: 'white',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      padding: '16px',
      zIndex: 9999,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 'bold' }}>
        Google OAuth Debug
      </h3>
      
      <button
        onClick={testGoogleOAuth}
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '8px 16px',
          backgroundColor: isLoading ? '#9ca3af' : '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          marginBottom: '16px'
        }}
      >
        {isLoading ? 'Testing...' : 'Test Google OAuth'}
      </button>

      <div style={{
        maxHeight: '300px',
        overflowY: 'auto',
        backgroundColor: '#f9fafb',
        padding: '8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontFamily: 'monospace'
      }}>
        {logs.length === 0 ? (
          <div style={{ color: '#6b7280' }}>Click "Test Google OAuth" to see debug logs...</div>
        ) : (
          logs.map((log, index) => (
            <div key={index} style={{ marginBottom: '4px', wordBreak: 'break-word' }}>
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  )
}