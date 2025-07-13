'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Home, Menu, Search, Share2, X } from 'lucide-react'

interface BlogNavigationProps {
  showBackButton?: boolean
  showSearchIcon?: boolean
  showShareIcon?: boolean
  title?: string
  onMenuClick?: () => void
  onSearchClick?: () => void
  onShareClick?: () => void
}

const BlogNavigation: React.FC<BlogNavigationProps> = ({
  showBackButton = true,
  showSearchIcon = true,
  showShareIcon = false,
  title = 'Blog',
  onMenuClick,
  onSearchClick,
  onShareClick
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (onMenuClick) {
      onMenuClick()
    }
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}>
        <nav style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 clamp(16px, 4vw, 24px)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            height: '64px'
          }}>
            {/* Left Side - Back Button or Home */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {showBackButton ? (
                <Link
                  href="/blog"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: '500',
                    transition: 'all 0.2s',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                  className="nav-back-button"
                >
                  <ArrowLeft style={{ width: '16px', height: '16px', marginRight: '6px' }} />
                  <span className="nav-back-text">Powrót</span>
                </Link>
              ) : (
                <Link
                  href="/"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: '500',
                    transition: 'opacity 0.2s',
                    padding: '8px 12px',
                    borderRadius: '8px'
                  }}
                  className="nav-home-button"
                >
                  <Home style={{ width: '16px', height: '16px', marginRight: '6px' }} />
                  <span className="nav-home-text">IVI Market</span>
                </Link>
              )}
            </div>

            {/* Center - Brand */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                padding: '6px',
                marginRight: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src="/logo.svg"
                  alt="IVI Market Logo"
                  style={{
                    width: '20px',
                    height: '20px',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <span style={{
                fontSize: 'clamp(16px, 4vw, 20px)',
                fontWeight: '700',
                color: 'white',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}>
                IVI Market {title}
              </span>
            </div>

            {/* Right Side - Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {showSearchIcon && (
                <button
                  onClick={onSearchClick}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  className="nav-search-button"
                  aria-label="Szukaj"
                >
                  <Search style={{ width: '18px', height: '18px' }} />
                </button>
              )}
              
              {showShareIcon && (
                <button
                  onClick={onShareClick}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  className="nav-share-button"
                  aria-label="Udostępnij"
                >
                  <Share2 style={{ width: '18px', height: '18px' }} />
                </button>
              )}

              <button
                onClick={handleMenuClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                className="nav-menu-button"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <X style={{ width: '18px', height: '18px' }} />
                ) : (
                  <Menu style={{ width: '18px', height: '18px' }} />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 99
          }}>
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '16px 20px'
            }}>
              <nav style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    textDecoration: 'none',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '500',
                    transition: 'background 0.2s',
                    background: 'rgba(255,255,255,0.1)'
                  }}
                  className="mobile-menu-link"
                >
                  <Home style={{ width: '18px', height: '18px', marginRight: '12px' }} />
                  Strona główna
                </Link>
                <Link
                  href="/blog"
                  onClick={closeMobileMenu}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    textDecoration: 'none',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '500',
                    transition: 'background 0.2s',
                    background: 'rgba(255,255,255,0.1)'
                  }}
                  className="mobile-menu-link"
                >
                  📚 Blog
                </Link>
                <Link
                  href="/vehicles"
                  onClick={closeMobileMenu}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    textDecoration: 'none',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '500',
                    transition: 'background 0.2s',
                    background: 'rgba(255,255,255,0.1)'
                  }}
                  className="mobile-menu-link"
                >
                  🚗 Przeglądaj pojazdy
                </Link>
                <Link
                  href="/sell"
                  onClick={closeMobileMenu}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    textDecoration: 'none',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '500',
                    transition: 'background 0.2s',
                    background: 'rgba(255,255,255,0.1)'
                  }}
                  className="mobile-menu-link"
                >
                  💰 Sprzedaj pojazd
                </Link>
              </nav>
            </div>
          </div>
        )}

        {/* Responsive and Hover Styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .nav-back-button:hover,
            .nav-home-button:hover {
              background: rgba(255,255,255,0.1) !important;
              border-color: rgba(255,255,255,0.3) !important;
              transform: translateY(-1px) !important;
            }
            
            .nav-search-button:hover,
            .nav-share-button:hover,
            .nav-menu-button:hover {
              background: rgba(255,255,255,0.2) !important;
              border-color: rgba(255,255,255,0.4) !important;
              transform: translateY(-1px) !important;
            }
            
            .mobile-menu-link:hover {
              background: rgba(255,255,255,0.2) !important;
            }
            
            @media (max-width: 768px) {
              .nav-back-text,
              .nav-home-text {
                display: none;
              }
              
              .nav-back-button,
              .nav-home-button {
                width: 40px !important;
                height: 40px !important;
                padding: 0 !important;
                justify-content: center !important;
              }
              
              .nav-back-button span,
              .nav-home-button span {
                display: none !important;
              }
            }
            
            @media (max-width: 480px) {
              .nav-search-button {
                display: none !important;
              }
            }
          `
        }} />
      </header>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.3)',
            zIndex: 98
          }}
          onClick={closeMobileMenu}
        />
      )}
    </>
  )
}

export default BlogNavigation