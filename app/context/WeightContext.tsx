import React, { createContext, useContext, useState } from 'react';

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

