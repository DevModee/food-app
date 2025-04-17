import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useWeightContext } from '../context/WeightContext';
import { LineChart } from 'react-native-gifted-charts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {

  const { username, weightData, addWeight } = useWeightContext();
  const [weight, setWeight] = useState('');
  const [weights, setWeights] = useState([]);

  const handleAddWeight = () => {
    if (!weight) return;

    const newEntry = {
      value: parseFloat(weight),
      date: new Date().toISOString(),
    };

    addWeight(newEntry);
    setWeight('');
  };

  const chartData = weightData.map((item) => ({
    value: item.value,
    label: new Date(item.date).toLocaleDateString('es-Es', {
      day: '2-digit',
      month: 'short'
    }).replace('.', ''),
  }));

  useEffect(() => {
    const fetchUsername = async () => {
      const savedUsername = await AsyncStorage.getItem('username');
      if (savedUsername) {
        console.log('Username loaded:', savedUsername);
      }
    };
    fetchUsername();
  }, []);

  useEffect(() => {
    const loadWeights = async () => {
      try {
        const storedWeights = await AsyncStorage.getItem('weights');
        if (storedWeights) {
          setWeights(JSON.parse(storedWeights));
        }
      } catch (error) {
        console.error('Error loading weights', error);
      }
    };

    loadWeights();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, {username}!</Text>
      <Text style={styles.weightTitle}>
        ¿Cuánto pesás hoy?
      </Text>

      <TextInput
        placeholder="Ej: 70,.3"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        style={styles.weightForm}
      />
      <View style={styles.confirmationButton}>
        <Button title="Agregar peso" onPress={handleAddWeight} />
      </View>

      {chartData.length > 0 && (
        <View style={styles.weightChart}>
          <Text style={styles.weightEvolution}>Evolución del peso</Text>
          <LineChart
            data={chartData}
            curved
            thickness={3}
            color="#4a90e2"
            hideDataPoints={false}
            yAxisTextStyle={{ color: '#4a90e2' }}
            xAxisLabelTextStyle={{ color: '#ccc', fontSize: 12 }}
            yAxisLabelWidth={30}
            maxValue={120}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `#a3b8f0`,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    color: '#333',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  weightTitle: {
    color: '#333',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 15,
    textAlign: 'center',
  },
  weightForm: {
    backgroundColor: '#ffffff',
    color: '#333',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc',

  },
  confirmationButton: {
    marginBottom: 20,
  },
  weightChart: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  weightEvolution: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },

});

export default HomeScreen;
