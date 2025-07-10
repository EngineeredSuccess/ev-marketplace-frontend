'use client'

import React from 'react'
import { components, colors } from '@/styles/design-system'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

const sizeStyles = {
  sm: {
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
  },
  md: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
  },
  lg: {
    padding: '1rem 2rem',
    fontSize: '1.125rem',
  },
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  const baseStyle = components.button[variant]
  const sizeStyle = sizeStyles[size]

  const buttonStyle: React.CSSProperties = {
    ...baseStyle,
    ...sizeStyle,
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
  }

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick()
    }
  }

  return (
    <button
      type={type}
      style={buttonStyle}
      onClick={handleClick}
      disabled={disabled}
      className={className}
      onMouseEnter={(e) => {
        if (!disabled) {
          const target = e.target as HTMLButtonElement
          if (variant === 'primary') {
            target.style.backgroundColor = colors.primary[600]
          } else {
            target.style.backgroundColor = colors.primary[50]
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          const target = e.target as HTMLButtonElement
          if (variant === 'primary') {
            target.style.backgroundColor = colors.primary[500]
          } else {
            target.style.backgroundColor = colors.background.primary
          }
        }
      }}
    >
      {children}
    </button>
  )
}