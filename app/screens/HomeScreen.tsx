import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useWeightContext } from '../context/WeightContext';
import { LineChart } from 'react-native-gifted-charts';
import DatePickerInput from '../components/DatePickerInput';

const HomeScreen = () => {

  const { userId, username, weightData, addWeight } = useWeightContext();
  const [weight, setWeight] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleAddWeight = () => {
    if (!weight) {
      Alert.alert('Error', 'Por favor ingresa un peso válido.');
      return;
    }
    const isoDate = selectedDate.toISOString().split('T')[0];

    const existing = weightData.find(
      (item) => item.userId === userId && item.date.startsWith(isoDate)
    );

    const newEntry = {
      value: parseFloat(weight),
      date: selectedDate.toISOString(),
      userId: username,
    };

    if (existing) {
      Alert.alert('Error', 'Ya existe un peso registrado para esta fecha');
    } else {
      addWeight(newEntry);
      setWeight('');
    }
  };

  const chartData = weightData
    .filter(item => item.userId === userId)
    .map((item) => ({
      value: item.value,
      label: new Date(item.date).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short'
      }).replace('.', ''),
    }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, {username}!</Text>
      <Text style={styles.weightTitle}>
        ¿Cuánto pesás hoy?
      </Text>

      <DatePickerInput date={selectedDate} setDate={setSelectedDate} />

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

      {weightData.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No hay datos de peso disponibles. Agrega tu primer peso para comenzar.
        </Text>
      ) : weightData.some(
          (item) =>
            item.userId === userId &&
            item.date.startsWith(selectedDate.toISOString().split('T')[0])
        ) ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          Ya registraste un peso para esta fecha.
        </Text>
      ) : null}


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
