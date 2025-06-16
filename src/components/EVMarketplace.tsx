import React, { useState, useEffect } from 'react';
import { Search, Filter, Car, Battery, Zap, MapPin, Phone, Mail, Heart, Star, ChevronDown, Menu, X } from 'lucide-react';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Car, Battery, Zap, MapPin, Phone, Mail, Heart, Star, ChevronDown, Menu, X } from 'lucide-react';
import ApiService from '../services/api'; // Add this import

// Types for TypeScript
interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  batteryCapacity: number;
  range: number;
  chargingType: string;
  location: string;
  voivodeship: string;
  photos: string[];
  description: string;
  mileage: number;
  seller: {
    name: string;
    phone: string;
    verified: boolean;
    rating: number;
  };
}

// Mock data for initial testing (will be replaced with API calls)
const mockVehicles: Vehicle[] = [
  {
    id: 1,
    make: 'Tesla',
    model: 'Model 3',
    year: 2022,
    price: 189000,
    batteryCapacity: 75,
    range: 491,
    chargingType: 'Supercharger',
    location: 'Warszawa',
    voivodeship: 'mazowieckie',
    photos: ['https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop'],
    description: 'Idealny samochód elektryczny w doskonałym stanie. Regularne serwisy, jeden właściciel.',
    mileage: 45000,
    seller: { name: 'Jan Kowalski', phone: '+48 123 456 789', verified: true, rating: 4.8 }
  },
  {
    id: 2,
    make: 'Volkswagen',
    model: 'ID.4',
    year: 2023,
    price: 215000,
    batteryCapacity: 82,
    range: 520,
    chargingType: 'CCS',
    location: 'Kraków',
    voivodeship: 'małopolskie',
    photos: ['https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop'],
    description: 'Nowy SUV elektryczny z pełnym wyposażeniem. Gwarancja producenta.',
    mileage: 12000,
    seller: { name: 'Anna Nowak', phone: '+48 987 654 321', verified: true, rating: 4.9 }
  },
  {
    id: 3,
    make: 'BMW',
    model: 'iX3',
    year: 2021,
    price: 245000,
    batteryCapacity: 80,
    range: 460,
    chargingType: 'CCS',
    location: 'Gdańsk',
    voivodeship: 'pomorskie',
    photos: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop'],
    description: 'Luksusowy SUV elektryczny BMW. Bogate wyposażenie, skórzane wnętrze.',
    mileage: 67000,
    seller: { name: 'Piotr Wiśniewski', phone: '+48 555 777 999', verified: true, rating: 4.7 }
  },
  {
    id: 4,
    make: 'Nissan',
    model: 'Leaf',
    year: 2020,
    price: 98000,
    batteryCapacity: 40,
    range: 270,
    chargingType: 'CHAdeMO',
    location: 'Wrocław',
    voivodeship: 'dolnośląskie',
    photos: ['https://images.unsplash.com/photo-1549399392-ac1ec48d1c5b?w=400&h=300&fit=crop'],
    description: 'Ekonomiczny samochód elektryczny, idealny do miasta. Niskie koszty eksploatacji.',
    mileage: 89000,
    seller: { name: 'Maria Kowalczyk', phone: '+48 111 222 333', verified: false, rating: 4.5 }
  },
  {
    id: 5,
    make: 'Hyundai',
    model: 'IONIQ 5',
    year: 2023,
    price: 189000,
    batteryCapacity: 77.4,
    range: 481,
    chargingType: 'CCS',
    location: 'Poznań',
    voivodeship: 'wielkopolskie',
    photos: ['https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&h=300&fit=crop'],
    description: 'Nowoczesny design i najnowsze technologie. Szybkie ładowanie 800V.',
    mileage: 8000,
    seller: { name: 'Tomasz Zieliński', phone: '+48 444 555 666', verified: true, rating: 4.8 }
  },
  {
    id: 6,
    make: 'Audi',
    model: 'e-tron GT',
    year: 2022,
    price: 425000,
    batteryCapacity: 93.4,
    range: 487,
    chargingType: 'CCS',
    location: 'Warszawa',
    voivodeship: 'mazowieckie',
    photos: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop'],
    description: 'Sportowy samochód elektryczny klasy premium. Perfekcyjny stan techniczny.',
    mileage: 23000,
    seller: { name: 'Karol Majewski', phone: '+48 777 888 999', verified: true, rating: 5.0 }
  }
];

