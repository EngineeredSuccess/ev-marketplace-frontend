'use client'

import React from 'react'
import { colors, spacing, breakpoints, createMediaQuery } from '@/styles/design-system'

interface ResponsiveContainerProps {
  children: React.ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: keyof typeof spacing
  className?: string
}

const maxWidthMap = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  full: '100%'
}

export default function ResponsiveContainer({
  children,
  maxWidth = 'xl',
  padding = 4,
  className = ''
}: ResponsiveContainerProps) {
  const containerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: maxWidthMap[maxWidth],
    margin: '0 auto',
    padding: `0 ${spacing[padding]}`,
  }

  return (
    <div style={containerStyle} className={className}>
      {children}
    </div>
  )
}