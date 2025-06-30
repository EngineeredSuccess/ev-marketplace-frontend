// pages/HomePage.tsx
import React from ‘react’;
import { ArrowRight, Sparkles, TrendingUp, Users, MapPin, Zap } from ‘lucide-react’;
import VehicleCard from ‘../components/marketplace/VehicleCard’;
import SearchBar, { SearchFilters } from ‘../components/marketplace/SearchBar’;
import { Vehicle } from ‘../types/Vehicle’;

interface HomePageProps {
vehicles: Vehicle[];
searchTerm: string;
setSearchTerm: (term: string) => void;
filters: SearchFilters;
setFilters: (filters: SearchFilters) => void;
filteredVehicles: Vehicle[];
onSearch: () => void;
onNavigate: (view: string) => void;
onViewVehicleDetails: (vehicle: Vehicle) => void;
className?: string;
}

const HomePage: React.FC<HomePageProps> = ({
vehicles,
searchTerm,
setSearchTerm,
filters,
setFilters,
filteredVehicles,
onSearch,
onNavigate,
onViewVehicleDetails,
className = ‘’
}) => {
// Calculate statistics
const stats = {
totalVehicles: vehicles.length,
averageRange: Math.round(vehicles.reduce((acc, v) => acc + v.range, 0) / vehicles.length),
uniqueBrands: new Set(vehicles.map(v => v.make)).size,
verifiedSellers: vehicles.filter(v => v.seller?.verified).length
};

const statsData = [
{
number: `${stats.totalVehicles}+`,
label: ‘Dostępnych pojazdów’,
icon: TrendingUp,
color: ‘#10b981’
},
{
number: ‘500+’,
label: ‘Zadowolonych klientów’,
icon: Users,
color: ‘#667eea’
},
{
number: ‘50+’,
label: ‘Miast w Polsce’,
icon: MapPin,
color: ‘#f59e0b’
},
{
number: `${stats.averageRange}km`,
label: ‘Średni zasięg’,
icon: Zap,
color: ‘#ef4444’
}
];

// Get featured vehicles (verified sellers, newer models, better range)
const getFeaturedVehicles = () => {
return vehicles
.filter(vehicle => vehicle.seller?.verified)
.sort((a, b) => {
// Sort by year (newer first), then by range (higher first)
if (a.year !== b.year) return b.year - a.year;
return b.range - a.range;
})
.slice(0, 4);
};

const featuredVehicles = getFeaturedVehicles();

return (
<div className={className}>
{/* Hero Section */}
<section style={{
background: ‘linear-gradient(135deg, #10b981 0%, #059669 100%)’,
color: ‘white’,
padding: ‘80px 0 120px 0’,
position: ‘relative’,
overflow: ‘hidden’
}}>
{/* Background Pattern */}
<div style={{
position: ‘absolute’,
top: ‘0’,
left: ‘0’,
right: ‘0’,
bottom: ‘0’,
background: ‘url(“data:image/svg+xml,%3Csvg width=“60” height=“60” viewBox=“0 0 60 60” xmlns=“http://www.w3.org/2000/svg”%3E%3Cg fill=“none” fill-rule=“evenodd”%3E%3Cg fill=”%23ffffff” fill-opacity=“0.1”%3E%3Ccircle cx=“30” cy=“30” r=“2”/%3E%3C/g%3E%3C/g%3E%3C/svg%3E”)’,
opacity: 0.3
}} />

```
    {/* Floating Elements */}
    <div style={{
      position: 'absolute',
      top: '20%',
      right: '10%',
      width: '100px',
      height: '100px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '50%',
      animation: 'float 6s ease-in-out infinite'
    }} />
    <div style={{
      position: 'absolute',
      bottom: '20%',
      left: '10%',
      width: '60px',
      height: '60px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '50%',
      animation: 'float 4s ease-in-out infinite reverse'
    }} />

    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center', position: 'relative' }}>
      {/* Hero Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(255, 255, 255, 0.2)',
        padding: '8px 16px',
        borderRadius: '50px',
        marginBottom: '24px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
        <Sparkles style={{ height: '16px', width: '16px' }} />
        <span style={{ fontSize: '14px', fontWeight: '600' }}>
          Największy marketplace EV w Polsce
        </span>
      </div>

      {/* Main Heading */}
      <h1 style={{ 
        fontSize: 'clamp(32px, 5vw, 56px)', 
        fontWeight: '800', 
        marginBottom: '24px',
        textShadow: '0 4px 8px rgba(0,0,0,0.3)',
        lineHeight: '1.1',
        letterSpacing: '-0.02em'
      }}>
        Przyszłość motoryzacji<br />
        <span style={{
          background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block'
        }}>
          zaczyna się tutaj
        </span>
      </h1>

      {/* Subtitle */}
      <p style={{ 
        fontSize: 'clamp(16px, 2.5vw, 22px)', 
        marginBottom: '40px', 
        color: 'rgba(255, 255, 255, 0.9)',
        maxWidth: '700px',
        margin: '0 auto 40px auto',
        lineHeight: '1.5'
      }}>
        Znajdź idealny pojazd elektryczny, sprzedaj swój samochód lub odkryj
        najnowsze trendy w elektrycznej mobilności
      </p>

      {/* CTA Buttons */}
      <div style={{
        display: 'flex',
        gap: '16px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '60px'
      }}>
        <button
          onClick={() => onNavigate('browse')}
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#10b981',
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
            gap: '8px',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.3)';
            e.currentTarget.style.background = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
          }}
        >
          Przeglądaj pojazdy
          <ArrowRight style={{ height: '20px', width: '20px' }} />
        </button>

        <button
          onClick={() => onNavigate('sell')}
          style={{
            background: 'transparent',
            color: 'white',
            border: '2px solid rgba(255, 255, 255, 0.5)',
            padding: '16px 32px',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Sprzedaj pojazd
        </button>
      </div>

      {/* Quick Stats Preview */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        flexWrap: 'wrap',
        fontSize: '14px',
        color: 'rgba(255, 255, 255, 0.8)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: '800', marginBottom: '4px' }}>
            {stats.totalVehicles}+
          </div>
          <div>aktywnych ofert</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: '800', marginBottom: '4px' }}>
            {stats.uniqueBrands}
          </div>
          <div>marek pojazdów</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: '800', marginBottom: '4px' }}>
            {stats.verifiedSellers}
          </div>
          <div>zweryfikowanych sprzedawców</div>
        </div>
      </div>
    </div>

    <style>
      {`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}
    </style>
  </section>

  {/* Main Content */}
  <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
    {/* Search Section */}
    <section style={{ marginBottom: '80px' }}>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        onSearch={onSearch}
        resultsCount={filteredVehicles.length}
      />
    </section>
    
    {/* Statistics Section */}
    <section style={{ marginBottom: '80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: '800', 
          color: '#1f2937',
          marginBottom: '16px'
        }}>
          Dlaczego wybierają nas tysiące kierowców?
        </h2>
        <p style={{ 
          fontSize: '18px', 
          color: '#6b7280',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Jesteśmy liderami w branży elektrycznej mobilności w Polsce
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '32px'
      }}>
        {statsData.map(({ number, label, icon: Icon, color }, index) => (
          <div 
            key={index} 
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '32px 24px',
              borderRadius: '20px',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              cursor: 'default'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{
              background: color,
              borderRadius: '50%',
              padding: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Icon style={{ height: '32px', width: '32px', color: 'white' }} />
            </div>
            <div style={{ 
              fontSize: '36px', 
              fontWeight: '800', 
              color,
              marginBottom: '8px',
              fontFeatureSettings: '"tnum"'
            }}>
              {number}
            </div>
            <div style={{ 
              color: '#6b7280', 
              fontSize: '16px', 
              fontWeight: '500'
            }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Featured Vehicles Section */}
    <section style={{ marginBottom: '80px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '40px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h2 style={{ 
            fontSize: '32px', 
            fontWeight: '800', 
            color: '#1f2937',
            marginBottom: '8px'
          }}>
            Polecane pojazdy
          </h2>
          <p style={{ 
            fontSize: '16px', 
            color: '#6b7280',
            margin: '0'
          }}>
            Najlepsze oferty od zweryfikowanych sprzedawców
          </p>
        </div>
        <button
          onClick={() => onNavigate('browse')}
          style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Zobacz wszystkie
          <ArrowRight style={{ height: '14px', width: '14px' }} />
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '24px' 
      }}>
        {featuredVehicles.map(vehicle => (
          <VehicleCard 
            key={vehicle.id} 
            vehicle={vehicle}
            onViewDetails={onViewVehicleDetails}
            variant="featured"
          />
        ))}
      </div>

      {featuredVehicles.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '20px',
          border: '2px dashed #d1d5db'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '16px'
          }}>
            🚗
          </div>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '8px'
          }}>
            Brak polecanych pojazdów
          </h3>
          <p style={{ color: '#6b7280' }}>
            Pracujemy nad dodaniem nowych ofert
          </p>
        </div>
      )}
    </section>

    {/* How It Works Section */}
    <section style={{ marginBottom: '80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: '800', 
          color: '#1f2937',
          marginBottom: '16px'
        }}>
          Jak to działa?
        </h2>
        <p style={{ 
          fontSize: '18px', 
          color: '#6b7280',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Sprzedawaj i kupuj pojazdy elektryczne w trzech prostych krokach
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '40px'
      }}>
        {[
          {
            step: '01',
            title: 'Zarejestruj się',
            description: 'Utwórz bezpłatne konto i zostań zweryfikowanym członkiem społeczności',
            icon: '👤',
            color: '#667eea'
          },
          {
            step: '02', 
            title: 'Przeglądaj lub dodaj',
            description: 'Znajdź idealny pojazd lub dodaj swoje ogłoszenie w kilka minut',
            icon: '🔍',
            color: '#10b981'
          },
          {
            step: '03',
            title: 'Sfinalizuj transakcję',
            description: 'Skontaktuj się bezpośrednio ze sprzedawcą i przeprowadź bezpieczną transakcję',
            icon: '🤝',
            color: '#f59e0b'
          }
        ].map((item, index) => (
          <div key={index} style={{
            position: 'relative',
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '32px 24px',
            borderRadius: '20px',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '24px',
              background: item.color,
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '700'
            }}>
              {item.step}
            </div>
            <div style={{
              fontSize: '48px',
              marginBottom: '20px',
              marginTop: '12px'
            }}>
              {item.icon}
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '12px'
            }}>
              {item.title}
            </h3>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6'
            }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>

    {/* CTA Section */}
    <section>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '24px',
        padding: '60px 40px',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '200%',
          height: '200%',
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          zIndex: 1
        }} />
        
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '800',
            marginBottom: '16px'
          }}>
            Dołącz do rewolucji elektrycznej mobilności
          </h2>
          <p style={{
            fontSize: '18px',
            marginBottom: '32px',
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '600px',
            margin: '0 auto 32px auto'
          }}>
            Rozpocznij swoją podróż z pojazdami elektrycznymi już dziś
          </p>
          <button
            onClick={() => onNavigate('browse')}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              color: '#667eea',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Rozpocznij poszukiwania
          </button>
        </div>
      </div>
    </section>
  </div>
</div>
```

);
};

export default HomePage;