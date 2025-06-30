// pages/BrowsePage.tsx
import React, { useState } from ‘react’;
import {
Car,
AlertCircle,
Filter,
Grid,
List,
SortAsc,
SortDesc,
Heart,
Star,
Shield,
TrendingUp
} from ‘lucide-react’;
import VehicleCard from ‘../components/marketplace/VehicleCard’;
import SearchBar, { SearchFilters } from ‘../components/marketplace/SearchBar’;
import { Vehicle } from ‘../types/Vehicle’;

interface BrowsePageProps {
vehicles: Vehicle[];
searchTerm: string;
setSearchTerm: (term: string) => void;
filters: SearchFilters;
setFilters: (filters: SearchFilters) => void;
filteredVehicles: Vehicle[];
onSearch: () => void;
onViewVehicleDetails: (vehicle: Vehicle) => void;
onContactSeller?: (vehicle: Vehicle, method: ‘phone’ | ‘email’) => void;
onToggleFavorite?: (vehicleId: number) => void;
favoriteVehicles?: number[];
className?: string;
}

export type SortOption = ‘newest’ | ‘oldest’ | ‘price_low’ | ‘price_high’ | ‘range_high’ | ‘range_low’ | ‘mileage_low’ | ‘mileage_high’;
export type ViewMode = ‘grid’ | ‘list’;

