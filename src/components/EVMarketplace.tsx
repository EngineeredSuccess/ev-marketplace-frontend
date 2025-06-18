import React, { useState, useEffect } from 'react';
import { Search, Filter, Car, Battery, Zap, MapPin, Phone, Mail, Heart, Star, ChevronDown, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

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
  // Enhanced EV-specific properties
  batteryType: 'Li-ion' | 'LiFePO4' | 'NMC' | 'LTO';
  driveType: 'FWD' | 'RWD' | 'AWD';
  powerOutput: number; // kW
  maxChargingSpeed: number; // kW
  efficiency: number; // kWh/100km
  chargingPorts: string[];
  autopilot: boolean;
  heatedSeats: boolean;
  heatPump: boolean;
  seller?: {
    name: string;
    phone: string;
    verified: boolean;
    rating: number;
  };
}

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
    seller: {
      name: "Jan Kowalski",
      phone: "+48 123 456 789",
      verified: true,
      rating: 4.8
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
    seller: {
      name: "Anna Nowak",
      phone: "+48 987 654 321",
      verified: true,
      rating: 4.9
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
    seller: {
      name: "Piotr Wiśniewski",
      phone: "+48 555 123 456",
      verified: true,
      rating: 4.7
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
    seller: {
      name: "Katarzyna Zielińska",
      phone: "+48 777 888 999",
      verified: true,
      rating: 4.6
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
    seller: {
      name: "Marcin Lewandowski",
      phone: "+48 666 555 444",
      verified: true,
      rating: 4.5
    }
  }
];

export default function EVMarketplace() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(mockVehicles);
  const [loading, setLoading] = useState(false);
  
  const [currentView, setCurrentView] = useState('home');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    make: 'Wszystkie',
    priceRange: 'Wszystkie',
    year: 'Wszystkie',
    location: 'Wszystkie',
    // New EV-specific filters
    batteryType: 'Wszystkie',
    driveType: 'Wszystkie',
    rangeCategory: 'Wszystkie',
    chargingSpeed: 'Wszystkie',
    batteryCapacity: 'Wszystkie',
    features: 'Wszystkie'
  });
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    filterVehicles();
  }, [searchTerm, filters, vehicles]);

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
      
      // Range category filter
      let matchesRange = true;
      if (filters.rangeCategory !== 'Wszystkie') {
        const ranges = {
          '0-300': [0, 300],
          '300-400': [300, 400],
          '400-500': [400, 500],
          '500+': [500, 9999]
        };
        const [minRange, maxRange] = ranges[filters.rangeCategory] || [0, 9999];
        matchesRange = vehicle.range >= minRange && vehicle.range <= maxRange;
      }
      
      // Charging speed filter
      let matchesChargingSpeed = true;
      if (filters.chargingSpeed !== 'Wszystkie') {
        const speeds = {
          'slow': [0, 50],      // Slow AC charging
          'fast': [50, 150],    // Fast DC charging
          'ultra': [150, 9999]  // Ultra-fast charging
        };
        const [minSpeed, maxSpeed] = speeds[filters.chargingSpeed] || [0, 9999];
        matchesChargingSpeed = vehicle.maxChargingSpeed >= minSpeed && vehicle.maxChargingSpeed <= maxSpeed;
      }
      
      // Battery capacity filter
      let matchesBatteryCapacity = true;
      if (filters.batteryCapacity !== 'Wszystkie') {
        const capacities = {
          'small': [0, 60],     // Small battery
          'medium': [60, 80],   // Medium battery
          'large': [80, 9999]   // Large battery
        };
        const [minCap, maxCap] = capacities[filters.batteryCapacity] || [0, 9999];
        matchesBatteryCapacity = vehicle.batteryCapacity >= minCap && vehicle.batteryCapacity <= maxCap;
      }
      
      // Features filter
      let matchesFeatures = true;
      if (filters.features !== 'Wszystkie') {
        switch (filters.features) {
          case 'autopilot':
            matchesFeatures = vehicle.autopilot;
            break;
          case 'heatpump':
            matchesFeatures = vehicle.heatPump;
            break;
          case 'heated':
            matchesFeatures = vehicle.heatedSeats;
            break;
          case 'awd':
            matchesFeatures = vehicle.driveType === 'AWD';
            break;
        }
      }
      
      return matchesSearch && matchesMake && matchesLocation && matchesYear && matchesPrice &&
             matchesBatteryType && matchesDriveType && matchesRange && matchesChargingSpeed &&
             matchesBatteryCapacity && matchesFeatures;
    });
    
    setFilteredVehicles(filtered);
  };

  const Navigation = () => (
    <nav style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #ff6b6b, #ffd93d)',
              borderRadius: '12px',
              padding: '8px',
              marginRight: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}>
              <Car style={{ height: '24px', width: '24px', color: 'white' }} />
            </div>
            <span style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              EV Marketplace
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '32px' }}>
            {['home', 'browse', 'sell'].map((view) => (
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
                  transition: 'all 0.3s ease',
                  background: currentView === view 
                    ? 'rgba(255, 255, 255, 0.2)' 
                    : 'transparent',
                  color: 'white',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  if (currentView !== view) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentView !== view) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  }
                }}
              >
                {view === 'home' ? 'Strona główna' : 
                 view === 'browse' ? 'Przeglądaj pojazdy' : 'Sprzedaj pojazd'}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{
              background: 'rgba(255, 255, 255, 0.9)',
              color: '#667eea',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              Zaloguj się
            </button>
            <button style={{
              background: 'transparent',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              Zarejestruj się
            </button>
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
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      marginBottom: '32px'
    }}>
      {/* Search Input */}
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
              transition: 'all 0.3s ease',
              background: 'white'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea';
              e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>

      {/* Basic Filters */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px',
        marginBottom: '20px'
      }}>
        {[
          { key: 'make', label: 'Wszystkie marki', options: ['Wszystkie', 'Tesla', 'BMW', 'Audi', 'Volkswagen', 'BYD'] },
          { key: 'priceRange', label: 'Wszystkie ceny', options: ['Wszystkie', '0-100', '100-200', '200-300', '300-500', '500'] },
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
              <option key={option} value={option}>
                {key === 'priceRange' && option !== 'Wszystkie' 
                  ? option === '500' 
                    ? 'powyżej 500 000 zł'
                    : `${option.replace('-', ' 000 - ')} 000 zł`
                  : option}
              </option>
            ))}
          </select>
        ))}
      </div>

      {/* EV-Specific Filters */}
      <div style={{ 
        borderTop: '1px solid #e5e7eb',
        paddingTop: '20px',
        marginBottom: '20px'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '16px',
          color: '#4b5563',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          <Battery style={{ height: '16px', width: '16px', marginRight: '8px' }} />
          Filtry specjalistyczne EV
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: '16px' 
        }}>
          {[
            { 
              key: 'batteryType', 
              label: 'Typ baterii', 
              options: ['Wszystkie', 'Li-ion', 'LiFePO4', 'NMC'] 
            },
            { 
              key: 'driveType', 
              label: 'Napęd', 
              options: ['Wszystkie', 'FWD', 'RWD', 'AWD'] 
            },
            { 
              key: 'rangeCategory', 
              label: 'Zasięg', 
              options: ['Wszystkie', '0-300', '300-400', '400-500', '500+'],
              labels: {
                '0-300': 'do 300 km',
                '300-400': '300-400 km', 
                '400-500': '400-500 km',
                '500+': 'powyżej 500 km'
              }
            },
            { 
              key: 'chargingSpeed', 
              label: 'Szybkość ładowania', 
              options: ['Wszystkie', 'slow', 'fast', 'ultra'],
              labels: {
                'slow': 'Wolne (do 50kW)',
                'fast': 'Szybkie (50-150kW)',
                'ultra': 'Ultra (150kW+)'
              }
            },
            { 
              key: 'batteryCapacity', 
              label: 'Pojemność baterii', 
              options: ['Wszystkie', 'small', 'medium', 'large'],
              labels: {
                'small': 'Mała (do 60kWh)',
                'medium': 'Średnia (60-80kWh)',
                'large': 'Duża (80kWh+)'
              }
            },
            { 
              key: 'features', 
              label: 'Dodatkowe funkcje', 
              options: ['Wszystkie', 'autopilot', 'heatpump', 'heated', 'awd'],
              labels: {
                'autopilot': 'Autopilot',
                'heatpump': 'Pompa ciepła',
                'heated': 'Podgrzewane fotele',
                'awd': 'Napęd 4x4'
              }
            }
          ].map(({ key, label, options, labels }) => (
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
                <option key={option} value={option}>
                  {labels?.[option] || option}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>

      {/* Search Button and Reset */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button 
          onClick={() => setFilters({
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
          })}
          style={{
            background: '#6b7280',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease'
          }}
        >
          <X style={{ height: '16px', width: '16px' }} />
          Wyczyść filtry
        </button>
        
        <button style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '12px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
        }}>
          <Search style={{ height: '16px', width: '16px' }} />
          Szukaj ({filteredVehicles.length})
        </button>
      </div>
    </div>
  );

  const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.4s ease',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    }}
    >
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
          top: '12px',
          right: '12px',
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '50%',
          padding: '8px',
          backdropFilter: 'blur(10px)',
          cursor: 'pointer'
        }}>
          <Heart style={{ height: '16px', width: '16px', color: '#ef4444' }} />
        </div>
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
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
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {vehicle.price.toLocaleString('pl-PL')} zł
          </span>
        </div>
        
        <p style={{ 
          color: '#6b7280', 
          marginBottom: '16px', 
          fontSize: '14px',
          lineHeight: '1.5'
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
          {[
            { icon: Battery, text: `${vehicle.batteryCapacity} kWh`, subtext: vehicle.batteryType },
            { icon: Zap, text: `${vehicle.range} km`, subtext: `${vehicle.efficiency} kWh/100km` },
            { icon: MapPin, text: vehicle.location, subtext: `${vehicle.mileage?.toLocaleString('pl-PL')} km` },
            { icon: Car, text: `${vehicle.powerOutput} kW`, subtext: vehicle.driveType }
          ].map(({ icon: Icon, text, subtext }, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', color: '#6b7280' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
                <Icon style={{ height: '14px', width: '14px', marginRight: '6px' }} />
                <span style={{ fontWeight: '600', color: '#1f2937' }}>{text}</span>
              </div>
              <div style={{ fontSize: '11px', color: '#9ca3af', paddingLeft: '20px' }}>
                {subtext}
              </div>
            </div>
          ))}
        </div>

        {/* EV Features */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '6px', 
          marginBottom: '16px' 
        }}>
          {vehicle.autopilot && (
            <span style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '10px',
              fontWeight: '600'
            }}>
              Autopilot
            </span>
          )}
          {vehicle.heatPump && (
            <span style={{
              background: '#10b981',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '10px',
              fontWeight: '600'
            }}>
              Pompa ciepła
            </span>
          )}
          {vehicle.maxChargingSpeed > 150 && (
            <span style={{
              background: '#f59e0b',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '10px',
              fontWeight: '600'
            }}>
              Ultra-fast
            </span>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => {
              setSelectedVehicle(vehicle);
              setCurrentView('details');
            }}
            style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.3s ease'
            }}
          >
            Zobacz szczegóły
            <ArrowRight style={{ height: '14px', width: '14px' }} />
          </button>
          
          {vehicle.seller?.verified && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              color: '#10b981', 
              fontSize: '12px',
              fontWeight: '600'
            }}>
              <Star style={{ height: '12px', width: '12px', marginRight: '4px' }} />
              Zweryfikowany
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const HomePage = () => (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center', position: 'relative' }}>
          <div style={{ marginBottom: '24px' }}>
            <Sparkles style={{ height: '48px', width: '48px', margin: '0 auto', marginBottom: '16px' }} />
          </div>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: '800', 
            marginBottom: '24px',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            lineHeight: '1.2'
          }}>
            Marketplace Pojazdów<br />Elektrycznych
          </h1>
          <p style={{ 
            fontSize: '20px', 
            marginBottom: '32px', 
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '600px',
            margin: '0 auto 32px'
          }}>
            Znajdź idealny pojazd elektryczny lub sprzedaj swój w Polsce
          </p>
          <button
            onClick={() => setCurrentView('browse')}
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              color: '#667eea',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
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
        
        {/* Stats */}
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
            { number: `${Math.round(vehicles.reduce((acc, v) => acc + v.range, 0) / vehicles.length)}km`, label: 'Średni zasięg' }
          ].map(({ number, label }, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '36px', 
                fontWeight: '800', 
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
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

        {/* Featured Vehicles */}
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
      
      {filteredVehicles.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <Car style={{ height: '48px', width: '48px', color: '#9ca3af', margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
            Brak wyników
          </h3>
          <p style={{ color: '#6b7280' }}>Spróbuj zmienić kryteria wyszukiwania</p>
        </div>
      )}
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
            color: '#667eea',
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
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)'
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
              <div style={{ textAlign: 'right' }}>
                <div style={{ 
                  fontSize: '32px', 
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {selectedVehicle.price.toLocaleString('pl-PL')} zł
                </div>
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
                    { label: 'Zużycie energii:', value: `${selectedVehicle.efficiency} kWh/100km` },
                    { label: 'Moc silnika:', value: `${selectedVehicle.powerOutput} kW` },
                    { label: 'Rodzaj napędu:', value: selectedVehicle.driveType },
                    { label: 'Maks. moc ładowania:', value: `${selectedVehicle.maxChargingSpeed} kW` },
                    { label: 'Typy ładowania:', value: selectedVehicle.chargingPorts.join(', ') },
                    { label: 'Przebieg:', value: `${selectedVehicle.mileage?.toLocaleString('pl-PL')} km` },
                    { label: 'Lokalizacja:', value: selectedVehicle.location }
                  ].map(({ label, value }, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280' }}>{label}</span>
                      <span style={{ fontWeight: '600', color: '#1f2937' }}>{value}</span>
                    </div>
                  ))}
                </div>

                {/* Features Section */}
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: '24px', marginBottom: '16px', color: '#1f2937' }}>
                  Wyposażenie
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {[
                    { key: 'autopilot', label: 'Autopilot', color: '#667eea' },
                    { key: 'heatPump', label: 'Pompa ciepła', color: '#10b981' },
                    { key: 'heatedSeats', label: 'Podgrzewane fotele', color: '#f59e0b' }
                  ].map(({ key, label, color }) => (
                    selectedVehicle[key] && (
                      <span key={key} style={{
                        background: color,
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        ✓ {label}
                      </span>
                    )
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: '#1f2937' }}>
                  Kontakt ze sprzedającym
                </h3>
                {selectedVehicle.seller && (
                  <div style={{
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    padding: '20px',
                    borderRadius: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        color: 'white',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        marginRight: '12px'
                      }}>
                        {selectedVehicle.seller.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', color: '#1f2937' }}>{selectedVehicle.seller.name}</div>
                        {selectedVehicle.seller.verified && (
                          <div style={{ display: 'flex', alignItems: 'center', color: '#10b981', fontSize: '14px' }}>
                            <Star style={{ height: '12px', width: '12px', marginRight: '4px' }} />
                            Zweryfikowany sprzedawca
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <button style={{
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
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

  const SellPage = () => (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '32px', color: '#1f2937' }}>
        Dodaj swój pojazd elektryczny
      </h1>
      
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '32px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Marka
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
                <option>Mercedes</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Model
              </label>
              <input
                type="text"
                placeholder="np. Model 3"
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Rok produkcji
              </label>
              <input
                type="number"
                placeholder="2023"
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
            
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Cena (zł)
              </label>
              <input
                type="number"
                placeholder="250000"
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
              Opis
            </label>
            <textarea
              rows={4}
              placeholder="Opisz swój pojazd..."
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
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              padding: '16px 24px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)'
            }}
          >
            Dodaj ogłoszenie
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <Navigation />
      
      {currentView === 'home' && <HomePage />}
      {currentView === 'browse' && <BrowsePage />}
      {currentView === 'details' && <VehicleDetails />}
      {currentView === 'sell' && <SellPage />}
    </div>
  );
}