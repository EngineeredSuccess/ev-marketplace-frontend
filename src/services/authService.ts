import { User } from '../types/User';
import { AuthFormData } from '../types/Auth';

// Mock users data - in a real app, this would come from an API
const mockUsers: User[] = [
  {
    id: 1,
    phone: "+48123456789",
    email: "jan.kowalski@email.com",
    firstName: "Jan",
    lastName: "Kowalski",
    isCompany: false,
    street: "ul. Marszałkowska 1",
    city: "Warszawa",
    postalCode: "00-001",
    country: "Polska",
    isVerified: true,
    registrationDate: new Date('2023-01-15')
  },
  {
    id: 2,
    phone: "+48987654321", 
    email: "anna.nowak@email.com",
    firstName: "Anna",
    lastName: "Nowak",
    isCompany: false,
    street: "ul. Floriańska 10",
    city: "Kraków",
    postalCode: "31-019",
    country: "Polska",
    isVerified: true,
    registrationDate: new Date('2023-02-20')
  },
  {
    id: 3,
    phone: "+48777888999",
    email: "biuro@autosalonzielinski.pl",
    firstName: "Katarzyna",
    lastName: "Zielińska",
    isCompany: true,
    companyName: "Auto Salon Zieliński Sp. z o.o.",
    nip: "1234567890",
    street: "ul. Przemysłowa 15",
    city: "Wrocław", 
    postalCode: "50-001",
    country: "Polska",
    isVerified: true,
    registrationDate: new Date('2022-11-10')
  }
];

export const authService = {
  // Send verification code to phone number
  sendVerificationCode: async (phone: string): Promise<{ success: boolean; message?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would call an SMS service
        resolve({ success: true, message: 'Kod weryfikacyjny został wysłany' });
      }, 2000);
    });
  },

  // Verify the SMS code
  verifyCode: async (phone: string, code: string): Promise<{ success: boolean; user?: User; message?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (code === '123456') {
          const existingUser = mockUsers.find(u => u.phone === phone);
          resolve({ 
            success: true, 
            user: existingUser,
            message: existingUser ? 'Zalogowano pomyślnie' : 'Kod zweryfikowany' 
          });
        } else {
          resolve({ success: false, message: 'Nieprawidłowy kod weryfikacyjny' });
        }
      }, 1000);
    });
  },

  // Complete user registration
  registerUser: async (formData: AuthFormData): Promise<{ success: boolean; user?: User; message?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: mockUsers.length + 1,
          phone: formData.phone,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          isCompany: formData.isCompany,
          companyName: formData.companyName,
          nip: formData.nip,
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
          isVerified: true,
          registrationDate: new Date()
        };
        
        // In a real app, this would save to database
        mockUsers.push(newUser);
        
        resolve({ 
          success: true, 
          user: newUser,
          message: 'Rejestracja zakończona pomyślnie' 
        });
      }, 2000);
    });
  },

  // Find user by phone number
  findUserByPhone: (phone: string): User | undefined => {
    return mockUsers.find(u => u.phone === phone);
  },

  // Get all users (for development/testing)
  getAllUsers: (): User[] => {
    return mockUsers;
  }
};