const voivodeships = [
  'dolnośląskie', 'kujawsko-pomorskie', 'lubelskie', 'lubuskie', 'łódzkie',
  'małopolskie', 'mazowieckie', 'opolskie', 'podkarpackie', 'podlaskie',
  'pomorskie', 'śląskie', 'świętokrzyskie', 'warmińsko-mazurskie', 'wielkopolskie', 'zachodniopomorskie'
];

const chargingTypes = ['CCS', 'CHAdeMO', 'Supercharger', 'Type 2', 'Wszystkie'];
const makes = ['Wszystkie', 'Tesla', 'Volkswagen', 'BMW', 'Nissan', 'Hyundai', 'Audi', 'Mercedes', 'Porsche'];

export default function EVMarketplace() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(mockVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'listings' | 'details'>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Add this function after your state declarations
const loadVehicles = async () => {
  try {
    setLoading(true);
    setError(null);
    setUsingMockData(false);
    
    console.log('🔄 Testing backend connection...');
    
    // Test backend health first
    await ApiService.healthCheck();
    
    console.log('🔄 Loading vehicles from backend...');
    
    // Load vehicles from real API
    const data = await ApiService.getVehicles();
    const vehicleList = data.vehicles || [];
    
    if (vehicleList.length > 0) {
      setVehicles(vehicleList);
      setFilteredVehicles(vehicleList);
      console.log(`✅ Loaded ${vehicleList.length} vehicles from backend!`);
    } else {
      console.log('⚠️ Backend returned empty vehicle list, using mock data');
      setVehicles(mockVehicles);
      setFilteredVehicles(mockVehicles);
      setUsingMockData(true);
    }
  } catch (err) {
    console.log('❌ Backend not available, using mock data');
    setError('Using demo data - backend connection in progress');
    setVehicles(mockVehicles);
    setFilteredVehicles(mockVehicles);
    setUsingMockData(true);
  } finally {
    setLoading(false);
  }
};

// Add useEffect to load data on component mount
useEffect(() => {
  loadVehicles();
}, []);
  
  // Filter states
  const [filters, setFilters] = useState({
    make: 'Wszystkie',
    priceMin: '',
    priceMax: '',
    yearMin: '',
    yearMax: '',
    batteryMin: '',
    batteryMax: '',
    rangeMin: '',
    chargingType: 'Wszystkie',
    location: 'Wszystkie'
  });

  // Apply filters
  useEffect(() => {
    let filtered = vehicles.filter(vehicle => {
      const matchesSearch = searchTerm === '' || 
        vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesMake = filters.make === 'Wszystkie' || vehicle.make === filters.make;
      const matchesPrice = (!filters.priceMin || vehicle.price >= parseInt(filters.priceMin)) &&
                          (!filters.priceMax || vehicle.price <= parseInt(filters.priceMax));
      const matchesYear = (!filters.yearMin || vehicle.year >= parseInt(filters.yearMin)) &&
                         (!filters.yearMax || vehicle.year <= parseInt(filters.yearMax));
      const matchesBattery = (!filters.batteryMin || vehicle.batteryCapacity >= parseInt(filters.batteryMin)) &&
                            (!filters.batteryMax || vehicle.batteryCapacity <= parseInt(filters.batteryMax));
      const matchesRange = !filters.rangeMin || vehicle.range >= parseInt(filters.rangeMin);
      const matchesCharging = filters.chargingType === 'Wszystkie' || vehicle.chargingType === filters.chargingType;
      const matchesLocation = filters.location === 'Wszystkie' || vehicle.voivodeship === filters.location;

      return matchesSearch && matchesMake && matchesPrice && matchesYear && 
             matchesBattery && matchesRange && matchesCharging && matchesLocation;
    });
    setFilteredVehicles(filtered);
  }, [vehicles, searchTerm, filters]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pl-PL').format(num);
  };

  const toggleFavorite = (vehicleId: number) => {
    setFavorites(prev => 
      prev.includes(vehicleId) 
        ? prev.filter(id => id !== vehicleId)
        : [...prev, vehicleId]
    );
  };

  const Navigation = () => (
    <nav className="bg-blue-600 text-white shadow-lg relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Car className="h-8 w-8" />
            <span className="text-xl font-bold">ElektroAuto.pl</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => setCurrentView('home')}
              className={`px-3 py-2 rounded transition-colors ${currentView === 'home' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            >
              Strona główna
            </button>
            <button 
              onClick={() => setCurrentView('listings')}
              className={`px-3 py-2 rounded transition-colors ${currentView === 'listings' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            >
              Wszystkie ogłoszenia
            </button>
            <button className="px-3 py-2 rounded hover:bg-blue-700 transition-colors">
              Sprzedaj auto
            </button>
            <button className="px-3 py-2 rounded hover:bg-blue-700 transition-colors">
              Zaloguj się
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-blue-600 border-t border-blue-700 z-50">
            <div className="px-4 py-2 space-y-2">
              <button 
                onClick={() => {setCurrentView('home'); setIsMobileMenuOpen(false);}}
                className="block w-full text-left px-3 py-2 rounded hover:bg-blue-700"
              >
                Strona główna
              </button>
              <button 
                onClick={() => {setCurrentView('listings'); setIsMobileMenuOpen(false);}}
                className="block w-full text-left px-3 py-2 rounded hover:bg-blue-700"
              >
                Wszystkie ogłoszenia
              </button>
              <button className="block w-full text-left px-3 py-2 rounded hover:bg-blue-700">
                Sprzedaj auto
              </button>
              <button className="block w-full text-left px-3 py-2 rounded hover:bg-blue-700">
                Zaloguj się
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  const SearchBar = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Szukaj pojazdów elektrycznych..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Filter className="h-5 w-5 mr-2" />
          Filtry
          <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
        <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Szukaj
        </button>
      </div>

      {showFilters && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Marka</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={filters.make}
                onChange={(e) => setFilters({...filters, make: e.target.value})}
              >
                {makes.map(make => <option key={make} value={make}>{make}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cena od (PLN)</label>
              <input 
                type="number" 
                placeholder="50 000"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={filters.priceMin}
                onChange={(e) => setFilters({...filters, priceMin: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cena do (PLN)</label>
              <input 
                type="number" 
                placeholder="500 000"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={filters.priceMax}
                onChange={(e) => setFilters({...filters, priceMax: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rok od</label>
              <input 
                type="number" 
                placeholder="2020"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={filters.yearMin}
                onChange={(e) => setFilters({...filters, yearMin: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bateria od (kWh)</label>
              <input 
                type="number" 
                placeholder="40"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={filters.batteryMin}
                onChange={(e) => setFilters({...filters, batteryMin: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Zasięg od (km)</label>
              <input 
                type="number" 
                placeholder="300"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={filters.rangeMin}
                onChange={(e) => setFilters({...filters, rangeMin: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Typ ładowania</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={filters.chargingType}
                onChange={(e) => setFilters({...filters, chargingType: e.target.value})}
              >
                {chargingTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Województwo</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
              >
                <option value="Wszystkie">Wszystkie</option>
                {voivodeships.map(voivodeship => (
                  <option key={voivodeship} value={voivodeship}>
                    {voivodeship}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <button 
              onClick={() => setFilters({
                make: 'Wszystkie', priceMin: '', priceMax: '', yearMin: '', yearMax: '',
                batteryMin: '', batteryMax: '', rangeMin: '', chargingType: 'Wszystkie', location: 'Wszystkie'
              })}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Wyczyść filtry
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative">
        <img 
          src={vehicle.photos[0]} 
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-48 object-cover"
        />
        <button 
          onClick={() => toggleFavorite(vehicle.id)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
        >
          <Heart 
            className={`h-5 w-5 ${favorites.includes(vehicle.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
          />
        </button>
        {vehicle.seller.verified && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
            Zweryfikowany
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {vehicle.make} {vehicle.model}
          </h3>
          <span className="text-xl font-bold text-blue-600">
            {formatPrice(vehicle.price)}
          </span>
        </div>
        
        <p className="text-gray-600 mb-3">{vehicle.year} • {formatNumber(vehicle.mileage)} km</p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Battery className="h-4 w-4 mr-2 text-green-500" />
            {vehicle.batteryCapacity} kWh
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Zap className="h-4 w-4 mr-2 text-blue-500" />
            {vehicle.range} km
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-red-500" />
            {vehicle.location}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Star className="h-4 w-4 mr-1 text-yellow-500" />
            {vehicle.seller.rating}
          </div>
        </div>
        
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
          {vehicle.description}
        </p>
        
        <button 
          onClick={() => {setSelectedVehicle(vehicle); setCurrentView('details');}}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Zobacz szczegóły
        </button>
      </div>
    </div>
  );

  const VehicleDetails = ({ vehicle }: { vehicle: Vehicle }) => (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => setCurrentView('listings')}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-700"
      >
        ← Powrót do wyników
      </button>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img 
            src={vehicle.photos[0]} 
            alt={`${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover"
          />
          <button 
            onClick={() => toggleFavorite(vehicle.id)}
            className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50"
          >
            <Heart 
              className={`h-6 w-6 ${favorites.includes(vehicle.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
            />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {vehicle.make} {vehicle.model}
              </h1>
              <p className="text-gray-600 text-lg">{vehicle.year} • {formatNumber(vehicle.mileage)} km</p>
            </div>
            <div className="text-right mt-4 lg:mt-0">
              <div className="text-3xl font-bold text-blue-600">
                {formatPrice(vehicle.price)}
              </div>
              <p className="text-gray-500">Cena końcowa</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Battery className="h-5 w-5 text-green-500 mr-2" />
                <span className="font-medium">Bateria</span>
              </div>
              <p className="text-xl font-bold">{vehicle.batteryCapacity} kWh</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Zap className="h-5 w-5 text-blue-500 mr-2" />
                <span className="font-medium">Zasięg</span>
              </div>
              <p className="text-xl font-bold">{vehicle.range} km</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Car className="h-5 w-5 text-purple-500 mr-2" />
                <span className="font-medium">Ładowanie</span>
              </div>
              <p className="text-xl font-bold">{vehicle.chargingType}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <MapPin className="h-5 w-5 text-red-500 mr-2" />
                <span className="font-medium">Lokalizacja</span>
              </div>
              <p className="text-xl font-bold">{vehicle.location}</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Opis pojazdu</h2>
            <p className="text-gray-700 leading-relaxed">{vehicle.description}</p>
          </div>
          
          <div className="border-t pt-6">
            <h2 className="text-xl font-bold mb-4">Kontakt ze sprzedającym</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">{vehicle.seller.name}</h3>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{vehicle.seller.rating}</span>
                    {vehicle.seller.verified && (
                      <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        Zweryfikowany
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a 
                  href={`tel:${vehicle.seller.phone}`}
                  className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  {vehicle.seller.phone}
                </a>
                <button className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Mail className="h-5 w-5 mr-2" />
                  Wyślij wiadomość
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const HomePage = () => (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Znajdź swój elektryczny samochód
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Największy wybór pojazdów elektrycznych w Polsce
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <button 
              onClick={() => setCurrentView('listings')}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Przeglądaj oferty
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Dodaj ogłoszenie
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <SearchBar />
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">{formatNumber(filteredVehicles.length)}+</div>
            <p className="text-gray-600">Aktywnych ogłoszeń</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
            <p className="text-gray-600">Miast w Polsce</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
            <p className="text-gray-600">Zadowolonych klientów</p>
          </div>
        </div>

              {/* ADD THIS DATA SOURCE INDICATOR HERE */}
      {(error || usingMockData) && (
        <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-800">
                {error || 'Obecnie wyświetlamy dane demonstracyjne. Połączenie z bazą danych w trakcie konfiguracji.'}
              </p>
              <button 
                onClick={loadVehicles}
                className="mt-2 text-sm text-yellow-800 underline hover:text-yellow-900"
              >
                Spróbuj ponownie
              </button>
            </div>
          </div>
        </div>
      )}

        {/* Featured Vehicles */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Polecane pojazdy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.slice(0, 6).map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
          <div className="text-center mt-8">
            <button 
              onClick={() => setCurrentView('listings')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Zobacz wszystkie ({filteredVehicles.length})
            </button>
          </div>
        </div>

        {/* Why Choose Electric */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Dlaczego samochody elektryczne?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Battery className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">Ekologiczne</h3>
              <p className="text-gray-600 text-sm">Zero emisji podczas jazdy</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold mb-2">Oszczędne</h3>
              <p className="text-gray-600 text-sm">Niskie koszty eksploatacji</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-bold mb-2">Ciche</h3>
              <p className="text-gray-600 text-sm">Komfortowa jazda bez hałasu</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="font-bold mb-2">Nowoczesne</h3>
              <p className="text-gray-600 text-sm">Najnowsze technologie</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ListingsPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Wszystkie pojazdy elektryczne ({filteredVehicles.length})
      </h1>
      
      <SearchBar />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map(vehicle => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
      
      {filteredVehicles.length === 0 && (
        <div className="text-center py-12">
          <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Brak wyników</h3>
          <p className="text-gray-500">Spróbuj zmienić kryteria wyszukiwania</p>
        </div>
      )}
    </div>
  );

  // ADD THIS LOADING CHECK HERE (before the return)
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ładowanie pojazdów elektrycznych...</p>
          <p className="text-sm text-gray-500 mt-2">Łączenie z bazą danych...</p>
        </div>
      </div>
    );
  }

  return (  // <-- Your existing return statement stays here
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      {currentView === 'home' && <HomePage />}
      {/* ... rest of your component */}
    </div>
  );
  

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      {currentView === 'home' && <HomePage />}
      {currentView === 'listings' && <ListingsPage />}
      {currentView === 'details' && selectedVehicle && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <VehicleDetails vehicle={selectedVehicle} />
        </div>
      )}
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-8 w-8" />
                <span className="text-xl font-bold">ElektroAuto.pl</span>
              </div>
              <p className="text-gray-400">
                Największy marketplace pojazdów elektrycznych w Polsce.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Dla kupujących</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Jak kupować</a></li>
                <li><a href="#" className="hover:text-white">Finansowanie</a></li>
                <li><a href="#" className="hover:text-white">Ubezpieczenia</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Dla sprzedających</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Dodaj ogłoszenie</a></li>
                <li><a href="#" className="hover:text-white">Cennik</a></li>
                <li><a href="#" className="hover:text-white">Wsparcie</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Kontakt</h3>
              <ul className="space-y-2 text-gray-400">
                <li>+48 123 456 789</li>
                <li>info@elektroauto.pl</li>
                <li>ul. Elektryczna 123<br />00-001 Warszawa</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ElektroAuto.pl. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}