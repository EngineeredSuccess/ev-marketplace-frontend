export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // If it starts with +48, format as +48 XXX XXX XXX
  if (cleaned.startsWith('+48')) {
    const number = cleaned.slice(3);
    if (number.length === 9) {
      return `+48 ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
    }
  }
  
  // If it starts with 48, add + and format
  if (cleaned.startsWith('48') && cleaned.length === 11) {
    const number = cleaned.slice(2);
    return `+48 ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
  }
  
  // If it's 9 digits, assume it's Polish number without country code
  if (cleaned.length === 9 && !cleaned.startsWith('+')) {
    return `+48 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  
  return phone; // Return original if can't format
};

export const normalizePhoneNumber = (phone: string): string => {
  // Remove all spaces and formatting, keep only digits and +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Ensure it starts with +48
  if (cleaned.startsWith('48') && cleaned.length === 11) {
    return '+' + cleaned;
  }
  
  if (cleaned.length === 9 && !cleaned.startsWith('+')) {
    return '+48' + cleaned;
  }
  
  return cleaned;
};

export const isValidPolishPhoneNumber = (phone: string): boolean => {
  const normalized = normalizePhoneNumber(phone);
  return /^\+48\d{9}$/.test(normalized);
};