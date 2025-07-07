import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  filters: { [key: string]: string };
  onFiltersChange: (filters: { [key: string]: string }) => void;
  onSearch: () => void;
  resultsCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchTermChange,
  filters,
  onFiltersChange,
  onSearch,
  resultsCount
}) => {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
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
            onChange={(e) => onSearchTermChange(e.target.value)}
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
          { 
            key: 'make', 
            label: 'Wszystkie marki', 
            options: ['Wszystkie', 'Tesla', 'BMW', 'Audi', 'Volkswagen', 'BYD'] 
          },
          { 
            key: 'location', 
            label: 'Wszystkie lokalizacje', 
            options: ['Wszystkie', 'Warszawa', 'Kraków', 'Gdańsk', 'Wrocław', 'Poznań'] 
          },
          { 
            key: 'year', 
            label: 'Wszystkie roczniki', 
            options: ['Wszystkie', '2024', '2023', '2022', '2021', '2020'] 
          },
          {
            key: 'priceRange',
            label: 'Wszystkie ceny',
            options: ['Wszystkie', '0-200', '200-300', '300-400', '400-500', '500+']
          }
        ].map(({ key, label, options }) => (
          <select
            key={key}
            value={filters[key] || 'Wszystkie'}
            onChange={(e) => handleFilterChange(key, e.target.value)}
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
                {key === 'priceRange' && option !== '500+' 
                  ? `${option.split('-')[0]}-${option.split('-')[1]} tys. zł`
                  : key === 'priceRange' && option === '500+'
                  ? 'Powyżej 500 tys. zł'
                  : option
                }
              </option>
            ))}
          </select>
        ))}
      </div>

      {/* Advanced Filters */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px',
        marginBottom: '20px'
      }}>
        {[
          {
            key: 'batteryType',
            label: 'Typ baterii',
            options: ['Wszystkie', 'Li-ion', 'LiFePO4', 'NMC', 'LTO']
          },
          {
            key: 'driveType',
            label: 'Napęd',
            options: ['Wszystkie', 'FWD', 'RWD', 'AWD']
          },
          {
            key: 'rangeCategory',
            label: 'Zasięg',
            options: ['Wszystkie', '0-300', '300-400', '400-500', '500+']
          },
          {
            key: 'features',
            label: 'Wyposażenie',
            options: ['Wszystkie', 'Autopilot', 'Podgrzewane fotele', 'Pompa ciepła']
          }
        ].map(({ key, label, options }) => (
          <select
            key={key}
            value={filters[key] || 'Wszystkie'}
            onChange={(e) => handleFilterChange(key, e.target.value)}
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
                {key === 'rangeCategory' && option !== '500+' 
                  ? `${option.split('-')[0]}-${option.split('-')[1]} km`
                  : key === 'rangeCategory' && option === '500+'
                  ? 'Powyżej 500 km'
                  : key === 'driveType' && option === 'FWD'
                  ? 'Przedni (FWD)'
                  : key === 'driveType' && option === 'RWD'
                  ? 'Tylny (RWD)'
                  : key === 'driveType' && option === 'AWD'
                  ? 'Napęd na 4 koła (AWD)'
                  : option
                }
              </option>
            ))}
          </select>
        ))}
      </div>

      <button 
        onClick={onSearch}
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
        Szukaj ({resultsCount})
      </button>
    </div>
  );
};