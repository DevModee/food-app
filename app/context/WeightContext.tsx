import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import moment from 'moment';
import { getWeightByDate, addWeight, updateWeight } from '../api/api';

type WeightEntry = {
  value: number;
  date: string;
  userId: number;
};

type WeightContextType = {
  userId: number | null;
  username: string;
  weightData: WeightEntry[];
  addWeight: (entry: Omit<WeightEntry, 'userId'>) => void;
  setUser: (id: number, username: string, skipLoadWeight?: boolean) => void;
  loadWeight: (startDate: string, endDate: string) => void;
};

const WeightContext = createContext<WeightContextType | undefined>(undefined);

export const WeightProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsernameState] = useState<string>('');
  const [weightData, setWeightData] = useState<WeightEntry[]>([]);
  const [shouldLoadWeight, setShouldLoadWeight] = useState(false);

  const loadWeight = async (startDate: string, endDate: string) => {
    if (!userId) return;
    try {
      const response = await getWeightByDate(userId, startDate, endDate);
      if (response.data && response.data.length > 0) {
        console.log('No hay datos de peso para el usuario:', userId);
        setWeightData(response.data);
      } else {
        setWeightData([]);
      }
    } catch (error) {
      console.error('Error loading weight data', error);
      Alert.alert('Error', 'No se pudo cargar el peso.');
    }
  };

  const handleAddWeight = async (entry: Omit<WeightEntry, 'userId'>) => {
    if (!userId) return;
    const fullEntry = { ...entry, userId };
    console.log('Adding weight entry:', fullEntry);

    try {
      await addWeight(fullEntry.userId, fullEntry.value, fullEntry.date);
      setWeightData((prev) => {
        const updated = prev
          .filter((e) => !(e.date.startsWith(entry.date.split('T')[0])))
          .concat(fullEntry);
        return updated;
      });
    } catch (error) {
      console.error('Error adding weight', error);
      Alert.alert('Error', 'No se pudo agregar el peso.');
    }
  };

  const setUser = (id: number, name: string, skipLoadWeight = false) => {
    setUserId(id);
    setUsernameState(name);

    if (!skipLoadWeight) {
      const start = moment().subtract(30, 'days').format('YYYY-MM-DD');
      const end = moment().format('YYYY-MM-DD');
      setShouldLoadWeight(true);
      loadWeight(start, end);
    }
  };

  useEffect(() => {
    if (shouldLoadWeight && userId) {
      const start = moment().subtract(30, 'days').format('YYYY-MM-DD');
      const end = moment().format('YYYY-MM-DD');
      loadWeight(start, end);
      setShouldLoadWeight(false);
    }
  }, [userId, shouldLoadWeight]);

  return (
    <WeightContext.Provider
      value={{ userId, username, weightData, addWeight: handleAddWeight, setUser, loadWeight }}
    >
      {children}
    </WeightContext.Provider>

  );

};

export const useWeightContext = () => {
  const context = useContext(WeightContext);
  if (!context) {
    throw new Error('useWeightContext must be used within a WeightProvider');
  }
  return context;
};
