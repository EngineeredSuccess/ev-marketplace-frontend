'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Metadata } from 'next'
import AuthModal from '../../../components/auth/AuthModal'

export default function LoginPage() {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [mode, setMode] = useState<'login' | 'register'>('login')

  const handleClose = () => {
    setIsModalOpen(false)
    router.push('/')
  }

  const handleModeChange = (newMode: 'login' | 'register') => {
    setMode(newMode)
    if (newMode === 'register') {
      router.push('/auth/register')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <AuthModal 
        isOpen={isModalOpen}
        onClose={handleClose}
        mode={mode}
        onModeChange={handleModeChange}
      />
    </div>
  )
}