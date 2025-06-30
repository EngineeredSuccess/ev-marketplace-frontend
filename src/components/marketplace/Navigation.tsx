// components/marketplace/Navigation.tsx
import React, { useState } from ‘react’;
import {
Car,
User,
Building,
CheckCircle,
Shield,
Menu,
X,
Home,
Search as SearchIcon,
FileText,
Plus,
LogOut,
Settings,
Bell
} from ‘lucide-react’;
import { User as UserType } from ‘../../types/User’;

interface NavigationProps {
currentView: string;
setCurrentView: (view: string) => void;
isAuthenticated: boolean;
currentUser: UserType | null;
onAuthClick: (mode: ‘login’ | ‘register’) => void;
onLogout: () => void;
onSellClick: () => void;
className?: string;
}

const Navigation: React.FC<NavigationProps> = ({
currentView,
setCurrentView,
isAuthenticated,
currentUser,
onAuthClick,
onLogout,
onSellClick,
className = ‘’
}) => {
const [showMobileMenu, setShowMobileMenu] = useState(false);
const [showUserMenu, setShowUserMenu] = useState(false);

const navigationItems = [
{
id: ‘home’,
label: ‘Strona główna’,
icon: Home,
description: ‘Powrót do strony głównej’
},
{
id: ‘browse’,
label: ‘Przeglądaj pojazdy’,
icon: SearchIcon,
description: ‘Szukaj i przeglądaj oferty’
},
{
id: ‘blog’,
label: ‘Blog’,
icon: FileText,
description: ‘Artykuły i porady o EV’
},
{
id: ‘sell’,
label: ‘Sprzedaj pojazd’,
icon: Plus,
description: ‘Dodaj swoje ogłoszenie’,
requiresAuth: true
}
];

const handleNavClick = (itemId: string) => {
if (itemId === ‘sell’) {
onSellClick();
} else {
setCurrentView(itemId);
}
setShowMobileMenu(false);
};

const getUserDisplayName = () => {
if (!currentUser) return ‘’;
if (currentUser.isCompany) {
return currentUser.companyName || `${currentUser.firstName} ${currentUser.lastName}`;
}
return `${currentUser.firstName} ${currentUser.lastName}`;
};

return (
<nav className={className} style={{
background: ‘linear-gradient(135deg, #10b981 0%, #059669 100%)’,
backdropFilter: ‘blur(10px)’,
borderBottom: ‘1px solid rgba(255, 255, 255, 0.1)’,
position: ‘sticky’,
top: 0,
zIndex: 50
}}>
<div style={{ maxWidth: ‘1200px’, margin: ‘0 auto’, padding: ‘0 20px’ }}>
<div style={{
display: ‘flex’,
justifyContent: ‘space-between’,
alignItems: ‘center’,
padding: ‘16px 0’
}}>
{/* Logo and Brand */}
<div
style={{ display: ‘flex’, alignItems: ‘center’, cursor: ‘pointer’ }}
onClick={() => setCurrentView(‘home’)}
>
<div style={{
background: ‘rgba(255, 255, 255, 0.1)’,
borderRadius: ‘12px’,
padding: ‘8px’,
marginRight: ‘12px’,
display: ‘flex’,
alignItems: ‘center’,
justifyContent: ‘center’,
transition: ‘all 0.3s ease’
}}>
<Car style={{ height: ‘24px’, width: ‘24px’, color: ‘white’ }} />
</div>
<div>
<span style={{
fontSize: ‘24px’,
fontWeight: ‘bold’,
color: ‘white’,
textShadow: ‘0 2px 4px rgba(0,0,0,0.3)’,
lineHeight: ‘1’
}}>
iVi Market
</span>
<div style={{
fontSize: ‘10px’,
color: ‘rgba(255, 255, 255, 0.8)’,
fontWeight: ‘500’,
letterSpacing: ‘0.5px’
}}>
ELECTRIC VEHICLES
</div>
</div>
</div>

```
      {/* Desktop Navigation */}
      <div style={{ 
        display: 'flex', 
        gap: '8px',
        '@media (max-width: 768px)': { display: 'none' }
      }}>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              title={item.description}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: isActive 
                  ? 'rgba(255, 255, 255, 0.2)' 
                  : 'transparent',
                color: 'white',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <Icon style={{ height: '14px', width: '14px' }} />
              {item.label}
              {item.requiresAuth && !isAuthenticated && (
                <Shield style={{ height: '12px', width: '12px', opacity: 0.7 }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Auth Section */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {isAuthenticated && currentUser ? (
          <>
            {/* User Info - Desktop */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              color: 'white',
              fontSize: '14px',
              '@media (max-width: 768px)': { display: 'none' }
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {currentUser.isCompany ? 
                  <Building style={{ height: '16px', width: '16px' }} /> : 
                  <User style={{ height: '16px', width: '16px' }} />
                }
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  fontWeight: '600',
                  fontSize: '13px'
                }}>
                  {getUserDisplayName()}
                  {currentUser.isVerified && (
                    <CheckCircle style={{ height: '12px', width: '12px', color: '#fbbf24' }} />
                  )}
                </div>
                <div style={{ 
                  fontSize: '11px', 
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: '400'
                }}>
                  {currentUser.isCompany ? 'Konto firmowe' : 'Konto prywatne'}
                </div>
              </div>
            </div>

            {/* User Menu Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  padding: '8px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <Settings style={{ height: '16px', width: '16px' }} />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: '0',
                  marginTop: '8px',
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                  border: '1px solid #e5e7eb',
                  minWidth: '200px',
                  overflow: 'hidden',
                  zIndex: 100
                }}>
                  {/* User Info in Dropdown */}
                  <div style={{
                    padding: '16px',
                    borderBottom: '1px solid #e5e7eb',
                    background: '#f8fafc'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      marginBottom: '4px'
                    }}>
                      {currentUser.isCompany ? 
                        <Building style={{ height: '16px', width: '16px', color: '#10b981' }} /> : 
                        <User style={{ height: '16px', width: '16px', color: '#10b981' }} />
                      }
                      <span style={{ 
                        fontWeight: '600', 
                        color: '#1f2937',
                        fontSize: '14px'
                      }}>
                        {getUserDisplayName()}
                      </span>
                      {currentUser.isVerified && (
                        <CheckCircle style={{ height: '12px', width: '12px', color: '#10b981' }} />
                      )}
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#6b7280'
                    }}>
                      {currentUser.email}
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div style={{ padding: '8px 0' }}>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        // Navigate to profile/settings
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: 'none',
                        background: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        color: '#374151'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f3f4f6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'none';
                      }}
                    >
                      <Settings style={{ height: '14px', width: '14px' }} />
                      Ustawienia konta
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        // Navigate to notifications
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: 'none',
                        background: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        color: '#374151'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f3f4f6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'none';
                      }}
                    >
                      <Bell style={{ height: '14px', width: '14px' }} />
                      Powiadomienia
                    </button>

                    <div style={{
                      height: '1px',
                      background: '#e5e7eb',
                      margin: '8px 0'
                    }} />

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onLogout();
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: 'none',
                        background: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        color: '#ef4444'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#fef2f2';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'none';
                      }}
                    >
                      <LogOut style={{ height: '14px', width: '14px' }} />
                      Wyloguj się
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          // Not authenticated - show login/register buttons
          <>
            <button 
              onClick={() => onAuthClick('login')}
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#10b981',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Zaloguj się
            </button>
            <button 
              onClick={() => onAuthClick('register')}
              style={{
                background: 'transparent',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.7)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Zarejestruj się
            </button>
          </>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          style={{
            display: 'none',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            border: 'none',
            padding: '8px',
            borderRadius: '8px',
            cursor: 'pointer',
            '@media (max-width: 768px)': { display: 'flex' },
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {showMobileMenu ? 
            <X style={{ height: '20px', width: '20px' }} /> : 
            <Menu style={{ height: '20px', width: '20px' }} />
          }
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    {showMobileMenu && (
      <div style={{
        display: 'block',
        '@media (min-width: 769px)': { display: 'none' },
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        margin: '0 -20px 16px -20px',
        padding: '16px 20px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: isActive 
                    ? 'rgba(255, 255, 255, 0.2)' 
                    : 'transparent',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textAlign: 'left'
                }}
              >
                <Icon style={{ height: '18px', width: '18px' }} />
                <div>
                  <div>{item.label}</div>
                  <div style={{ 
                    fontSize: '12px', 
                    opacity: 0.8, 
                    fontWeight: '400' 
                  }}>
                    {item.description}
                  </div>
                </div>
                {item.requiresAuth && !isAuthenticated && (
                  <Shield style={{ height: '14px', width: '14px', opacity: 0.7, marginLeft: 'auto' }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile User Info */}
        {isAuthenticated && currentUser && (
          <div style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              marginBottom: '12px'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {currentUser.isCompany ? 
                  <Building style={{ height: '20px', width: '20px' }} /> : 
                  <User style={{ height: '20px', width: '20px' }} />
                }
              </div>
              <div>
                <div style={{ 
                  fontWeight: '600',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  {getUserDisplayName()}
                  {currentUser.isVerified && (
                    <CheckCircle style={{ height: '14px', width: '14px', color: '#fbbf24' }} />
                  )}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  opacity: 0.8
                }}>
                  {currentUser.email}
                </div>
              </div>
            </div>
            
            <button
              onClick={() => {
                setShowMobileMenu(false);
                onLogout();
              }}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '12px 16px',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <LogOut style={{ height: '16px', width: '16px' }} />
              Wyloguj się
            </button>
          </div>
        )}
      </div>
    )}
  </div>

  {/* Click outside to close dropdowns */}
  {(showUserMenu || showMobileMenu) && (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1
      }}
      onClick={() => {
        setShowUserMenu(false);
        setShowMobileMenu(false);
      }}
    />
  )}
</nav>
```

);
};

export default Navigation;