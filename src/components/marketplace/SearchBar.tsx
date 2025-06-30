// components/marketplace/SearchBar.tsx
import React, { useState } from ‘react’;
import {
Search,
X,
Battery,
Filter,
ChevronDown,
MapPin,
Calendar,
Euro,
Zap,
Settings
} from ‘lucide-react’;

export interface SearchFilters {
make: string;
priceRange: string;
year: string;
location: string;
batteryType: string;
driveType: string;
rangeCategory: string;
chargingSpeed: string;
batteryCapacity: string;
features: string;
}

interface SearchBarProps {
searchTerm: string;
setSearchTerm: (term: string) => void;
filters: SearchFilters;
setFilters: (filters: SearchFilters) => void;
onSearch: () => void;
resultsCount: number;
className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
searchTerm,
setSearchTerm,
filters,
setFilters,
onSearch,
resultsCount,
className = ‘’
}) => {
const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

// Filter configurations
const filterConfigs = {
basic: [
{
key: ‘make’ as keyof SearchFilters,
label: ‘Wszystkie marki’,
icon: Search,
options: [‘Wszystkie’, ‘Tesla’, ‘BMW’, ‘Audi’, ‘Volkswagen’, ‘BYD’, ‘Mercedes’, ‘Hyundai’, ‘Kia’, ‘Polestar’, ‘Nissan’]
},
{
key: ‘location’ as keyof SearchFilters,
label: ‘Wszystkie lokalizacje’,
icon: MapPin,
options: [‘Wszystkie’, ‘Warszawa’, ‘Kraków’, ‘Gdańsk’, ‘Wrocław’, ‘Poznań’, ‘Łódź’, ‘Szczecin’, ‘Lublin’, ‘Katowice’]
},
{
key: ‘year’ as keyof SearchFilters,
label: ‘Wszystkie roczniki’,
icon: Calendar,
options: [‘Wszystkie’, ‘2024’, ‘2023’, ‘2022’, ‘2021’, ‘2020’, ‘2019’, ‘2018’]
},
{
key: ‘priceRange’ as keyof SearchFilters,
label: ‘Wszystkie ceny’,
icon: Euro,
options: [‘Wszystkie’, ‘0-100’, ‘100-200’, ‘200-300’, ‘300-500’, ‘500+’],
getDisplayValue: (option: string) => {
if (option === ‘Wszystkie’) return ‘Wszystkie ceny’;
if (option === ‘500+’) return ‘powyżej 500 000 zł’;
return `${option.replace('-', ' 000 - ')} 000 zł`;
}
}
],
advanced: [
{
key: ‘batteryType’ as keyof SearchFilters,
label: ‘Typ baterii’,
icon: Battery,
options: [‘Wszystkie’, ‘Li-ion’, ‘LiFePO4’, ‘NMC’, ‘LTO’]
},
{
key: ‘driveType’ as keyof SearchFilters,
label: ‘Napęd’,
icon: Settings,
options: [‘Wszystkie’, ‘FWD’, ‘RWD’, ‘AWD’],
getDisplayValue: (option: string) => {
const labels = {
‘FWD’: ‘Napęd przedni’,
‘RWD’: ‘Napęd tylny’,
‘AWD’: ‘Napęd na 4 koła’
};
return labels[option as keyof typeof labels] || option;
}
},
{
key: ‘rangeCategory’ as keyof SearchFilters,
label: ‘Zasięg’,
icon: Zap,
options: [‘Wszystkie’, ‘0-300’, ‘300-400’, ‘400-500’, ‘500+’],
getDisplayValue: (option: string) => {
const labels = {
‘0-300’: ‘do 300 km’,
‘300-400’: ‘300-400 km’,
‘400-500’: ‘400-500 km’,
‘500+’: ‘powyżej 500 km’
};
return labels[option as keyof typeof labels] || option;
}
},
{
key: ‘chargingSpeed’ as keyof SearchFilters,
label: ‘Szybkość ładowania’,
icon: Zap,
options: [‘Wszystkie’, ‘slow’, ‘fast’, ‘ultra’],
getDisplayValue: (option: string) => {
const labels = {
‘slow’: ‘Wolne (do 50kW)’,
‘fast’: ‘Szybkie (50-150kW)’,
‘ultra’: ‘Ultra (150kW+)’
};
return labels[option as keyof typeof labels] || option;
}
},
{
key: ‘batteryCapacity’ as keyof SearchFilters,
label: ‘Pojemność baterii’,
icon: Battery,
options: [‘Wszystkie’, ‘small’, ‘medium’, ‘large’],
getDisplayValue: (option: string) => {
const labels = {
‘small’: ‘Mała (do 60kWh)’,
‘medium’: ‘Średnia (60-80kWh)’,
‘large’: ‘Duża (80kWh+)’
};
return labels[option as keyof typeof labels] || option;
}
},
{
key: ‘features’ as keyof SearchFilters,
label: ‘Dodatkowe funkcje’,
icon: Settings,
options: [‘Wszystkie’, ‘autopilot’, ‘heatpump’, ‘heated’, ‘awd’],
getDisplayValue: (option: string) => {
const labels = {
‘autopilot’: ‘Autopilot’,
‘heatpump’: ‘Pompa ciepła’,
‘heated’: ‘Podgrzewane fotele’,
‘awd’: ‘Napęd 4x4’
};
return labels[option as keyof typeof labels] || option;
}
}
]
};

const handleFilterChange = (key: keyof SearchFilters, value: string) => {
setFilters({…filters, [key]: value});
};

const clearAllFilters = () => {
const clearedFilters: SearchFilters = {
make: ‘Wszystkie’,
priceRange: ‘Wszystkie’,
year: ‘Wszystkie’,
location: ‘Wszystkie’,
batteryType: ‘Wszystkie’,
driveType: ‘Wszystkie’,
rangeCategory: ‘Wszystkie’,
chargingSpeed: ‘Wszystkie’,
batteryCapacity: ‘Wszystkie’,
features: ‘Wszystkie’
};
setFilters(clearedFilters);
setSearchTerm(’’);
};

const getActiveFiltersCount = () => {
return Object.entries(filters).filter(([key, value]) => value !== ‘Wszystkie’).length;
};

const handleKeyPress = (e: React.KeyboardEvent) => {
if (e.key === ‘Enter’) {
onSearch();
}
};

return (
<div className={className} style={{
background: ‘rgba(255, 255, 255, 0.95)’,
padding: ‘24px’,
borderRadius: ‘16px’,
boxShadow: ‘0 8px 32px rgba(0, 0, 0, 0.1)’,
backdropFilter: ‘blur(10px)’,
border: ‘1px solid rgba(255, 255, 255, 0.2)’,
marginBottom: ‘32px’
}}>
{/* Search Input */}
<div style={{ marginBottom: ‘20px’ }}>
<div style={{ position: ‘relative’ }}>
<Search style={{
position: ‘absolute’,
left: ‘12px’,
top: ‘50%’,
transform: ‘translateY(-50%)’,
height: ‘16px’,
width: ‘16px’,
color: ‘#9ca3af’
}} />
<input
type=“text”
placeholder=“Szukaj pojazdu elektrycznego… (marka, model, lokalizacja)”
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
onKeyPress={handleKeyPress}
style={{
width: ‘100%’,
paddingLeft: ‘40px’,
paddingRight: searchTerm ? ‘40px’ : ‘16px’,
paddingTop: ‘12px’,
paddingBottom: ‘12px’,
border: ‘2px solid #e5e7eb’,
borderRadius: ‘12px’,
fontSize: ‘14px’,
outline: ‘none’,
transition: ‘all 0.3s ease’,
background: ‘white’
}}
onFocus={(e) => {
e.target.style.borderColor = ‘#667eea’;
e.target.style.boxShadow = ‘0 0 0 3px rgba(102, 126, 234, 0.1)’;
}}
onBlur={(e) => {
e.target.style.borderColor = ‘#e5e7eb’;
e.target.style.boxShadow = ‘none’;
}}
/>
{/* Clear search button */}
{searchTerm && (
<button
onClick={() => setSearchTerm(’’)}
style={{
position: ‘absolute’,
right: ‘12px’,
top: ‘50%’,
transform: ‘translateY(-50%)’,
background: ‘none’,
border: ‘none’,
cursor: ‘pointer’,
color: ‘#9ca3af’,
padding: ‘2px’
}}
>
<X style={{ height: ‘16px’, width: ‘16px’ }} />
</button>
)}
</div>
</div>

```
  {/* Basic Filters */}
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
    gap: '16px',
    marginBottom: '20px'
  }}>
    {filterConfigs.basic.map(({ key, label, icon: Icon, options, getDisplayValue }) => (
      <div key={key} style={{ position: 'relative' }}>
        <Icon style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          height: '14px',
          width: '14px',
          color: '#6b7280',
          zIndex: 1
        }} />
        <select
          value={filters[key]}
          onChange={(e) => handleFilterChange(key, e.target.value)}
          style={{
            width: '100%',
            paddingLeft: '36px',
            paddingRight: '32px',
            padding: '12px 32px 12px 36px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '14px',
            outline: 'none',
            background: 'white',
            cursor: 'pointer',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 8px center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '16px'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#667eea';
            e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e5e7eb';
            e.target.style.boxShadow = 'none';
          }}
        >
          <option value="Wszystkie">{label}</option>
          {options.slice(1).map(option => (
            <option key={option} value={option}>
              {getDisplayValue ? getDisplayValue(option) : option}
            </option>
          ))}
        </select>
      </div>
    ))}
  </div>

  {/* Advanced Filters Toggle */}
  <div style={{ 
    borderTop: '1px solid #e5e7eb',
    paddingTop: '20px',
    marginBottom: showAdvancedFilters ? '20px' : '0'
  }}>
    <button
      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'none',
        border: 'none',
        color: '#4b5563',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        padding: '8px 0',
        marginBottom: showAdvancedFilters ? '16px' : '0'
      }}
    >
      <Battery style={{ height: '16px', width: '16px' }} />
      Filtry specjalistyczne EV
      {getActiveFiltersCount() > 0 && (
        <span style={{
          background: '#667eea',
          color: 'white',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: '700'
        }}>
          {getActiveFiltersCount()}
        </span>
      )}
      <ChevronDown 
        style={{ 
          height: '16px', 
          width: '16px',
          transform: showAdvancedFilters ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease'
        }} 
      />
    </button>
    
    {/* Advanced Filters */}
    {showAdvancedFilters && (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
        gap: '16px',
        background: '#f8fafc',
        padding: '16px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0'
      }}>
        {filterConfigs.advanced.map(({ key, label, icon: Icon, options, getDisplayValue }) => (
          <div key={key} style={{ position: 'relative' }}>
            <Icon style={{
              position: 'absolute',
              left: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              height: '12px',
              width: '12px',
              color: '#6b7280',
              zIndex: 1
            }} />
            <select
              value={filters[key]}
              onChange={(e) => handleFilterChange(key, e.target.value)}
              style={{
                width: '100%',
                paddingLeft: '28px',
                padding: '10px 28px 10px 28px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '12px',
                outline: 'none',
                background: 'white',
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 6px center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '12px'
              }}
            >
              <option value="Wszystkie">{label}</option>
              {options.slice(1).map(option => (
                <option key={option} value={option}>
                  {getDisplayValue ? getDisplayValue(option) : option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    )}
  </div>

  {/* Action Buttons */}
  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', alignItems: 'center' }}>
    {/* Results Counter */}
    <div style={{ 
      color: '#6b7280', 
      fontSize: '14px',
      marginRight: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }}>
      <Filter style={{ height: '14px', width: '14px' }} />
      Znaleziono <strong>{resultsCount}</strong> pojazd{resultsCount === 1 ? '' : resultsCount < 5 ? 'y' : 'ów'}
    </div>

    {/* Clear Filters Button */}
    <button 
      onClick={clearAllFilters}
      disabled={getActiveFiltersCount() === 0 && !searchTerm}
      style={{
        background: getActiveFiltersCount() === 0 && !searchTerm ? '#f3f4f6' : '#6b7280',
        color: getActiveFiltersCount() === 0 && !searchTerm ? '#9ca3af' : 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: getActiveFiltersCount() === 0 && !searchTerm ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        if (getActiveFiltersCount() > 0 || searchTerm) {
          e.currentTarget.style.background = '#4b5563';
        }
      }}
      onMouseLeave={(e) => {
        if (getActiveFiltersCount() > 0 || searchTerm) {
          e.currentTarget.style.background = '#6b7280';
        }
      }}
    >
      <X style={{ height: '16px', width: '16px' }} />
      Wyczyść filtry
    </button>
    
    {/* Search Button */}
    <button 
      onClick={onSearch}
      style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
        minWidth: '120px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-1px)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.4)';
      }}
    >
      <Search style={{ height: '16px', width: '16px' }} />
      Szukaj
    </button>
  </div>

  {/* Quick Filters Pills */}
  {(getActiveFiltersCount() > 0 || searchTerm) && (
    <div style={{
      marginTop: '16px',
      paddingTop: '16px',
      borderTop: '1px solid #e5e7eb'
    }}>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '8px',
        alignItems: 'center'
      }}>
        <span style={{ 
          fontSize: '12px', 
          color: '#6b7280', 
          fontWeight: '600',
          marginRight: '8px'
        }}>
          Aktywne filtry:
        </span>
        
        {searchTerm && (
          <div style={{
            background: '#667eea',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '16px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Search style={{ height: '10px', width: '10px' }} />
            "{searchTerm}"
            <button
              onClick={() => setSearchTerm('')}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '0',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X style={{ height: '10px', width: '10px' }} />
            </button>
          </div>
        )}
        
        {Object.entries(filters)
          .filter(([_, value]) => value !== 'Wszystkie')
          .map(([key, value]) => {
            const config = [...filterConfigs.basic, ...filterConfigs.advanced]
              .find(f => f.key === key);
            const displayValue = config?.getDisplayValue ? config.getDisplayValue(value) : value;
            
            return (
              <div key={key} style={{
                background: '#10b981',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '16px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {displayValue}
                <button
                  onClick={() => handleFilterChange(key as keyof SearchFilters, 'Wszystkie')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    padding: '0',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <X style={{ height: '10px', width: '10px' }} />
                </button>
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

export default SearchBar;