import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useWeightContext } from '../context/WeightContext';
import { LineChart } from 'react-native-gifted-charts';

const HomeScreen = () => {

  const { username, weightData, addWeight } = useWeightContext();
  const [weight, setWeight] = useState('')

  const handleAddWeight = () => {
    if (!weight) return;

    const newEntry = {
      value: parseFloat(weight),
      date: new Date().toISOString(),
    };

    addWeight(newEntry);
    setWeight('');
  };

  const chartData = weightData.map((entry) => ({
    value: entry.value,
    label: new Date(entry.date).getDate().toString(),
  }));

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
