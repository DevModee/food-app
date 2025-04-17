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
};

const WeightContext = createContext<WeightContextType | undefined>(undefined);

export const WeightProvider = ({ children }: { children: React.ReactNode }) => {
  const [username] = useState<string>('');
  const [weightData, setWeightData] = useState<WeightEntry[]>([]);

  const addWeight = (entry: WeightEntry) => {
    setWeightData((prev) => [...prev, entry]);
  };

  const saveWeight = async (weights) => {
    try {
      await AsyncStorage.setItem('weights', JSON.stringify(weights));
    } catch (error) {
      console.error('Error saving weight data', error);
    }
  }

  return (
    <WeightContext.Provider value={{ username, weightData, addWeight }}>
      {children}
    </WeightContext.Provider>
  )
};

export const useWeightContext = () => {
  const context = useContext(WeightContext);
  if (!context) { throw new Error('useWeightContext must be used within a WeightProvider'); }
  return context;
};

