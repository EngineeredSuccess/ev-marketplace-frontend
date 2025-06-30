import { useState, useCallback } from ‘react’;
import { User, AuthFormData } from ‘../types/User’;
import { AuthService } from ‘../services/authService’;

export const useAuth = () => {
const [currentUser, setCurrentUser] = useState<User | null>(null);
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [loading, setLoading] = useState(false);

const login = useCallback(async (phone: string) => {
setLoading(true);
try {
const response = await AuthService.loginUser(phone);
if (response.success && response.user) {
setCurrentUser(response.user);
setIsAuthenticated(true);
return { success: true };
} else {
return { success: false, error: response.error };
}
} catch (error) {
return { success: false, error: ‘Błąd logowania’ };
} finally {
setLoading(false);
}
}, []);

const register = useCallback(async (formData: AuthFormData) => {
setLoading(true);
try {
const response = await AuthService.registerUser(formData);
if (response.success && response.user) {
setCurrentUser(response.user);
setIsAuthenticated(true);
return { success: true, user: response.user };
} else {
return { success: false, error: response.error };
}
} catch (error) {
return { success: false, error: ‘Błąd rejestracji’ };
} finally {
setLoading(false);
}
}, []);

const logout = useCallback(() => {
setCurrentUser(null);
setIsAuthenticated(false);
}, []);

return {
currentUser,
isAuthenticated,
loading,
login,
register,
logout
};
};