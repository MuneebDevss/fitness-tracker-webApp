import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { userService } from '../services/userService';

export const UserContext = createContext({
  fitnessProfile: null,
  dietPreferences: null,
  updateFitnessProfile: async () => {},
  updateDietPreferences: async () => {},
  fetchUserDetails: async () => {}
});

export const UserProvider = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [fitnessProfile, setFitnessProfile] = useState(null);
  const [dietPreferences, setDietPreferences] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserDetails();
    }
  }, [isAuthenticated, user]);

  const fetchUserDetails = async () => {
    try {
      const [fitnessData, dietData] = await Promise.all([
        userService.getFitnessProfile(),
        userService.getDietPreferences()
      ]);

      setFitnessProfile(fitnessData);
      setDietPreferences(dietData);
    } catch (error) {
      console.error('Failed to fetch user details', error);
    }
  };

  const updateFitnessProfile = async (profileData) => {
    try {
      const updatedProfile = await userService.updateFitnessProfile(profileData);
      
      setFitnessProfile(prevProfile => ({
        ...prevProfile,
        ...updatedProfile
      }));

      return updatedProfile;
    } catch (error) {
      console.error('Failed to update fitness profile', error);
      throw error;
    }
  };

  const updateDietPreferences = async (preferencesData) => {
    try {
      const updatedPreferences = await userService.updateDietPreferences(preferencesData);
      
      setDietPreferences(prevPreferences => ({
        ...prevPreferences,
        ...updatedPreferences
      }));

      return updatedPreferences;
    } catch (error) {
      console.error('Failed to update diet preferences', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider 
      value={{ 
        fitnessProfile, 
        dietPreferences, 
        updateFitnessProfile, 
        updateDietPreferences,
        fetchUserDetails
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  
  return context;
};