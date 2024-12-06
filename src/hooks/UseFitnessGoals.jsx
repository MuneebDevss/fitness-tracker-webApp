import { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { authService } from '../services/authService';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } catch (err) {
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

  const login = useCallback(async (email, password) => {
    try {
      setIsLoading(true);
      const response = await authService.login(email, password);
      
      // Store token in local storage
      localStorage.setItem('token', response.token);
      
      setUser(response.user);
      setIsAuthenticated(true);
      setError(null);
      
      return response.user;
    } catch (err) {
      setError(err.message || 'Login failed');
      setIsAuthenticated(false);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    try {
      // Call logout endpoint if needed
      authService.logout();
      
      // Clear local storage
      localStorage.removeItem('token');
      
      // Reset state
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Logout error', err);
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      setIsLoading(true);
      const response = await authService.register(userData);
      
      // Store token in local storage
      localStorage.setItem('token', response.token);
      
      setUser(response.user);
      setIsAuthenticated(true);
      setError(null);
      
      return response.user;
    } catch (err) {
      setError(err.message || 'Registration failed');
      setIsAuthenticated(false);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isAuthenticated,
    user,
    isLoading,
    error,
    login,
    logout,
    register
  };
};