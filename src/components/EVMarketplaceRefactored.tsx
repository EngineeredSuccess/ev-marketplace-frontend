'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Car, 
  Battery, 
  Zap, 
  MapPin, 
  Calendar, 
  Heart, 
  Filter, 
  User, 
  LogOut,
  Settings,
  Plus
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { AuthMode } from '@/types/Auth';

// Mock data for vehicles
const mockVehicles = [
  {
    id: 1,
    make: 'Tesla',
    model: 'Model 3',
    year: 2022,
    price: 189000,
    batteryCapacity: 75,
    range: 491,
    location: 'Warszawa',
    imageUrl: '/api/placeholder/400/300',
    seller: {
      name: 'Jan Kowalski',
      email: 'jan@example.com',
      rating: 4.8
    },
    features: ['Autopilot', 'Supercharging', 'Premium Audio']
  },
  {
    id: 2,
    make: 'BMW',
    model: 'iX3',
    year: 2023,
    price: 245000,
    batteryCapacity: 80,
    range: 460,
    location: 'Kraków',
    imageUrl: '/api/placeholder/400/300',
    seller: {
      name: 'Anna Nowak',
      email: 'anna@example.com',
      rating: 4.9
    },
    features: ['BMW ConnectedDrive', 'Harman Kardon', 'Parktronic']
  },
  {
    id: 3,
    make: 'Audi',
    model: 'e-tron GT',
    year: 2023,
    price: 420000,
    batteryCapacity: 93,
    range: 488,
    location: 'Gdańsk',
    imageUrl: '/api/placeholder/400/300',
    seller: {
      name: 'Piotr Wiśniewski',
      email: 'piotr@example.com',
      rating: 4.7
    },
    features: ['Quattro', 'Bang & Olufsen', 'Matrix LED']
  }
];

