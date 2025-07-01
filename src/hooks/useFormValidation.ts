import { useState, useCallback, useMemo } from 'react';
import { validateEmail, validatePhone, validateNIP, validatePostalCode, validateRequired } from '../utils/validation';

export interface ValidationRule {
  required?: boolean;
  email?: boolean;
  phone?: boolean;
  nip?: boolean;
  postalCode?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationRules {
  [fieldName: string]: ValidationRule;
}

export interface ValidationErrors {
  [fieldName: string]: string;
}

export interface FormValidationState {
  errors: ValidationErrors;
  isValid: boolean;
  touched: { [fieldName: string]: boolean };
}

export const useFormValidation = <T extends Record<string, any>>(
  initialValues: T,
  validationRules: ValidationRules
) => {
  const [values, setFormValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [fieldName: string]: boolean }>({});

  const validateField = useCallback((fieldName: string, value: any): string | null => {
    const rule = validationRules[fieldName];
    if (!rule) return null;

    // Required validation
    if (rule.required && !validateRequired(String(value))) {
      return 'To pole jest wymagane';
    }

    // Skip other validations if field is empty and not required
    if (!rule.required && !validateRequired(String(value))) {
      return null;
    }

    // Email validation
    if (rule.email && !validateEmail(String(value))) {
      return 'Nieprawidłowy format adresu email';
    }

    // Phone validation
    if (rule.phone && !validatePhone(String(value))) {
      return 'Nieprawidłowy format numeru telefonu';
    }

    // NIP validation
    if (rule.nip && !validateNIP(String(value))) {
      return 'Nieprawidłowy format numeru NIP';
    }

    // Postal code validation
    if (rule.postalCode && !validatePostalCode(String(value))) {
      return 'Nieprawidłowy format kodu pocztowego (XX-XXX)';
    }

    // Min length validation
    if (rule.minLength && String(value).length < rule.minLength) {
      return `Minimalna długość: ${rule.minLength} znaków`;
    }

    // Max length validation
    if (rule.maxLength && String(value).length > rule.maxLength) {
      return `Maksymalna długość: ${rule.maxLength} znaków`;
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(String(value))) {
      return 'Nieprawidłowy format';
    }

    // Custom validation
    if (rule.custom) {
      return rule.custom(value);
    }

    return null;
  }, [validationRules]);

  const validateAllFields = useCallback((): ValidationErrors => {
    const newErrors: ValidationErrors = {};
    
    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    return newErrors;
  }, [values, validateField, validationRules]);

  const isValid = useMemo(() => {
    const currentErrors = validateAllFields();
    return Object.keys(currentErrors).length === 0;
  }, [validateAllFields]);

  const setValue = useCallback((fieldName: keyof T, value: any) => {
    setFormValues(prev => ({ ...prev, [fieldName]: value }));
    
    // Validate field if it has been touched
    if (touched[fieldName as string]) {
      const error = validateField(fieldName as string, value);
      setErrors(prev => {
        const newErrors = { ...prev };
        if (error) {
          newErrors[fieldName as string] = error;
        } else {
          delete newErrors[fieldName as string];
        }
        return newErrors;
      });
    }
  }, [touched, validateField]);

  const setValues = useCallback((newValues: Partial<T>) => {
    setFormValues(prev => ({ ...prev, ...newValues }));
  }, []);

  const setFieldTouched = useCallback((fieldName: keyof T, isTouched: boolean = true) => {
    setTouched(prev => ({ ...prev, [fieldName]: isTouched }));
    
    if (isTouched) {
      const error = validateField(fieldName as string, values[fieldName]);
      setErrors(prev => {
        const newErrors = { ...prev };
        if (error) {
          newErrors[fieldName as string] = error;
        } else {
          delete newErrors[fieldName as string];
        }
        return newErrors;
      });
    }
  }, [values, validateField]);

  const setAllTouched = useCallback(() => {
    const allTouched: { [key: string]: boolean } = {};
    Object.keys(validationRules).forEach(fieldName => {
      allTouched[fieldName] = true;
    });
    setTouched(allTouched);
    
    const newErrors = validateAllFields();
    setErrors(newErrors);
  }, [validationRules, validateAllFields]);

  const resetForm = useCallback(() => {
    setFormValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const getFieldError = useCallback((fieldName: keyof T): string | undefined => {
    return errors[fieldName as string];
  }, [errors]);

  const isFieldTouched = useCallback((fieldName: keyof T): boolean => {
    return touched[fieldName as string] || false;
  }, [touched]);

  const hasFieldError = useCallback((fieldName: keyof T): boolean => {
    return Boolean(errors[fieldName as string]);
  }, [errors]);

  const validateAndSubmit = useCallback((onSubmit: (values: T) => void) => {
    setAllTouched();
    const currentErrors = validateAllFields();
    
    if (Object.keys(currentErrors).length === 0) {
      onSubmit(values);
      return true;
    }
    
    return false;
  }, [values, setAllTouched, validateAllFields]);

  return {
    values,
    errors,
    touched,
    isValid,
    setValue,
    setValues,
    setFieldTouched,
    setAllTouched,
    resetForm,
    getFieldError,
    isFieldTouched,
    hasFieldError,
    validateField,
    validateAllFields,
    validateAndSubmit
  };
};

// Common validation rules
export const commonValidationRules = {
  email: { required: true, email: true },
  phone: { required: true, phone: true },
  firstName: { required: true, minLength: 2, maxLength: 50 },
  lastName: { required: true, minLength: 2, maxLength: 50 },
  city: { required: true, minLength: 2, maxLength: 100 },
  companyName: { minLength: 2, maxLength: 200 },
  nip: { nip: true },
  postalCode: { postalCode: true },
  gdprConsent: { 
    required: true,
    custom: (value: boolean) => value ? null : 'Zgoda na przetwarzanie danych jest wymagana'
  }
};