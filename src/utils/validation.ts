import { AuthFormData, FormErrors } from ‘../types/User’;

export const validatePhoneNumber = (phone: string): boolean => {
const phoneRegex = /^+48[0-9]{9}$/;
return phoneRegex.test(phone.replace(/\s/g, ‘’));
};

export const validateEmail = (email: string): boolean => {
return /\S+@\S+.\S+/.test(email);
};

export const validateNIP = (nip: string): boolean => {
return /^\d{10}$/.test(nip.replace(/\D/g, ‘’));
};

export const validateForm = (formData: AuthFormData): FormErrors => {
const errors: FormErrors = {};

if (!formData.email || !validateEmail(formData.email)) {
errors.email = ‘Podaj prawidłowy adres email’;
}

if (!formData.firstName.trim()) {
errors.firstName = ‘Imię jest wymagane’;
}

if (!formData.lastName.trim()) {
errors.lastName = ‘Nazwisko jest wymagane’;
}

if (!formData.city.trim()) {
errors.city = ‘Miasto jest wymagane’;
}

if (formData.isCompany) {
if (!formData.companyName.trim()) {
errors.companyName = ‘Nazwa firmy jest wymagana’;
}
if (!formData.nip.trim()) {
errors.nip = ‘NIP jest wymagany’;
} else if (!validateNIP(formData.nip)) {
errors.nip = ‘NIP musi składać się z 10 cyfr’;
}
}

if (!formData.gdprConsent) {
errors.gdprConsent = ‘Zgoda na przetwarzanie danych jest wymagana’;
}

return errors;
};