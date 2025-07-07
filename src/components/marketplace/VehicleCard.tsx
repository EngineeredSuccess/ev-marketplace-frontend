import React from 'react';
import { Battery, Zap, MapPin, Car, ArrowRight } from 'lucide-react';
import { Vehicle } from '../../types/Vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
  onViewDetails: (vehicle: Vehicle) => void;
  onTrackEvent?: (action: string, vehicleData: any) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ 
  vehicle, 
  onViewDetails,
  onTrackEvent 
}) => {
  const handleViewDetails = () => {
    if (onTrackEvent) {
      onTrackEvent('view_details', vehicle);
    }
    onViewDetails(vehicle);
  };

  return (
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
          onClick={handleViewDetails}
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
};