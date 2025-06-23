import React, { useState, useEffect } from 'react';
import { Search, Filter, Car, Battery, Zap, MapPin, Phone, Mail, Heart, Star, ChevronDown, Menu, X, ArrowRight, Sparkles, User, Shield, Building, CheckCircle, AlertCircle } from 'lucide-react';

interface User {
  id: number;
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  isCompany: boolean;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  companyName?: string;
  nip?: string;
  isVerified: boolean;
  registrationDate: Date;
}

interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  batteryCapacity: number;
  range: number;
  chargingType: string;
  location: string;
  description: string;
  photos?: string[];
  mileage?: number;
  batteryType: 'Li-ion' | 'LiFePO4' | 'NMC' | 'LTO';
  driveType: 'FWD' | 'RWD' | 'AWD';
  powerOutput: number;
  maxChargingSpeed: number;
  efficiency: number;
  chargingPorts: string[];
  autopilot: boolean;
  heatedSeats: boolean;
  heatPump: boolean;
  seller?: {
    name: string;
    phone: string;
    verified: boolean;
    rating: number;
    isCompany?: boolean;
    companyName?: string;
  };
  sellerId: number;
}

const mockUsers: User[] = [
  {
    id: 1,
    phone: "+48123456789",
    email: "jan.kowalski@email.com",
    firstName: "Jan",
    lastName: "Kowalski",
    isCompany: false,
    street: "ul. Marszałkowska 1",
    city: "Warszawa",
    postalCode: "00-001",
    country: "Polska",
    isVerified: true,
    registrationDate: new Date('2023-01-15')
  },
  {
    id: 2,
    phone: "+48987654321", 
    email: "anna.nowak@email.com",
    firstName: "Anna",
    lastName: "Nowak",
    isCompany: false,
    street: "ul. Floriańska 10",
    city: "Kraków",
    postalCode: "31-019",
    country: "Polska",
    isVerified: true,
    registrationDate: new Date('2023-02-20')
  },
  {
    id: 3,
    phone: "+48777888999",
    email: "biuro@autosalonzielinski.pl",
    firstName: "Katarzyna",
    lastName: "Zielińska",
    isCompany: true,
    companyName: "Auto Salon Zieliński Sp. z o.o.",
    nip: "1234567890",
    street: "ul. Przemysłowa 15",
    city: "Wrocław", 
    postalCode: "50-001",
    country: "Polska",
    isVerified: true,
    registrationDate: new Date('2022-11-10')
  }
];

