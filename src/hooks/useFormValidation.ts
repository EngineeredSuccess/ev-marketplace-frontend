import { useState, useCallback } from ‘react’;
import { AuthFormData, FormErrors } from ‘../types/User’;
import { validateForm } from ‘../utils/validation’;

export const useFormValidation = (initialData: AuthFormData) => {
const [formData, setFormData] = useState<AuthFormData>(initialData);
const [errors, setErrors] = useState<FormErrors>({});

const updateField = useCallback((field: keyof AuthFormData, value: any) => {
setFormData(prev => ({
…prev,
[field]: value
}));

```
// Clear error for this field when user starts typing
if (errors[field]) {
  setErrors(prev => {
    const newErrors = { ...prev };
    delete newErrors[field];
    return newErrors;
  });
}
```

}, [errors]);

const validateFormData = useCallback((): boolean => {
const validationErrors = validateForm(formData);
setErrors(validationErrors);
return Object.keys(validationErrors).length === 0;
}, [formData]);

const resetForm = useCallback(() => {
setFormData(initialData);
setErrors({});
}, [initialData]);

const clearErrors = useCallback(() => {
setErrors({});
}, []);

return {
formData,
errors,
updateField,
validateFormData,
resetForm,
clearErrors,
setFormData
};
};