import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type WeightEntry = {
  value: number;
  date: string;
};

type WeightContextType = {
  username: string;
  weightData: WeightEntry[];
  addWeight: (entry: WeightEntry) => void;
  setUsername: (username: string) => void;
};

const WeightContext = createContext<WeightContextType | undefined>(undefined);

export const WeightProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string>('');
  const [weightData, setWeightData] = useState<WeightEntry[]>([]);

  const addWeight = (entry: WeightEntry) => {
    setWeightData((prev) => [...prev, entry]);
  };

  const loadUsername = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    } catch (error) {
      console.error('Error loading username', error);
    }
  };

  const saveWeight = async (weights) => {
    try {
      await AsyncStorage.setItem('weights', JSON.stringify(weights));
    } catch (error) {
      console.error('Error saving weight data', error);
    }
  }

  React.useEffect(() => {
    loadUsername();
  }, []);

  return (
    <WeightContext.Provider value={{ username, weightData, addWeight, setUsername }}>
      {children}
    </WeightContext.Provider>
  )
};

export const useWeightContext = () => {
  const context = useContext(WeightContext);
  if (!context) { throw new Error('useWeightContext must be used within a WeightProvider'); }
  return context;
};

