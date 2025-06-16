// API service for Polish EV Marketplace
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://YOUR-RAILWAY-URL';

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
  description: string;
  photos: string[];
  mileage: number;
  seller: {
    name: string;
    phone: string;
    verified: boolean;
    rating: number;
  };
}

interface ApiResponse<T> {
  vehicles?: T[];
  message?: string;
  error?: string;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getVehicles(filters: Record<string, string> = {}): Promise<ApiResponse<Vehicle>> {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key] !== 'Wszystkie') {
        queryParams.append(key, filters[key]);
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/api/vehicles${queryString ? `?${queryString}` : ''}`;
    
    return this.request<ApiResponse<Vehicle>>(endpoint);
  }

  async healthCheck(): Promise<{status: string; message: string}> {
    return this.request<{status: string; message: string}>('/api/health');
  }
}

export default new ApiService();
export type { Vehicle };