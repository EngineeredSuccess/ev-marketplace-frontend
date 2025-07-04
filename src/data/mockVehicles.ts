import { Vehicle } from '../types/Vehicle';

export const mockVehicles: Vehicle[] = [
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
    sellerId: 1,
    seller: {
      name: "Jan Kowalski",
      phone: "+48 123 456 789",
      verified: true,
      rating: 4.8,
      isCompany: false
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
    sellerId: 2,
    seller: {
      name: "Anna Nowak",
      phone: "+48 987 654 321",
      verified: true,
      rating: 4.9,
      isCompany: false
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
    sellerId: 1,
    seller: {
      name: "Piotr Wiśniewski",
      phone: "+48 555 123 456",
      verified: true,
      rating: 4.7,
      isCompany: false
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
    sellerId: 3,
    seller: {
      name: "Auto Salon Zieliński",
      phone: "+48 777 888 999",
      verified: true,
      rating: 4.6,
      isCompany: true,
      companyName: "Auto Salon Zieliński Sp. z o.o."
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
    sellerId: 3,
    seller: {
      name: "Auto Salon Zieliński",
      phone: "+48 777 888 999",
      verified: true,
      rating: 4.5,
      isCompany: true,
      companyName: "Auto Salon Zieliński Sp. z o.o."
    }
  }
];