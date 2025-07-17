export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


export const validateNIP = (nip: string): boolean => {
  const nipRegex = /^\d{10}$/;
  return nipRegex.test(nip);
};

export const validatePostalCode = (postalCode: string): boolean => {
  const postalCodeRegex = /^\d{2}-\d{3}$/;
  return postalCodeRegex.test(postalCode);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateRegistrationForm = (formData: {
  email: string;
  firstName: string;
  lastName: string;
  city: string;
  gdprConsent: boolean;
  isCompany: boolean;
  companyName?: string;
  nip?: string;
}): boolean => {
  const basicValidation = 
    validateRequired(formData.email) &&
    validateEmail(formData.email) &&
    validateRequired(formData.firstName) &&
    validateRequired(formData.lastName) &&
    validateRequired(formData.city) &&
    formData.gdprConsent;

  if (!basicValidation) return false;

  if (formData.isCompany) {
    return validateRequired(formData.companyName || '') &&
           validateRequired(formData.nip || '') &&
           validateNIP(formData.nip || '');
  }

  return true;
};