const BrowsePage: React.FC<BrowsePageProps> = ({
vehicles,
searchTerm,
setSearchTerm,
filters,
setFilters,
filteredVehicles,
onSearch,
onViewVehicleDetails,
onContactSeller,
onToggleFavorite,
favoriteVehicles = [],
className = ‘’
}) => {
const [sortBy, setSortBy] = useState<SortOption>(‘newest’);
const [viewMode, setViewMode] = useState<ViewMode>(‘grid’);
const [currentPage, setCurrentPage] = useState(1);
const [vehiclesPerPage] = useState(12);

// Sort vehicles based on selected option
const getSortedVehicles = () => {
const vehicles = […filteredVehicles];

```
switch (sortBy) {
  case 'newest':
    return vehicles.sort((a, b) => b.year - a.year);
  case 'oldest':
    return vehicles.sort((a, b) => a.year - b.year);
  case 'price_low':
    return vehicles.sort((a, b) => a.price - b.price);
  case 'price_high':
    return vehicles.sort((a, b) => b.price - a.price);
  case 'range_high':
    return vehicles.sort((a, b) => b.range - a.range);
  case 'range_low':
    return vehicles.sort((a, b) => a.range - b.range);
  case 'mileage_low':
    return vehicles.sort((a, b) => (a.mileage || 0) - (b.mileage || 0));
  case 'mileage_high':
    return vehicles.sort((a, b) => (b.mileage || 0) - (a.mileage || 0));
  default:
    return vehicles;
}
```

};

const sortedVehicles = getSortedVehicles();

// Pagination
const totalPages = Math.ceil(sortedVehicles.length / vehiclesPerPage);
const startIndex = (currentPage - 1) * vehiclesPerPage;
const endIndex = startIndex + vehiclesPerPage;
const currentVehicles = sortedVehicles.slice(startIndex, endIndex);

// Sort options configuration
const sortOptions = [
{ value: ‘newest’, label: ‘Najnowsze’, icon: SortDesc },
{ value: ‘oldest’, label: ‘Najstarsze’, icon: SortAsc },
{ value: ‘price_low’, label: ‘Cena: od najniższej’, icon: SortAsc },
{ value: ‘price_high’, label: ‘Cena: od najwyższej’, icon: SortDesc },
{ value: ‘range_high’, label: ‘Zasięg: od największego’, icon: SortDesc },
{ value: ‘range_low’, label: ‘Zasięg: od najmniejszego’, icon: SortAsc },
{ value: ‘mileage_low’, label: ‘Przebieg: od najmniejszego’, icon: SortAsc },
{ value: ‘mileage_high’, label: ‘Przebieg: od największego’, icon: SortDesc }
] as const;

const handleSortChange = (newSort: SortOption) => {
setSortBy(newSort);
setCurrentPage(1); // Reset to first page when sorting changes
};

const renderPagination = () => {
if (totalPages <= 1) return null;

```
const pages = [];
const maxVisiblePages = 5;
let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

if (endPage - startPage + 1 < maxVisiblePages) {
  startPage = Math.max(1, endPage - maxVisiblePages + 1);
}

// Previous button
if (currentPage > 1) {
  pages.push(
    <button
      key="prev"
      onClick={() => setCurrentPage(currentPage - 1)}
      style={{
        padding: '8px 12px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        background: 'white',
        color: '#374151',
        cursor: 'pointer',
        fontSize: '14px'
      }}
    >
      ←
    </button>
  );
}

// Page numbers
for (let i = startPage; i <= endPage; i++) {
  pages.push(
    <button
      key={i}
      onClick={() => setCurrentPage(i)}
      style={{
        padding: '8px 12px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        background: i === currentPage ? '#10b981' : 'white',
        color: i === currentPage ? 'white' : '#374151',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: i === currentPage ? '600' : '400'
      }}
    >
      {i}
    </button>
  );
}

// Next button
if (currentPage < totalPages) {
  pages.push(
    <button
      key="next"
      onClick={() => setCurrentPage(currentPage + 1)}
      style={{
        padding: '8px 12px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        background: 'white',
        color: '#374151',
        cursor: 'pointer',
        fontSize: '14px'
      }}
    >
      →
    </button>
  );
}

return (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '40px'
  }}>
    {pages}
  </div>
);
```

};

return (
<div className={className} style={{ maxWidth: ‘1200px’, margin: ‘0 auto’, padding: ‘40px 20px’ }}>
{/* Page Header */}
<div style={{ marginBottom: ‘32px’ }}>
<h1 style={{
fontSize: ‘36px’,
fontWeight: ‘800’,
marginBottom: ‘8px’,
color: ‘#1f2937’
}}>
Przeglądaj pojazdy elektryczne
</h1>
<p style={{
color: ‘#6b7280’,
fontSize: ‘18px’,
margin: ‘0’
}}>
Znajdź idealny pojazd elektryczny spośród {vehicles.length} dostępnych ofert
</p>
</div>

```
  {/* Search Bar */}
  <SearchBar
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
    filters={filters}
    setFilters={setFilters}
    onSearch={onSearch}
    resultsCount={filteredVehicles.length}
  />
  
  {/* Under Construction Notice */}
  <div style={{
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: '60px 40px',
    textAlign: 'center',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    marginBottom: '40px',
    border: '2px solid #fbbf24'
  }}>
    <div style={{
      background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
      borderRadius: '50%',
      padding: '24px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '24px'
    }}>
      <AlertCircle style={{ height: '48px', width: '48px', color: 'white' }} />
    </div>
    
    <h2 style={{ 
      fontSize: '28px', 
      fontWeight: '700', 
      marginBottom: '16px', 
      color: '#1f2937' 
    }}>
      🚧 Strona w budowie
    </h2>
    
    <p style={{ 
      color: '#6b7280', 
      fontSize: '18px', 
      lineHeight: '1.6', 
      marginBottom: '32px', 
      maxWidth: '600px', 
      margin: '0 auto 32px' 
    }}>
      Obecnie pracujemy nad dodaniem prawdziwych ofert pojazdów elektrycznych. 
      Wkrótce będziesz mógł przeglądać i kupować pojazdy od zweryfikowanych sprzedawców.
    </p>
    
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '24px',
      marginTop: '40px'
    }}>
      {[
        { icon: '🔍', title: 'Weryfikowani sprzedawcy', desc: 'Tylko sprawdzone osoby i firmy' },
        { icon: '📋', title: 'Pełna dokumentacja', desc: 'Historia serwisowa i przeglądy' },
        { icon: '💰', title: 'Bezpieczne płatności', desc: 'Gwarancja zwrotu pieniędzy' },
        { icon: '🚗', title: 'Inspekcja techniczna', desc: 'Sprawdzony stan techniczny' }
      ].map(({ icon, title, desc }, index) => (
        <div key={index} style={{
          background: '#f8fafc',
          padding: '24px',
          borderRadius: '16px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>{icon}</div>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            color: '#1f2937', 
            marginBottom: '8px' 
          }}>
            {title}
          </h3>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '14px', 
            lineHeight: '1.5',
            margin: '0'
          }}>
            {desc}
          </p>
        </div>
      ))}
    </div>
    
    <div style={{ marginTop: '40px' }}>
      <p style={{ color: '#6b7280', marginBottom: '16px' }}>
        Chcesz być pierwszym, który dowie się o uruchomieniu? 
      </p>
      <button
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
          transition: 'all 0.3s ease'
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
        📧 Zapisz się na powiadomienia
      </button>
    </div>
  </div>

  {/* Controls Bar */}
  <div style={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '16px'
  }}>
    {/* Results Info */}
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px',
      color: '#6b7280', 
      fontSize: '16px'
    }}>
      <Filter style={{ height: '16px', width: '16px' }} />
      <span>
        Znaleziono <strong style={{ color: '#1f2937' }}>{filteredVehicles.length}</strong> pojazd
        {filteredVehicles.length === 1 ? '' : filteredVehicles.length < 5 ? 'y' : 'ów'}
        {filteredVehicles.length > 0 && (
          <span>
            {' '}(strona {currentPage} z {totalPages})
          </span>
        )}
      </span>
    </div>

    {/* Controls */}
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      {/* Sort Dropdown */}
      <select
        value={sortBy}
        onChange={(e) => handleSortChange(e.target.value as SortOption)}
        style={{
          padding: '8px 12px',
          border: '2px solid #e5e7eb',
          borderRadius: '8px',
          fontSize: '14px',
          outline: 'none',
          background: 'white',
          cursor: 'pointer',
          minWidth: '180px'
        }}
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* View Mode Toggle */}
      <div style={{
        display: 'flex',
        background: '#f3f4f6',
        borderRadius: '8px',
        padding: '2px'
      }}>
        <button
          onClick={() => setViewMode('grid')}
          style={{
            padding: '8px',
            border: 'none',
            borderRadius: '6px',
            background: viewMode === 'grid' ? 'white' : 'transparent',
            color: viewMode === 'grid' ? '#10b981' : '#6b7280',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Grid style={{ height: '16px', width: '16px' }} />
        </button>
        <button
          onClick={() => setViewMode('list')}
          style={{
            padding: '8px',
            border: 'none',
            borderRadius: '6px',
            background: viewMode === 'list' ? 'white' : 'transparent',
            color: viewMode === 'list' ? '#10b981' : '#6b7280',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <List style={{ height: '16px', width: '16px' }} />
        </button>
      </div>
    </div>
  </div>
  
  {/* Vehicle Grid/List */}
  {currentVehicles.length > 0 ? (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: viewMode === 'grid' 
        ? 'repeat(auto-fit, minmax(320px, 1fr))' 
        : '1fr', 
      gap: '24px',
      marginBottom: '40px'
    }}>
      {currentVehicles.map(vehicle => (
        <div key={vehicle.id} style={{ position: 'relative' }}>
          <VehicleCard 
            vehicle={vehicle}
            onViewDetails={onViewVehicleDetails}
            onContactSeller={onContactSeller}
            onToggleFavorite={onToggleFavorite}
            isFavorite={favoriteVehicles.includes(vehicle.id)}
            variant={viewMode === 'list' ? 'default' : 'default'}
            showContactButtons={viewMode === 'list'}
          />
          {/* Demo Badge */}
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: '#fbbf24',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            zIndex: 2
          }}>
            DEMO
          </div>
        </div>
      ))}
    </div>
  ) : (
    /* No Results */
    <div style={{ 
      textAlign: 'center', 
      padding: '60px 20px',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    }}>
      <Car style={{ 
        height: '64px', 
        width: '64px', 
        color: '#9ca3af', 
        margin: '0 auto 16px' 
      }} />
      <h3 style={{ 
        fontSize: '24px', 
        fontWeight: '600', 
        color: '#1f2937', 
        marginBottom: '8px' 
      }}>
        Brak wyników
      </h3>
      <p style={{ 
        color: '#6b7280', 
        fontSize: '16px',
        marginBottom: '24px'
      }}>
        Spróbuj zmienić kryteria wyszukiwania lub wyczyść filtry
      </p>
      <button
        onClick={() => {
          setSearchTerm('');
          setFilters({
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
        }}
        style={{
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        Wyczyść wszystkie filtry
      </button>
    </div>
  )}

  {/* Pagination */}
  {renderPagination()}

  {/* Quick Stats */}
  {filteredVehicles.length > 0 && (
    <div style={{
      marginTop: '60px',
      padding: '32px',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        Statystyki wyników wyszukiwania
      </h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '24px'
      }}>
        {[
          {
            label: 'Średnia cena',
            value: `${Math.round(filteredVehicles.reduce((acc, v) => acc + v.price, 0) / filteredVehicles.length / 1000)}k zł`,
            icon: TrendingUp,
            color: '#667eea'
          },
          {
            label: 'Średni zasięg',
            value: `${Math.round(filteredVehicles.reduce((acc, v) => acc + v.range, 0) / filteredVehicles.length)} km`,
            icon: Car,
            color: '#10b981'
          },
          {
            label: 'Zweryfikowani',
            value: `${filteredVehicles.filter(v => v.seller?.verified).length}/${filteredVehicles.length}`,
            icon: Shield,
            color: '#f59e0b'
          },
          {
            label: 'Średnia ocena',
            value: `${(filteredVehicles.reduce((acc, v) => acc + (v.seller?.rating || 0), 0) / filteredVehicles.length).toFixed(1)}`,
            icon: Star,
            color: '#ef4444'
          }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} style={{
              textAlign: 'center',
              padding: '16px'
            }}>
              <Icon style={{
                height: '24px',
                width: '24px',
                color: stat.color,
                margin: '0 auto 8px'
              }} />
              <div style={{
                fontSize: '20px',
                fontWeight: '700',
                color: stat.color,
                marginBottom: '4px'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#6b7280'
              }}>
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )}
</div>
```

);
};

export default BrowsePage;