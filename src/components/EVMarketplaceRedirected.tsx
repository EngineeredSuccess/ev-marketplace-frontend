'use client'
import React, { useState, useEffect } from 'react';
import { Search, Filter, Car, Battery, Zap, MapPin, Phone, Mail, ArrowRight, AlertCircle } from 'lucide-react';

// Extend Window interface for GTM
declare global {
  interface Window {
    dataLayer: any[];
    hj?: any;
  }
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
    verified: boolean;
    rating: number;
    isCompany?: boolean;
    companyName?: string;
  };
  sellerId: number;
}

// Sample data - replace with API calls
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
      verified: true,
      rating: 4.9,
      isCompany: false
    }
  }
];

export default function EVMarketplace() {
  const [vehicles] = useState<Vehicle[]>(mockVehicles);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(mockVehicles);
  
  const [currentView, setCurrentView] = useState('home');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [filters, setFilters] = useState<{[key: string]: string}>({
    make: 'Wszystkie',
    priceRange: 'Wszystkie',
    year: 'Wszystkie',
    location: 'Wszystkie'
  });

  // Initialize dataLayer for GTM
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
    }
  }, []);

  const filterVehicles = () => {
    let filtered = vehicles.filter(vehicle => {
      const matchesSearch = vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vehicle.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesMake = filters.make === 'Wszystkie' || vehicle.make === filters.make;
      const matchesLocation = filters.location === 'Wszystkie' || vehicle.location === filters.location;
      const matchesYear = filters.year === 'Wszystkie' || vehicle.year.toString() === filters.year;
      
      return matchesSearch && matchesMake && matchesLocation && matchesYear;
    });
    
    setFilteredVehicles(filtered);
  };

  useEffect(() => {
    filterVehicles();
  }, [searchTerm, filters, vehicles]);

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
              <Car style={{ height: '24px', width: '24px', color: 'white' }} />
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
            {['home', 'browse', 'blog'].map((view) => (
              <button
                key={view}
                onClick={() => setCurrentView(view)}
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
                 'Blog'}
              </button>
            ))}
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
          { key: 'make', label: 'Wszystkie marki', options: ['Wszystkie', 'Tesla', 'BMW', 'Audi', 'Volkswagen'] },
          { key: 'location', label: 'Wszystkie lokalizacje', options: ['Wszystkie', 'Warszawa', 'Kraków', 'Gdańsk', 'Wrocław'] },
          { key: 'year', label: 'Wszystkie roczniki', options: ['Wszystkie', '2024', '2023', '2022', '2021'] }
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

      <button 
        style={{
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
      {/* Under Construction Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        color: 'white',
        padding: '16px 0',
        textAlign: 'center',
        borderBottom: '3px solid #92400e'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <AlertCircle style={{ height: '24px', width: '24px' }} />
            <span style={{ 
              fontSize: '18px', 
              fontWeight: '700'
            }}>
              🚧 W BUDOWIE 🚧
            </span>
            <AlertCircle style={{ height: '24px', width: '24px' }} />
          </div>
          <p style={{ 
            fontSize: '14px', 
            marginTop: '8px',
            opacity: '0.9',
            margin: '8px 0 0 0'
          }}>
            Strona jest obecnie w fazie rozwoju. Wkrótce pojawią się prawdziwe oferty pojazdów elektrycznych!
          </p>
        </div>
      </div>

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
                      <button 
                        style={{
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
                        <Mail style={{ height: '16px', width: '16px' }} />
                        Wyślij wiadomość
                      </button>
                      <button 
                        style={{
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
                        <Phone style={{ height: '16px', width: '16px' }} />
                        Kontakt
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

  const BlogPage = () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px', color: '#1f2937' }}>
          Blog iVi Market
        </h1>
        <p style={{ color: '#6b7280', fontSize: '18px' }}>
          Najnowsze artykuły o pojazdach elektrycznych będą dostępne wkrótce!
        </p>
      </div>
    </div>
  );

  const CookieBanner = () => {
    if (!showCookieBanner) return null;

    return (
      <div style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        background: 'rgba(31, 41, 55, 0.95)',
        color: 'white',
        padding: '20px',
        zIndex: 1000,
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <p style={{ margin: '0', fontSize: '14px', lineHeight: '1.5' }}>
              Ta strona używa plików cookies w celu świadczenia usług na najwyższym poziomie. 
              Dalsze korzystanie ze strony oznacza, że zgadzasz się na ich użycie.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowCookieBanner(false)}
              style={{
                background: '#10b981',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              Akceptuję
            </button>
          </div>
        </div>
      </div>
    );
  };

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
      
      <CookieBanner />
    </div>
  );
}