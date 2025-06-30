import { User, AuthFormData } from ‘../types/User’;

export interface AuthResponse {
success: boolean;
user?: User;
error?: string;
}

export class AuthService {
private static users: User[] = [
{
id: 1,
phone: “+48123456789”,
email: “jan.kowalski@email.com”,
firstName: “Jan”,
lastName: “Kowalski”,
isCompany: false,
street: “ul. Marszałkowska 1”,
city: “Warszawa”,
postalCode: “00-001”,
country: “Polska”,
isVerified: true,
registrationDate: new Date(‘2023-01-15’)
},
{
id: 2,
phone: “+48987654321”,
email: “anna.nowak@email.com”,
firstName: “Anna”,
lastName: “Nowak”,
isCompany: false,
street: “ul. Floriańska 10”,
city: “Kraków”,
postalCode: “31-019”,
country: “Polska”,
isVerified: true,
registrationDate: new Date(‘2023-02-20’)
},
{
id: 3,
phone: “+48777888999”,
email: “biuro@autosalonzielinski.pl”,
firstName: “Katarzyna”,
lastName: “Zielińska”,
isCompany: true,
companyName: “Auto Salon Zieliński Sp. z o.o.”,
nip: “1234567890”,
street: “ul. Przemysłowa 15”,
city: “Wrocław”,
postalCode: “50-001”,
country: “Polska”,
isVerified: true,
registrationDate: new Date(‘2022-11-10’)
}
];

static async findUserByPhone(phone: string): Promise<User | null> {
return this.users.find(user => user.phone === phone) || null;
}

static async registerUser(formData: AuthFormData): Promise<AuthResponse> {
try {
// Check if user already exists
const existingUser = await this.findUserByPhone(formData.phone);
if (existingUser) {
return {
success: false,
error: ‘Użytkownik o tym numerze telefonu już istnieje’
};
}

```
  // Create new user
  const newUser: User = {
    id: this.users.length + 1,
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

  // Add to users array
  this.users.push(newUser);

  return {
    success: true,
    user: newUser
  };
} catch (error) {
  return {
    success: false,
    error: 'Nie udało się utworzyć konta'
  };
}
```

}

static async loginUser(phone: string): Promise<AuthResponse> {
try {
const user = await this.findUserByPhone(phone);
if (!user) {
return {
success: false,
error: ‘Nie znaleziono użytkownika o tym numerze telefonu’
};
}

```
  return {
    success: true,
    user
  };
} catch (error) {
  return {
    success: false,
    error: 'Nie udało się zalogować'
  };
}
```

}

static getUsers(): User[] {
return this.users;
}
}