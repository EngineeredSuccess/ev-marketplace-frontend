export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_company: boolean;
  street: string;
  city: string;
  postal_code: string;
  country: string;
  company_name?: string;
  nip?: string;
  is_verified: boolean;
  auth_provider: string;
}