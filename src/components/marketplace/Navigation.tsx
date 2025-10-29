import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../../types/User';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onSellClick: () => void;
  isAuthenticated: boolean;
  currentUser: User | null;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
}

interface UserMenuProps {
  currentUser: User | null;
  onLogout: () => void;
  router: any;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser, onLogout, router }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          padding: '8px 12px',
          borderRadius: '8px',
          fontWeight: '600',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        <span>{currentUser?.first_name} {currentUser?.last_name}</span>
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
          ▼
        </span>
      </button>
      
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: '0',
          marginTop: '8px',
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          minWidth: '200px',
          zIndex: 50,
          border: '1px solid rgba(0, 0, 0, 0.1)'
        }}>
          <button
            onClick={() => {
              router.push('/account');
              setIsOpen(false);
            }}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '12px 16px',
              border: 'none',
              background: 'transparent',
              color: '#374151',
              fontSize: '14px',
              cursor: 'pointer',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = 'transparent';
            }}
          >
            ⚙️ Ustawienia konta
          </button>
          <button
            onClick={() => {
              router.push('/sell');
              setIsOpen(false);
            }}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '12px 16px',
              border: 'none',
              background: 'transparent',
              color: '#374151',
              fontSize: '14px',
              cursor: 'pointer',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = 'transparent';
            }}
          >
            🚗 Sprzedaj pojazd
          </button>
          <button
            onClick={() => {
              onLogout();
              setIsOpen(false);
            }}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '12px 16px',
              border: 'none',
              background: 'transparent',
              color: '#dc2626',
              fontSize: '14px',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#fef2f2';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = 'transparent';
            }}
          >
            🚪 Wyloguj się
          </button>
        </div>
      )}
    </div>
  );
};

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onViewChange,
  onSellClick,
  isAuthenticated,
  currentUser,
  onLogin,
  onRegister,
  onLogout
}) => {
  const router = useRouter();
  return (
    <nav style={{
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '16px 0',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '8px',
              marginRight: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src="/logo.svg"
                alt="iVi Market Logo"
                style={{
                  width: '24px',
                  height: '24px',
                  objectFit: 'contain'
                }}
              />
            </div>
            <span style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: 'white'
            }}>
              iVi Market
            </span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '32px',
            flexWrap: 'wrap'
          }}>
            {['home', 'browse', 'blog', 'about', 'sell'].map((view) => (
              <button
                key={view}
                onClick={() => {
                  if (view === 'sell') {
                    router.push('/sell');
                  } else if (view === 'blog') {
                    router.push('/blog');
                  } else if (view === 'about') {
                    router.push('/about');
                  } else {
                    onViewChange(view);
                  }
                }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  background: currentView === view 
                    ? 'rgba(255, 255, 255, 0.2)' 
                    : 'transparent',
                  color: 'white',
                  whiteSpace: 'nowrap',
                  minWidth: 'fit-content'
                }}
              >
                {view === 'home' ? 'Strona główna' : 
                 view === 'browse' ? 'Przeglądaj pojazdy' : 
                 view === 'blog' ? 'Blog' :
                 view === 'about' ? 'O Nas' :
                 'Sprzedaj pojazd'}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {isAuthenticated ? (
              <UserMenu
                currentUser={currentUser}
                onLogout={onLogout}
                router={router}
              />
            ) : (
              <>
                <button 
                  onClick={onLogin}
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: '#10b981',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Zaloguj się
                </button>
                <button 
                  onClick={onRegister}
                  style={{
                    background: 'transparent',
                    color: 'white',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Zarejestruj się
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};