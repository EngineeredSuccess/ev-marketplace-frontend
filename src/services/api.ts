// Real API service for Polish EV Marketplace
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
  photos?: string[];
  mileage?: number;
  seller?: {
    name: string;
    phone: string;
    verified: boolean;
    rating: number;
  };
}

interface ApiResponse<T> {
  vehicles?: T[];
  message?: string;
  status?: string;
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

    console.log(`🔗 API Request: ${url}`);

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`✅ API Response:`, data);
      return data;
    } catch (error) {
      console.error('❌ API request failed:', error);
      throw error;
    }
  }

  async healthCheck() {
    try {
      const response = await this.request<{status: string; message: string}>('/api/health');
      console.log('✅ Backend is healthy:', response);
      return response;
    } catch (error) {
      console.log('❌ Backend health check failed');
      throw error;
    }
  }

  async getVehicles(filters: Record<string, string> = {}) {
    try {
      // Build query parameters
      const queryParams = new URLSearchParams();
      
      Object.keys(filters).forEach(key => {
        if (filters[key] && filters[key] !== 'Wszystkie') {
          queryParams.append(key, filters[key]);
        }
      });

      const queryString = queryParams.toString();
      const endpoint = `/api/vehicles${queryString ? `?${queryString}` : ''}`;
      
      const response = await this.request<ApiResponse<Vehicle>>(endpoint);
      
      // Handle different response formats
      const vehicles = response.vehicles || (Array.isArray(response) ? response : []);
      
      console.log(`✅ Loaded ${vehicles.length} vehicles from API`);
      return { vehicles };
    } catch (error) {
      console.log('❌ Failed to load vehicles from API, will use fallback');
      throw error;
    }
  }

  async getVehicle(id: string) {
    try {
      const response = await this.request<Vehicle>(`/api/vehicles/${id}`);
      return response;
    } catch (error) {
      console.log(`❌ Failed to load vehicle ${id}`);
      throw error;
    }
  }

  // Future authentication methods
  async register(userData: any) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(email: string, password: string) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }
}

// Export singleton instance
export default new ApiService();
export type { Vehicle };