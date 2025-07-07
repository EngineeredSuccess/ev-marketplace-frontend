import React from 'react';
import { Vehicle } from '../../types/Vehicle';
import { SearchBar } from '../marketplace/SearchBar';
import { VehicleCard } from '../marketplace/VehicleCard';

interface BrowsePageProps {
  filteredVehicles: Vehicle[];
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  filters: { [key: string]: string };
  onFiltersChange: (filters: { [key: string]: string }) => void;
  onSearch: () => void;
  onVehicleSelect: (vehicle: Vehicle) => void;
  onViewChange: (view: string) => void;
  onTrackEvent?: (action: string, data?: any) => void;
}

export const BrowsePage: React.FC<BrowsePageProps> = ({
  filteredVehicles,
  searchTerm,
  onSearchTermChange,
  filters,
  onFiltersChange,
  onSearch,
  onVehicleSelect,
  onViewChange,
  onTrackEvent
}) => {
  const handleViewDetails = (vehicle: Vehicle) => {
    onVehicleSelect(vehicle);
    onViewChange('details');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '32px', color: '#1f2937' }}>
        Przeglądaj pojazdy elektryczne
      </h1>
      
      <SearchBar
        searchTerm={searchTerm}
        onSearchTermChange={onSearchTermChange}
        filters={filters}
        onFiltersChange={onFiltersChange}
        onSearch={onSearch}
        resultsCount={filteredVehicles.length}
      />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Znaleziono {filteredVehicles.length} pojazd(ów)
        </p>
        
        {/* Sort Options */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ fontSize: '14px', color: '#6b7280' }}>Sortuj według:</label>
          <select style={{
            padding: '8px 12px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
            background: 'white',
            cursor: 'pointer'
          }}>
            <option value="price-asc">Cena: od najniższej</option>
            <option value="price-desc">Cena: od najwyższej</option>
            <option value="year-desc">Rok: od najnowszego</option>
            <option value="year-asc">Rok: od najstarszego</option>
            <option value="range-desc">Zasięg: od największego</option>
            <option value="range-asc">Zasięg: od najmniejszego</option>
          </select>
        </div>
      </div>
      
      {filteredVehicles.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          marginTop: '40px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', marginBottom: '12px' }}>
            Nie znaleziono pojazdów
          </h3>
          <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '24px' }}>
            Spróbuj zmienić kryteria wyszukiwania lub wyczyść filtry
          </p>
          <button
            onClick={() => onFiltersChange({
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
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Wyczyść filtry
          </button>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '24px' 
        }}>
          {filteredVehicles.map(vehicle => (
            <VehicleCard 
              key={vehicle.id} 
              vehicle={vehicle} 
              onViewDetails={handleViewDetails}
              onTrackEvent={onTrackEvent}
            />
          ))}
        </div>
      )}

      {/* Load More Button (for future pagination) */}
      {filteredVehicles.length > 0 && filteredVehicles.length >= 12 && (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button style={{
            background: 'transparent',
            color: '#10b981',
            border: '2px solid #10b981',
            padding: '12px 24px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Załaduj więcej pojazdów
          </button>
        </div>
      )}
    </div>
  );
};