export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isCompany: boolean;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  companyName?: string;
  nip?: string;
  isVerified: boolean;
  authProvider: string;
  registrationDate: Date;
}