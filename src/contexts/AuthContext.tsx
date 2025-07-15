'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/User';
import { authService } from '@/services/authService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  registerUser: (userData: any) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize user from authService
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = async (email: string) => {
    setIsLoading(true);
    try {
      const result = await authService.loginWithMagicLink(email);
      if (result.success && result.user) {
        setUser(result.user);
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (userData: any) => {
    setIsLoading(true);
    try {
      const result = await authService.registerUser(userData);
      if (result.success && result.user) {
        setUser(result.user);
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const result = await authService.signInWithGoogle();
      if (result.success && 'user' in result && result.user) {
        setUser(result.user);
      }
    } catch (error) {
      console.error('Google sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithApple = async () => {
    setIsLoading(true);
    try {
      const result = await authService.signInWithApple();
      if (result.success && 'user' in result && result.user) {
        setUser(result.user);
      }
    } catch (error) {
      console.error('Apple sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    authService.signOut();
    setUser(null);
  };

  const refreshProfile = async () => {
    // In a real implementation, this would refresh user data from server
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    registerUser,
    signInWithGoogle,
    signInWithApple,
    signOut,
    refreshProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};