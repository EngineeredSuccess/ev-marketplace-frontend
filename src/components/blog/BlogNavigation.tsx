import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Home, Menu, Search, Share2 } from 'lucide-react'

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
  return (
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
                aria-label="Udostpnij"
              >
                <Share2 style={{ width: '18px', height: '18px' }} />
              </button>
            )}

            <button
              onClick={onMenuClick}
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
              <Menu style={{ width: '18px', height: '18px' }} />
            </button>
          </div>
        </div>
      </nav>

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
  )
}

export default BlogNavigation