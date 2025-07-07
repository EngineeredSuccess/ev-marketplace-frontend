export interface Vehicle {
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
    phone: string;
    verified: boolean;
    rating: number;
    isCompany?: boolean;
    companyName?: string;
  };
  sellerId: number;
}