export const EVMarketplaceRefactored: React.FC = () => {
  const { user, signOut } = useAuth();
  const isAuthenticated = !!user;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const filteredVehicles = mockVehicles.filter(vehicle => {
    const matchesSearch = vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMake = selectedMake === '' || vehicle.make === selectedMake;
    const matchesPrice = vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1];
    return matchesSearch && matchesMake && matchesPrice;
  });

  const handleAuthClick = (mode: AuthMode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    signOut();
    setShowUserMenu(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#10b981',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap style={{ height: '24px', width: '24px', color: 'white' }} />
            </div>
            <h1 style={{ 
              fontSize: '28px', 
              fontWeight: '800', 
              color: '#1f2937',
              margin: 0
            }}>
              iVi Market
            </h1>
          </div>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {isAuthenticated ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    backgroundColor: '#f3f4f6'
                  }}
                >
                  <User style={{ height: '20px', width: '20px', color: '#6b7280' }} />
                  <span style={{ color: '#1f2937', fontWeight: '500' }}>
                    {user?.firstName} {user?.lastName}
                  </span>
                </button>

                {showUserMenu && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    minWidth: '200px',
                    zIndex: 1000
                  }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
                      <p style={{ margin: 0, fontWeight: '600', color: '#1f2937' }}>
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                        {user?.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {/* TODO: Navigate to profile */}}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#374151'
                      }}
                    >
                      <Settings style={{ height: '16px', width: '16px' }} />
                      Ustawienia
                    </button>
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#ef4444',
                        borderTop: '1px solid #e5e7eb'
                      }}
                    >
                      <LogOut style={{ height: '16px', width: '16px' }} />
                      Wyloguj się
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => handleAuthClick('login')}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: 'transparent',
                    color: '#374151',
                    border: '2px solid #d1d5db',
                    borderRadius: '12px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Zaloguj się
                </button>
                <button
                  onClick={() => handleAuthClick('register')}
                  style={{
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Zarejestruj się
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '48px',
          padding: '48px 0',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          borderRadius: '20px',
          color: 'white'
        }}>
          <h2 style={{ 
            fontSize: '48px', 
            fontWeight: '800', 
            marginBottom: '16px',
            margin: 0
          }}>
            Znajdź swój idealny pojazd elektryczny
          </h2>
          <p style={{ 
            fontSize: '18px', 
            opacity: 0.9,
            margin: '16px 0 32px 0'
          }}>
            Największy marketplace pojazdów elektrycznych w Polsce
          </p>
          {isAuthenticated && (
            <button
              onClick={() => {/* TODO: Navigate to add listing */}}
              style={{
                padding: '16px 32px',
                backgroundColor: 'white',
                color: '#10b981',
                border: 'none',
                borderRadius: '16px',
                fontWeight: '700',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Plus style={{ height: '20px', width: '20px' }} />
              Dodaj ogłoszenie
            </button>
          )}
        </div>

        {/* Search and Filters */}
        <div style={{
          backgroundColor: 'white',
          padding: '32px',
          borderRadius: '20px',
          marginBottom: '32px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{ position: 'relative' }}>
              <Search style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                height: '20px',
                width: '20px',
                color: '#6b7280'
              }} />
              <input
                type="text"
                placeholder="Wyszukaj markę lub model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 48px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <select
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: 'white'
              }}
            >
              <option value="">Wszystkie marki</option>
              <option value="Tesla">Tesla</option>
              <option value="BMW">BMW</option>
              <option value="Audi">Audi</option>
            </select>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter style={{ height: '20px', width: '20px', color: '#6b7280' }} />
              <span style={{ fontSize: '14px', color: '#6b7280' }}>
                Cena: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
              </span>
            </div>
          </div>
        </div>

        {/* Vehicle Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '24px'
        }}>
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
              }}
            >
              <div style={{
                width: '100%',
                height: '200px',
                backgroundColor: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <Car style={{ height: '80px', width: '80px', color: '#6b7280' }} />
                <button
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <Heart style={{ height: '20px', width: '20px', color: '#6b7280' }} />
                </button>
              </div>

              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ 
                      fontSize: '20px', 
                      fontWeight: '700', 
                      color: '#1f2937',
                      margin: '0 0 4px 0'
                    }}>
                      {vehicle.make} {vehicle.model}
                    </h3>
                    <p style={{ 
                      color: '#6b7280', 
                      fontSize: '14px',
                      margin: 0
                    }}>
                      {vehicle.year}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ 
                      fontSize: '24px', 
                      fontWeight: '800', 
                      color: '#10b981',
                      margin: 0
                    }}>
                      {formatPrice(vehicle.price)}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Battery style={{ height: '16px', width: '16px', color: '#6b7280' }} />
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
                      {vehicle.batteryCapacity} kWh
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Zap style={{ height: '16px', width: '16px', color: '#6b7280' }} />
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
                      {vehicle.range} km
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin style={{ height: '16px', width: '16px', color: '#6b7280' }} />
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
                      {vehicle.location}
                    </span>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '16px',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#10b981',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <User style={{ height: '16px', width: '16px', color: 'white' }} />
                    </div>
                    <div>
                      <p style={{ 
                        fontSize: '14px', 
                        fontWeight: '600', 
                        color: '#1f2937',
                        margin: 0
                      }}>
                        {vehicle.seller.name}
                      </p>
                      <p style={{ 
                        fontSize: '12px', 
                        color: '#6b7280',
                        margin: 0
                      }}>
                        ⭐ {vehicle.seller.rating}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (!isAuthenticated) {
                        handleAuthClick('login');
                      } else {
                        // TODO: Navigate to contact seller
                      }
                    }}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Kontakt
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '48px',
            backgroundColor: 'white',
            borderRadius: '20px',
            marginTop: '32px'
          }}>
            <Car style={{ height: '64px', width: '64px', color: '#6b7280', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
              Brak wyników
            </h3>
            <p style={{ color: '#6b7280' }}>
              Spróbuj zmienić kryteria wyszukiwania
            </p>
          </div>
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
};

export default EVMarketplaceRefactored;