const mockVehicles: Vehicle[] = [
  {
    id: 1,
    make: "Tesla",
    model: "Model 3",
    year: 2022,
    price: 250000,
    batteryCapacity: 75,
    range: 500,
    chargingType: "Type 2, CCS",
    location: "Warszawa",
    description: "Idealny stan, pełna dokumentacja serwisowa, autopilot",
    photos: ["https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400"],
    mileage: 25000,
    batteryType: 'Li-ion',
    driveType: 'RWD',
    powerOutput: 239,
    maxChargingSpeed: 170,
    efficiency: 15.2,
    chargingPorts: ['Type 2', 'CCS'],
    autopilot: true,
    heatedSeats: true,
    heatPump: true,
    sellerId: 1,
    seller: {
      name: "Jan Kowalski",
      phone: "+48 123 456 789",
      verified: true,
      rating: 4.8,
      isCompany: false
    }
  },
  {
    id: 2,
    make: "BMW",
    model: "iX3",
    year: 2023,
    price: 320000,
    batteryCapacity: 80,
    range: 460,
    chargingType: "Type 2, CCS",
    location: "Kraków",
    description: "Nowy pojazd, gwarancja producenta, premium wyposażenie",
    photos: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400"],
    mileage: 5000,
    batteryType: 'NMC',
    driveType: 'RWD',
    powerOutput: 210,
    maxChargingSpeed: 150,
    efficiency: 17.8,
    chargingPorts: ['Type 2', 'CCS'],
    autopilot: false,
    heatedSeats: true,
    heatPump: true,
    sellerId: 2,
    seller: {
      name: "Anna Nowak",
      phone: "+48 987 654 321",
      verified: true,
      rating: 4.9,
      isCompany: false
    }
  },
  {
    id: 3,
    make: "Volkswagen",
    model: "ID.4",
    year: 2023,
    price: 200000,
    batteryCapacity: 77,
    range: 520,
    chargingType: "Type 2, CCS",
    location: "Gdańsk",
    description: "Ekonomiczny SUV elektryczny, bardzo oszczędny, rodzinny",
    photos: ["https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400"],
    mileage: 15000,
    batteryType: 'NMC',
    driveType: 'RWD',
    powerOutput: 150,
    maxChargingSpeed: 125,
    efficiency: 16.1,
    chargingPorts: ['Type 2', 'CCS'],
    autopilot: false,
    heatedSeats: true,
    heatPump: false,
    sellerId: 1,
    seller: {
      name: "Piotr Wiśniewski",
      phone: "+48 555 123 456",
      verified: true,
      rating: 4.7,
      isCompany: false
    }
  },
  {
    id: 4,
    make: "Audi",
    model: "e-tron GT",
    year: 2022,
    price: 450000,
    batteryCapacity: 93,
    range: 450,
    chargingType: "Type 2, CCS",
    location: "Wrocław",
    description: "Sportowy sedan elektryczny, maksymalne osiągi, napęd 4x4",
    photos: ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400"],
    mileage: 18000,
    batteryType: 'Li-ion',
    driveType: 'AWD',
    powerOutput: 350,
    maxChargingSpeed: 270,
    efficiency: 19.3,
    chargingPorts: ['Type 2', 'CCS'],
    autopilot: false,
    heatedSeats: true,
    heatPump: true,
    sellerId: 3,
    seller: {
      name: "Auto Salon Zieliński",
      phone: "+48 777 888 999",
      verified: true,
      rating: 4.6,
      isCompany: true,
      companyName: "Auto Salon Zieliński Sp. z o.o."
    }
  },
  {
    id: 5,
    make: "BYD",
    model: "Tang",
    year: 2023,
    price: 280000,
    batteryCapacity: 86,
    range: 400,
    chargingType: "Type 2, CCS",
    location: "Poznań",
    description: "Chiński SUV premium, bateria LiFePO4, bardzo bezpieczny",
    photos: ["https://images.unsplash.com/photo-1549399381-f0b1fbb02c07?w=400"],
    mileage: 8000,
    batteryType: 'LiFePO4',
    driveType: 'AWD',
    powerOutput: 380,
    maxChargingSpeed: 110,
    efficiency: 21.5,
    chargingPorts: ['Type 2', 'CCS'],
    autopilot: false,
    heatedSeats: true,
    heatPump: false,
    sellerId: 3,
    seller: {
      name: "Auto Salon Zieliński",
      phone: "+48 777 888 999",
      verified: true,
      rating: 4.5,
      isCompany: true,
      companyName: "Auto Salon Zieliński Sp. z o.o."
    }
  }
];

