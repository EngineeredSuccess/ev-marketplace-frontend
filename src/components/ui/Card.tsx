'use client'

import React from 'react'
import { components, colors, shadows } from '@/styles/design-system'

interface CardProps {
  children: React.ReactNode
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  style?: React.CSSProperties
}

const paddingStyles = {
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
}

export default function Card({
  children,
  hover = true,
  padding = 'md',
  className = '',
  onClick,
  style = {},
}: CardProps) {
  const cardStyle: React.CSSProperties = {
    ...components.card.base,
    padding: paddingStyles[padding],
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  }

  return (
    <div
      style={cardStyle}
      className={className}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (hover) {
          const target = e.target as HTMLDivElement
          target.style.boxShadow = shadows.md
          target.style.transform = 'translateY(-2px)'
        }
      }}
      onMouseLeave={(e) => {
        if (hover) {
          const target = e.target as HTMLDivElement
          target.style.boxShadow = shadows.base
          target.style.transform = 'translateY(0)'
        }
      }}
    >
      {children}
    </div>
  )
}