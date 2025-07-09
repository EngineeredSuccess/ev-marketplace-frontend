import React from 'react';
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
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
          
          <div style={{ display: 'flex', gap: '32px' }}>
            {['home', 'browse', 'blog', 'sell'].map((view) => (
              <button
                key={view}
                onClick={() => {
                  if (view === 'sell') {
                    onSellClick();
                  } else if (view === 'blog') {
                    router.push('/blog');
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
                  color: 'white'
                }}
              >
                {view === 'home' ? 'Strona główna' : 
                 view === 'browse' ? 'Przeglądaj pojazdy' : 
                 view === 'blog' ? 'Blog' :
                 'Sprzedaj pojazd'}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {isAuthenticated ? (
              <>
                <span style={{ color: 'white', fontSize: '14px' }}>
                  {currentUser?.firstName} {currentUser?.lastName}
                </span>
                <button 
                  onClick={onLogout}
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
                  Wyloguj
                </button>
              </>
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