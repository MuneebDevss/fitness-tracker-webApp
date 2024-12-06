import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  updateProfile: async () => {}
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on initial load
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await authService.validateToken(token);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        // Token invalid or expired
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials) => {
    try {
      const { token, user: userData } = await authService.login(credentials);
      
      // Store token in local storage
      localStorage.setItem('token', token);
      
      // Update context state
      setUser(userData);
      setIsAuthenticated(true);
      
      return userData;
    } catch (error) {
      // Clear any existing authentication state
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  const logout = () => {
    try {
      // Remove token from local storage
      localStorage.removeItem('token');
      
      // Clear authentication state
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const register = async (registrationData) => {
    try {
      const { token, user: userData } = await authService.register(registrationData);
      
      // Store token in local storage
      localStorage.setItem('token', token);
      
      // Update context state
      setUser(userData);
      setIsAuthenticated(true);
      
      return userData;
    } catch (error) {
      // Clear any existing authentication state
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const updatedUser = await authService.updateProfile(profileData);
      
      // Update user in context
      setUser(prevUser => ({
        ...prevUser,
        ...updatedUser
      }));
      
      return updatedUser;
    } catch (error) {
      console.error('Profile update failed', error);
      throw error;
    }
  };

  // Prevent rendering children until auth check is complete
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        login, 
        logout, 
        register, 
        updateProfile 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};