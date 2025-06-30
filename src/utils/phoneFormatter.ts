export const formatPhoneNumber = (value: string): string => {
let digits = value.replace(/\D/g, ‘’);

if (digits.startsWith(‘48’)) {
digits = ‘+’ + digits;
} else if (digits.length > 0 && !digits.startsWith(‘48’)) {
digits = ‘+48’ + digits;
}

return digits;
};

export const formatPostalCode = (value: string): string => {
let digits = value.replace(/\D/g, ‘’);
if (digits.length > 2) {
digits = digits.slice(0, 2) + ‘-’ + digits.slice(2, 5);
}
return digits;
};

export const formatNIP = (value: string): string => {
return value.replace(/\D/g, ‘’);
};