export default function EVMarketplace() {
  const [vehicles] = useState<Vehicle[]>(mockVehicles);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(mockVehicles);
  const [loading, setLoading] = useState(false);
  
  // Authentication state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [phoneVerificationStep, setPhoneVerificationStep] = useState<'phone' | 'code' | 'details'>('phone');
  
  const [currentView, setCurrentView] = useState('home');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    make: 'Wszystkie',
    priceRange: 'Wszystkie',
    year: 'Wszystkie',
    location: 'Wszystkie',
    batteryType: 'Wszystkie',
    driveType: 'Wszystkie',
    rangeCategory: 'Wszystkie',
    chargingSpeed: 'Wszystkie',
    batteryCapacity: 'Wszystkie',
    features: 'Wszystkie'
  });

  // Auth form data
  const [authFormData, setAuthFormData] = useState({
    phone: '',
    verificationCode: '',
    email: '',
    firstName: '',
    lastName: '',
    isCompany: false,
    companyName: '',
    nip: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'Polska'
  });

  const filterVehicles = () => {
    let filtered = vehicles.filter(vehicle => {
      const matchesSearch = vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vehicle.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesMake = filters.make === 'Wszystkie' || vehicle.make === filters.make;
      const matchesLocation = filters.location === 'Wszystkie' || vehicle.location === filters.location;
      const matchesYear = filters.year === 'Wszystkie' || vehicle.year.toString() === filters.year;
      
      // Price filter
      let matchesPrice = true;
      if (filters.priceRange !== 'Wszystkie') {
        const [min, max] = filters.priceRange.split('-').map(p => parseInt(p) * 1000);
        matchesPrice = vehicle.price >= min && (max ? vehicle.price <= max : true);
      }
      
      // EV-specific filters
      const matchesBatteryType = filters.batteryType === 'Wszystkie' || vehicle.batteryType === filters.batteryType;
      const matchesDriveType = filters.driveType === 'Wszystkie' || vehicle.driveType === filters.driveType;
      
      return matchesSearch && matchesMake && matchesLocation && matchesYear && matchesPrice &&
             matchesBatteryType && matchesDriveType;
    });
    
    setFilteredVehicles(filtered);
  };

  useEffect(() => {
    filterVehicles();
  }, [searchTerm, filters, vehicles]);

  // Authentication functions
  const sendVerificationCode = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPhoneVerificationStep('code');
    }, 2000);
  };

  const verifyCode = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (authFormData.verificationCode === '123456') {
        const existingUser = mockUsers.find(u => u.phone === authFormData.phone);
        if (existingUser && authMode === 'login') {
          setCurrentUser(existingUser);
          setIsAuthenticated(true);
          setShowAuthModal(false);
          setPhoneVerificationStep('phone');
        } else if (authMode === 'register') {
          setPhoneVerificationStep('details');
        }
      } else {
        alert('Nieprawidłowy kod weryfikacyjny');
      }
    }, 1000);
  };

  const completeRegistration = () => {
    setLoading(true);
    setTimeout(() => {
      const newUser: User = {
        id: mockUsers.length + 1,
        phone: authFormData.phone,
        email: authFormData.email,
        firstName: authFormData.firstName,
        lastName: authFormData.lastName,
        isCompany: authFormData.isCompany,
        companyName: authFormData.companyName,
        nip: authFormData.nip,
        street: authFormData.street,
        city: authFormData.city,
        postalCode: authFormData.postalCode,
        country: authFormData.country,
        isVerified: true,
        registrationDate: new Date()
      };
      
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      setShowAuthModal(false);
      setPhoneVerificationStep('phone');
      setLoading(false);
    }, 2000);
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setCurrentView('home');
  };

  const handleSellClick = () => {
    if (!isAuthenticated) {
      setAuthMode('register');
      setShowAuthModal(true);
    } else {
      setCurrentView('sell');
    }
  };

  const AuthModal = () => {
    if (!showAuthModal) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '32px',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1f2937', margin: 0 }}>
              {authMode === 'login' ? 'Zaloguj się' : 'Zarejestruj się'}
            </h2>
            <button
              onClick={() => {
                setShowAuthModal(false);
                setPhoneVerificationStep('phone');
              }}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#6b7280'
              }}
            >
              <X style={{ height: '24px', width: '24px' }} />
            </button>
          </div>

          {phoneVerificationStep === 'phone' && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <Phone style={{ height: '48px', width: '48px', color: '#10b981', margin: '0 auto 16px' }} />
                <p style={{ color: '#6b7280' }}>
                  {authMode === 'login' 
                    ? 'Podaj numer telefonu, aby się zalogować'
                    : 'Podaj numer telefonu, aby rozpocząć rejestrację'
                  }
                </p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  Numer telefonu
                </label>
                <input
                  type="tel"
                  placeholder="+48 123 456 789"
                  value={authFormData.phone}
                  onChange={(e) => setAuthFormData({...authFormData, phone: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>

              <button
                onClick={sendVerificationCode}
                disabled={loading || !authFormData.phone}
                style={{
                  width: '100%',
                  background: loading ? '#9ca3af' : 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Wysyłanie...' : 'Wyślij kod weryfikacyjny'}
              </button>

              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <button
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#10b981',
                    fontSize: '14px',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  {authMode === 'login' ? 'Nie masz konta? Zarejestruj się' : 'Masz już konto? Zaloguj się'}
                </button>
              </div>
            </div>
          )}

          {phoneVerificationStep === 'code' && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <Shield style={{ height: '48px', width: '48px', color: '#10b981', margin: '0 auto 16px' }} />
                <p style={{ color: '#6b7280' }}>
                  Wysłaliśmy kod weryfikacyjny na numer<br />
                  <strong>{authFormData.phone}</strong>
                </p>
                <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>
                  Demo: użyj kodu <strong>123456</strong>
                </p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  Kod weryfikacyjny
                </label>
                <input
                  type="text"
                  placeholder="123456"
                  value={authFormData.verificationCode}
                  onChange={(e) => setAuthFormData({...authFormData, verificationCode: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '20px',
                    outline: 'none',
                    textAlign: 'center',
                    letterSpacing: '0.2em'
                  }}
                />
              </div>

              <button
                onClick={verifyCode}
                disabled={loading || !authFormData.verificationCode}
                style={{
                  width: '100%',
                  background: loading ? '#9ca3af' : 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Weryfikowanie...' : 'Zweryfikuj kod'}
              </button>
            </div>
          )}

          {phoneVerificationStep === 'details' && authMode === 'register' && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <User style={{ height: '48px', width: '48px', color: '#10b981', margin: '0 auto 16px' }} />
                <p style={{ color: '#6b7280' }}>
                  Uzupełnij swoje dane, aby zakończyć rejestrację
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="twoj@email.com"
                    value={authFormData.email}
                    onChange={(e) => setAuthFormData({...authFormData, email: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Imię *
                    </label>
                    <input
                      type="text"
                      placeholder="Jan"
                      value={authFormData.firstName}
                      onChange={(e) => setAuthFormData({...authFormData, firstName: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                      Nazwisko *
                    </label>
                    <input
                      type="text"
                      placeholder="Kowalski"
                      value={authFormData.lastName}
                      onChange={(e) => setAuthFormData({...authFormData, lastName: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Miasto *
                  </label>
                  <input
                    type="text"
                    placeholder="Warszawa"
                    value={authFormData.city}
                    onChange={(e) => setAuthFormData({...authFormData, city: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <button
                onClick={completeRegistration}
                disabled={loading}
                style={{
                  width: '100%',
                  background: loading ? '#9ca3af' : 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  marginTop: '24px'
                }}
              >
                {loading ? 'Rejestrowanie...' : 'Zakończ rejestrację'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const Navigation = () => (
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
                src="/logo.png" 
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
                    handleSellClick();
                  } else {
                    setCurrentView(view);
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
                  onClick={logout}
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
                  onClick={() => {
                    setAuthMode('login');
                    setShowAuthModal(true);
                  }}
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
                  onClick={() => {
                    setAuthMode('register');
                    setShowAuthModal(true);
                  }}
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

  const SearchBar = () => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '24px',
      borderRadius: '16px',
      marginBottom: '32px'
    }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ position: 'relative' }}>
          <Search style={{ 
            position: 'absolute', 
            left: '12px', 
            top: '50%', 
            transform: 'translateY(-50%)', 
            height: '16px', 
            width: '16px', 
            color: '#9ca3af' 
          }} />
          <input
            type="text"
            placeholder="Szukaj pojazdu elektrycznego..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              paddingLeft: '40px',
              paddingRight: '16px',
              paddingTop: '12px',
              paddingBottom: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '14px',
              outline: 'none',
              background: 'white'
            }}
          />
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px',
        marginBottom: '20px'
      }}>
        {[
          { key: 'make', label: 'Wszystkie marki', options: ['Wszystkie', 'Tesla', 'BMW', 'Audi', 'Volkswagen', 'BYD'] },
          { key: 'location', label: 'Wszystkie lokalizacje', options: ['Wszystkie', 'Warszawa', 'Kraków', 'Gdańsk', 'Wrocław', 'Poznań'] },
          { key: 'year', label: 'Wszystkie roczniki', options: ['Wszystkie', '2024', '2023', '2022', '2021', '2020'] }
        ].map(({ key, label, options }) => (
          <select
            key={key}
            value={filters[key]}
            onChange={(e) => setFilters({...filters, [key]: e.target.value})}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '14px',
              outline: 'none',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="Wszystkie">{label}</option>
            {options.slice(1).map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ))}
      </div>

      <button style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '12px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <Search style={{ height: '16px', width: '16px' }} />
        Szukaj ({filteredVehicles.length})
      </button>
    </div>
  );

  const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.4s ease',
      cursor: 'pointer'
    }}>
      <div style={{ position: 'relative' }}>
        <img
          src={vehicle.photos?.[0] || "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400"}
          alt={`${vehicle.make} ${vehicle.model}`}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover'
          }}
        />
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          {vehicle.year}
        </div>
      </div>
      
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '700', 
            color: '#1f2937',
            margin: '0'
          }}>
            {vehicle.make} {vehicle.model}
          </h3>
          <span style={{ 
            fontSize: '18px', 
            fontWeight: '700', 
            background: 'linear-gradient(135deg, #10b981, #059669)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {vehicle.price.toLocaleString('pl-PL')} zł
          </span>
        </div>
        
        <p style={{ 
          color: '#6b7280', 
          marginBottom: '16px', 
          fontSize: '14px'
        }}>
          {vehicle.description}
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '12px', 
          marginBottom: '16px',
          fontSize: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', color: '#6b7280' }}>
            <Battery style={{ height: '14px', width: '14px', marginRight: '6px' }} />
            <span style={{ fontWeight: '600', color: '#1f2937' }}>{vehicle.batteryCapacity} kWh</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', color: '#6b7280' }}>
            <Zap style={{ height: '14px', width: '14px', marginRight: '6px' }} />
            <span style={{ fontWeight: '600', color: '#1f2937' }}>{vehicle.range} km</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', color: '#6b7280' }}>
            <MapPin style={{ height: '14px', width: '14px', marginRight: '6px' }} />
            <span style={{ fontWeight: '600', color: '#1f2937' }}>{vehicle.location}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', color: '#6b7280' }}>
            <Car style={{ height: '14px', width: '14px', marginRight: '6px' }} />
            <span style={{ fontWeight: '600', color: '#1f2937' }}>{vehicle.powerOutput} kW</span>
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedVehicle(vehicle);
            setCurrentView('details');
          }}
          style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          Zobacz szczegóły
          <ArrowRight style={{ height: '14px', width: '14px' }} />
        </button>
      </div>
    </div>
  );

  const HomePage = () => (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        padding: '80px 0',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: '800', 
            marginBottom: '24px'
          }}>
            iVi Market
          </h1>
          <p style={{ 
            fontSize: '20px', 
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px'
          }}>
            Marketplace pojazdów elektrycznych w Polsce
          </p>
          <button
            onClick={() => setCurrentView('browse')}
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              color: '#10b981',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Przeglądaj pojazdy
            <ArrowRight style={{ height: '20px', width: '20px' }} />
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <SearchBar />
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '32px', 
          marginBottom: '60px' 
        }}>
          {[
            { number: `${vehicles.length}+`, label: 'Dostępnych pojazdów' },
            { number: '500+', label: 'Zadowolonych klientów' },
            { number: '50+', label: 'Miast w Polsce' },
            { number: '450km', label: 'Średni zasięg' }
          ].map(({ number, label }, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '36px', 
                fontWeight: '800', 
                background: 'linear-gradient(135deg, #10b981, #059669)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px'
              }}>
                {number}
              </div>
              <div style={{ color: '#6b7280', fontSize: '16px' }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '800', 
            textAlign: 'center', 
            marginBottom: '40px',
            color: '#1f2937'
          }}>
            Polecane pojazdy
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '24px' 
          }}>
            {filteredVehicles.slice(0, 4).map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const BrowsePage = () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '32px', color: '#1f2937' }}>
        Przeglądaj pojazdy elektryczne
      </h1>
      
      <SearchBar />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Znaleziono {filteredVehicles.length} pojazd(ów)
        </p>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '24px' 
      }}>
        {filteredVehicles.map(vehicle => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );

  const VehicleDetails = () => {
    if (!selectedVehicle) return null;

    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        <button
          onClick={() => setCurrentView('browse')}
          style={{
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            color: '#10b981',
            background: 'transparent',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          ← Powrót do listy
        </button>

        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          overflow: 'hidden'
        }}>
          <img
            src={selectedVehicle.photos?.[0] || "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600"}
            alt={`${selectedVehicle.make} ${selectedVehicle.model}`}
            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
          />
          
          <div style={{ padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <h1 style={{ 
                  fontSize: '32px', 
                  fontWeight: '800', 
                  color: '#1f2937',
                  margin: '0 0 8px 0'
                }}>
                  {selectedVehicle.make} {selectedVehicle.model}
                </h1>
                <p style={{ color: '#6b7280', fontSize: '18px', margin: '0' }}>{selectedVehicle.year}</p>
              </div>
              <div style={{ 
                fontSize: '32px', 
                fontWeight: '800',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {selectedVehicle.price.toLocaleString('pl-PL')} zł
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: '#1f2937' }}>
                  Specyfikacja techniczna
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { label: 'Pojemność baterii:', value: `${selectedVehicle.batteryCapacity} kWh` },
                    { label: 'Typ baterii:', value: selectedVehicle.batteryType },
                    { label: 'Zasięg WLTP:', value: `${selectedVehicle.range} km` },
                    { label: 'Moc silnika:', value: `${selectedVehicle.powerOutput} kW` },
                    { label: 'Rodzaj napędu:', value: selectedVehicle.driveType },
                    { label: 'Przebieg:', value: `${selectedVehicle.mileage?.toLocaleString('pl-PL')} km` },
                    { label: 'Lokalizacja:', value: selectedVehicle.location }
                  ].map(({ label, value }, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280' }}>{label}</span>
                      <span style={{ fontWeight: '600', color: '#1f2937' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: '#1f2937' }}>
                  Kontakt ze sprzedającym
                </h3>
                {selectedVehicle.seller && (
                  <div style={{
                    background: '#f8fafc',
                    padding: '20px',
                    borderRadius: '16px'
                  }}>
                    <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                      {selectedVehicle.seller.name}
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <button style={{
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: 'white',
                        border: 'none',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}>
                        <Phone style={{ height: '16px', width: '16px' }} />
                        Zadzwoń: {selectedVehicle.seller.phone}
                      </button>
                      <button style={{
                        background: '#6b7280',
                        color: 'white',
                        border: 'none',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}>
                        <Mail style={{ height: '16px', width: '16px' }} />
                        Wyślij wiadomość
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginTop: '32px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#1f2937' }}>
                Opis
              </h3>
              <p style={{ color: '#4b5563', lineHeight: '1.6', fontSize: '16px' }}>
                {selectedVehicle.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SellPage = () => {
    if (!isAuthenticated) {
      return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '60px 32px'
          }}>
            <Shield style={{ height: '64px', width: '64px', color: '#10b981', margin: '0 auto 24px' }} />
            <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '16px', color: '#1f2937' }}>
              Wymagana rejestracja
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '32px', fontSize: '16px' }}>
              Aby sprzedawać pojazdy na naszej platformie, musisz być zarejestrowanym użytkownikiem.
            </p>
            <button
              onClick={() => {
                setAuthMode('register');
                setShowAuthModal(true);
              }}
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                padding: '14px 24px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                margin: '0 auto'
              }}
            >
              <User style={{ height: '18px', width: '18px' }} />
              Zarejestruj się teraz
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '32px', color: '#1f2937' }}>
          Dodaj swój pojazd elektryczny
        </h1>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '32px'
        }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  Marka *
                </label>
                <select style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '14px',
                  outline: 'none',
                  background: 'white'
                }}>
                  <option>Wybierz markę</option>
                  <option>Tesla</option>
                  <option>BMW</option>
                  <option>Audi</option>
                  <option>Volkswagen</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  Model *
                </label>
                <input
                  type="text"
                  placeholder="np. Model 3, iX3, e-tron"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '14px',
                    outline: 'none',
                    background: 'white'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Opis pojazdu *
              </label>
              <textarea
                rows={4}
                placeholder="Opisz szczegółowo stan pojazdu..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '14px',
                  outline: 'none',
                  background: 'white',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                padding: '16px 24px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Car style={{ height: '18px', width: '18px' }} />
              Dodaj ogłoszenie
            </button>
          </form>
        </div>
      </div>
    );
  };

  const BlogPage = () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '32px', color: '#1f2937' }}>
        Blog iVi Market
      </h1>
      
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '60px 40px',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #10b981, #059669)',
          borderRadius: '50%',
          padding: '24px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px'
        }}>
          <Star style={{ height: '48px', width: '48px', color: 'white' }} />
        </div>
        
        <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px', color: '#1f2937' }}>
          Blog w przygotowaniu
        </h2>
        
        <p style={{ color: '#6b7280', fontSize: '18px', lineHeight: '1.6', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
          Wkrótce znajdziesz tutaj najnowsze artykuły o pojazdach elektrycznych, 
          testy samochodów, porady dotyczące ładowania oraz aktualności z branży EV.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginTop: '40px'
        }}>
          {[
            {
              title: 'Testy pojazdów',
              description: 'Szczegółowe recenzje najnowszych modeli elektrycznych',
              icon: Car
            },
            {
              title: 'Porady techniczne',
              description: 'Jak dbać o baterie i optymalizować zasięg',
              icon: Battery
            },
            {
              title: 'Aktualności',
              description: 'Najnowsze wiadomości z branży pojazdów elektrycznych',
              icon: Zap
            }
          ].map(({ title, description, icon: Icon }, index) => (
            <div key={index} style={{
              background: '#f8fafc',
              padding: '24px',
              borderRadius: '16px',
              textAlign: 'center'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #34d399, #10b981)',
                borderRadius: '50%',
                padding: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Icon style={{ height: '24px', width: '24px', color: 'white' }} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                {title}
              </h3>
              <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5' }}>
                {description}
              </p>
            </div>
          ))}
        </div>
        
        <button
          onClick={() => setCurrentView('home')}
          style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '32px'
          }}
        >
          <ArrowRight style={{ height: '16px', width: '16px', transform: 'rotate(180deg)' }} />
          Powrót do strony głównej
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <Navigation />
      
      {currentView === 'home' && <HomePage />}
      {currentView === 'browse' && <BrowsePage />}
      {currentView === 'details' && <VehicleDetails />}
      {currentView === 'blog' && <BlogPage />}
      {currentView === 'sell' && <SellPage />}
      
      <AuthModal />
    </div>
  );
}