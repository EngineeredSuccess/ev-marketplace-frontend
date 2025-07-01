import React from 'react';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { Vehicle } from '../../types/Vehicle';
import { SearchBar } from '../marketplace/SearchBar';
import { VehicleCard } from '../marketplace/VehicleCard';

interface HomePageProps {
  vehicles: Vehicle[];
  filteredVehicles: Vehicle[];
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  filters: { [key: string]: string };
  onFiltersChange: (filters: { [key: string]: string }) => void;
  onSearch: () => void;
  onViewChange: (view: string) => void;
  onVehicleSelect: (vehicle: Vehicle) => void;
  onTrackEvent?: (action: string, data?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  vehicles,
  filteredVehicles,
  searchTerm,
  onSearchTermChange,
  filters,
  onFiltersChange,
  onSearch,
  onViewChange,
  onVehicleSelect,
  onTrackEvent
}) => {
  const handleViewDetails = (vehicle: Vehicle) => {
    onVehicleSelect(vehicle);
    onViewChange('details');
  };

  return (
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

      {/* Hero Section */}
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
            onClick={() => onViewChange('browse')}
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

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <SearchBar
          searchTerm={searchTerm}
          onSearchTermChange={onSearchTermChange}
          filters={filters}
          onFiltersChange={onFiltersChange}
          onSearch={onSearch}
          resultsCount={filteredVehicles.length}
        />
        
        {/* Statistics */}
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
              <VehicleCard 
                key={vehicle.id} 
                vehicle={vehicle} 
                onViewDetails={handleViewDetails}
                onTrackEvent={onTrackEvent}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};