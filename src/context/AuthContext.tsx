import React, { createContext, useContext, useState } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  const login = async (email: string, password: string) => {
    // Simulate API call
    const user: User = {
      id: '1',
      username: email.split('@')[0],
      email,
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    };
    setAuthState({ user, isAuthenticated: true });
  };

  const signup = async (email: string, password: string, username: string) => {
    // Simulate API call
    const user: User = {
      id: '1',
      username,
      email,
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    };
    setAuthState({ user, isAuthenticated: true });
  };

  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};