export interface User {
id: number;
phone: string;
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
registrationDate: Date;
}

export interface AuthFormData {
phone: string;
verificationCode: string;
email: string;
firstName: string;
lastName: string;
isCompany: boolean;
companyName: string;
nip: string;
street: string;
city: string;
postalCode: string;
country: string;
gdprConsent: boolean;
marketingConsent: boolean;
}

export interface FormErrors {
[key: string]: string;
}

export type AuthMode = ‘login’ | ‘register’;
export type VerificationStep = ‘phone’ | ‘code’ | ‘details’;