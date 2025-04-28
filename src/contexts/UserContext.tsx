
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  dietaryRestrictions?: string[];
  allergies?: string[];
  fitnessGoals?: string;
  calorieTarget?: number;
  macroTargets?: {
    protein: number;
    carbs: number;
    fat: number;
  };
} | null;

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (userData: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('nutriflow_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // In a real app, these functions would interact with a backend API
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes, mocking API call
      if (email && password) {
        // Simulate successful login with mock user data
        const mockUser = {
          id: '1',
          name: 'Demo User',
          email: email,
          dietaryRestrictions: ['vegetarian'],
          allergies: ['peanuts'],
          fitnessGoals: 'Lose weight',
          calorieTarget: 2000,
          macroTargets: {
            protein: 150,
            carbs: 200,
            fat: 65,
          }
        };
        
        setUser(mockUser);
        setIsLoggedIn(true);
        localStorage.setItem('nutriflow_user', JSON.stringify(mockUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes, mocking API call
      if (name && email && password) {
        // Simulate successful signup with mock user data
        const mockUser = {
          id: '1',
          name: name,
          email: email,
          dietaryRestrictions: [],
          allergies: [],
          fitnessGoals: '',
          calorieTarget: 2000,
          macroTargets: {
            protein: 150,
            carbs: 200,
            fat: 65,
          }
        };
        
        setUser(mockUser);
        setIsLoggedIn(true);
        localStorage.setItem('nutriflow_user', JSON.stringify(mockUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('nutriflow_user');
  };

  const updateUserProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('nutriflow_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      isLoggedIn, 
      login, 
      signup, 
      logout,
      updateUserProfile
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
