import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
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
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setAuthState({
        isAuthenticated: true,
        user: JSON.parse(storedUser),
        loading: false,
        error: null
      });
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      // Mock API call - In a real app, this would be an actual API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      if (email === 'user@example.com' && password === 'password') {
        const user: User = {
          id: '1',
          name: 'John Doe',
          email: 'user@example.com'
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        
        setAuthState({
          isAuthenticated: true,
          user,
          loading: false,
          error: null
        });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred during login'
      }));
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      // Mock API call - In a real app, this would be an actual API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      const user: User = {
        id: Date.now().toString(),
        name,
        email
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuthState({
        isAuthenticated: true,
        user,
        loading: false,
        error: null
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred during registration'
      }));
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};