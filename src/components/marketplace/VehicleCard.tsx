// components/marketplace/VehicleCard.tsx
import React, { useState } from ‘react’;
import {
Battery,
Zap,
MapPin,
Car,
ArrowRight,
Heart,
Star,
Phone,
Mail,
Shield,
Info
} from ‘lucide-react’;
import { Vehicle } from ‘../../types/Vehicle’;

interface VehicleCardProps {
vehicle: Vehicle;
onViewDetails: (vehicle: Vehicle) => void;
onContactSeller?: (vehicle: Vehicle, method: ‘phone’ | ‘email’) => void;
onToggleFavorite?: (vehicleId: number) => void;
isFavorite?: boolean;
showContactButtons?: boolean;
variant?: ‘default’ | ‘compact’ | ‘featured’;
className?: string;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
vehicle,
onViewDetails,
onContactSeller,
onToggleFavorite,
isFavorite = false,
showContactButtons = false,
variant = ‘default’,
className = ‘’
}) => {
const [imageLoaded, setImageLoaded] = useState(false);
const [imageError, setImageError] = useState(false);

// Get card dimensions based on variant
const getCardStyles = () => {
const baseStyles = {
background: ‘rgba(255, 255, 255, 0.95)’,
borderRadius: ‘20px’,
overflow: ‘hidden’,
boxShadow: ‘0 8px 32px rgba(0, 0, 0, 0.1)’,
transition: ‘all 0.4s ease’,
border: ‘1px solid rgba(255, 255, 255, 0.2)’,
backdropFilter: ‘blur(10px)’,
cursor: ‘pointer’,
position: ‘relative’ as const
};

```
switch (variant) {
  case 'compact':
    return { ...baseStyles, maxWidth: '280px' };
  case 'featured':
    return { 
      ...baseStyles, 
      border: '2px solid #667eea',
      boxShadow: '0 12px 40px rgba(102, 126, 234, 0.2)'
    };
  default:
    return baseStyles;
}
```

};

// Format price with Polish locale
const formatPrice = (price: number) => {
return new Intl.NumberFormat(‘pl-PL’, {
style: ‘currency’,
currency: ‘PLN’,
minimumFractionDigits: 0
}).format(price);
};

// Calculate efficiency rating
const getEfficiencyRating = (efficiency: number) => {
if (efficiency <= 15) return { label: ‘Bardzo dobra’, color: ‘#10b981’ };
if (efficiency <= 18) return { label: ‘Dobra’, color: ‘#f59e0b’ };
if (efficiency <= 22) return { label: ‘Średnia’, color: ‘#ef4444’ };
return { label: ‘Słaba’, color: ‘#dc2626’ };
};

// Get charging speed category
const getChargingSpeedCategory = (speed: number) => {
if (speed >= 150) return { label: ‘Ultra-fast’, color: ‘#8b5cf6’ };
if (speed >= 50) return { label: ‘Fast’, color: ‘#10b981’ };
return { label: ‘Standard’, color: ‘#6b7280’ };
};

const handleCardClick = (e: React.MouseEvent) => {
// Don’t trigger if clicking on action buttons
if ((e.target as HTMLElement).closest(’.action-button’)) {
return;
}
onViewDetails(vehicle);
};

const handleFavoriteClick = (e: React.MouseEvent) => {
e.stopPropagation();
onToggleFavorite?.(vehicle.id);
};

const handleContactClick = (method: ‘phone’ | ‘email’, e: React.MouseEvent) => {
e.stopPropagation();
onContactSeller?.(vehicle, method);
};

const efficiencyRating = getEfficiencyRating(vehicle.efficiency);
const chargingCategory = getChargingSpeedCategory(vehicle.maxChargingSpeed);

return (
<div
className={className}
style={getCardStyles()}
onClick={handleCardClick}
onMouseEnter={(e) => {
e.currentTarget.style.transform = ‘translateY(-8px)’;
e.currentTarget.style.boxShadow = variant === ‘featured’
? ‘0 20px 40px rgba(102, 126, 234, 0.3)’
: ‘0 20px 40px rgba(0, 0, 0, 0.15)’;
}}
onMouseLeave={(e) => {
e.currentTarget.style.transform = ‘translateY(0)’;
e.currentTarget.style.boxShadow = variant === ‘featured’
? ‘0 12px 40px rgba(102, 126, 234, 0.2)’
: ‘0 8px 32px rgba(0, 0, 0, 0.1)’;
}}
>
{/* Featured Badge */}
{variant === ‘featured’ && (
<div style={{
position: ‘absolute’,
top: ‘12px’,
left: ‘12px’,
background: ‘linear-gradient(135deg, #667eea, #764ba2)’,
color: ‘white’,
padding: ‘4px 12px’,
borderRadius: ‘20px’,
fontSize: ‘12px’,
fontWeight: ‘600’,
zIndex: 2,
display: ‘flex’,
alignItems: ‘center’,
gap: ‘4px’
}}>
<Star style={{ height: ‘12px’, width: ‘12px’ }} />
Polecane
</div>
)}

```
  {/* Favorite Button */}
  {onToggleFavorite && (
    <button
      className="action-button"
      onClick={handleFavoriteClick}
      style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        background: 'rgba(255, 255, 255, 0.9)',
        border: 'none',
        borderRadius: '50%',
        padding: '8px',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',
        zIndex: 2,
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <Heart 
        style={{ 
          height: '16px', 
          width: '16px', 
          color: isFavorite ? '#ef4444' : '#6b7280',
          fill: isFavorite ? '#ef4444' : 'none'
        }} 
      />
    </button>
  )}

  {/* Vehicle Image */}
  <div style={{ position: 'relative', height: variant === 'compact' ? '160px' : '200px' }}>
    {!imageError ? (
      <img
        src={vehicle.photos?.[0] || "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400"}
        alt={`${vehicle.make} ${vehicle.model}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
    ) : (
      <div style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <Car style={{ height: '32px', width: '32px', color: '#9ca3af' }} />
        <span style={{ fontSize: '12px', color: '#6b7280' }}>Brak zdjęcia</span>
      </div>
    )}

    {/* Loading skeleton */}
    {!imageLoaded && !imageError && (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'loading 1.5s infinite'
      }} />
    )}

    {/* Year Badge */}
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

    {/* Verification Badge */}
    {vehicle.seller?.verified && (
      <div style={{
        position: 'absolute',
        bottom: '12px',
        right: '12px',
        background: 'rgba(16, 185, 129, 0.9)',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '10px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '2px'
      }}>
        <Shield style={{ height: '10px', width: '10px' }} />
        Zweryfikowany
      </div>
    )}
  </div>
  
  {/* Card Content */}
  <div style={{ padding: variant === 'compact' ? '16px' : '20px' }}>
    {/* Header */}
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'flex-start', 
      marginBottom: '12px' 
    }}>
      <div style={{ flex: 1 }}>
        <h3 style={{ 
          fontSize: variant === 'compact' ? '16px' : '18px', 
          fontWeight: '700', 
          color: '#1f2937',
          margin: '0 0 4px 0',
          lineHeight: '1.2'
        }}>
          {vehicle.make} {vehicle.model}
        </h3>
        {vehicle.seller && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px',
            fontSize: '12px',
            color: '#6b7280'
          }}>
            <span>{vehicle.seller.name}</span>
            {vehicle.seller.verified && (
              <Shield style={{ height: '12px', width: '12px', color: '#10b981' }} />
            )}
            {vehicle.seller.rating && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <Star style={{ height: '10px', width: '10px', color: '#fbbf24', fill: '#fbbf24' }} />
                <span>{vehicle.seller.rating}</span>
              </div>
            )}
          </div>
        )}
      </div>
      <div style={{ 
        fontSize: variant === 'compact' ? '16px' : '18px', 
        fontWeight: '700', 
        background: 'linear-gradient(135deg, #10b981, #059669)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'right'
      }}>
        {formatPrice(vehicle.price)}
      </div>
    </div>
    
    {/* Description */}
    {variant !== 'compact' && (
      <p style={{ 
        color: '#6b7280', 
        marginBottom: '16px', 
        fontSize: '14px',
        lineHeight: '1.5',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {vehicle.description}
      </p>
    )}
    
    {/* Key Specs Grid */}
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: variant === 'compact' ? '1fr 1fr' : '1fr 1fr', 
      gap: '12px', 
      marginBottom: '16px',
      fontSize: '12px'
    }}>
      {[
        { 
          icon: Battery, 
          text: `${vehicle.batteryCapacity} kWh`, 
          subtext: vehicle.batteryType,
          color: '#667eea'
        },
        { 
          icon: Zap, 
          text: `${vehicle.range} km`, 
          subtext: `${vehicle.efficiency} kWh/100km`,
          color: efficiencyRating.color
        },
        { 
          icon: MapPin, 
          text: vehicle.location, 
          subtext: vehicle.mileage ? `${vehicle.mileage.toLocaleString('pl-PL')} km` : 'Brak danych',
          color: '#6b7280'
        },
        { 
          icon: Car, 
          text: `${vehicle.powerOutput} kW`, 
          subtext: vehicle.driveType,
          color: '#10b981'
        }
      ].map(({ icon: Icon, text, subtext, color }, index) => (
        <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
            <Icon style={{ height: '14px', width: '14px', marginRight: '6px', color }} />
            <span style={{ fontWeight: '600', color: '#1f2937' }}>{text}</span>
          </div>
          <div style={{ fontSize: '11px', color: '#9ca3af', paddingLeft: '20px' }}>
            {subtext}
          </div>
        </div>
      ))}
    </div>

    {/* Features Tags */}
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
          background: chargingCategory.color,
          color: 'white',
          padding: '2px 8px',
          borderRadius: '12px',
          fontSize: '10px',
          fontWeight: '600'
        }}>
          {chargingCategory.label}
        </span>
      )}
      {vehicle.heatedSeats && (
        <span style={{
          background: '#f59e0b',
          color: 'white',
          padding: '2px 8px',
          borderRadius: '12px',
          fontSize: '10px',
          fontWeight: '600'
        }}>
          Podgrzewane fotele
        </span>
      )}
    </div>

    {/* Action Buttons */}
    <div style={{ 
      display: 'flex', 
      gap: '8px',
      alignItems: 'center'
    }}>
      <button
        className="action-button"
        onClick={handleCardClick}
        style={{
          flex: 1,
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white',
          border: 'none',
          padding: variant === 'compact' ? '8px 16px' : '10px 20px',
          borderRadius: '10px',
          fontSize: variant === 'compact' ? '12px' : '14px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {variant === 'compact' ? 'Szczegóły' : 'Zobacz szczegóły'}
        <ArrowRight style={{ height: '14px', width: '14px' }} />
      </button>

      {/* Contact Buttons */}
      {showContactButtons && onContactSeller && (
        <>
          <button
            className="action-button"
            onClick={(e) => handleContactClick('phone', e)}
            style={{
              background: '#667eea',
              color: 'white',
              border: 'none',
              padding: '10px',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Zadzwoń"
          >
            <Phone style={{ height: '14px', width: '14px' }} />
          </button>
          <button
            className="action-button"
            onClick={(e) => handleContactClick('email', e)}
            style={{
              background: '#6b7280',
              color: 'white',
              border: 'none',
              padding: '10px',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Wyślij wiadomość"
          >
            <Mail style={{ height: '14px', width: '14px' }} />
          </button>
        </>
      )}
    </div>
  </div>

  <style>
    {`
      @keyframes loading {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `}
  </style>
</div>
```

);
};

export default VehicleCard;