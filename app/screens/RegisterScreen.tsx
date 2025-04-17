import React, { useState } from 'react';
import { View, TextInput, Alert, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { register } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWeightContext } from '../context/WeightContext';

const RegisterScreen = ({ navigation }): any => {
  const [username, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');

  const { setUsername } = useWeightContext();


  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    try {
      const response = await register(username, password);
      console.log('Usuario registrado:', response);

      const registeredUser = response.user;

      if (registeredUser && registeredUser.username) {
        await AsyncStorage.setItem('username', registeredUser.username);
        setUsername(registeredUser.username); // <- IMPORTANTE
        Alert.alert('Registro exitoso');
        navigation.navigate('Home', { username: registeredUser.username });
      } else {
        throw new Error('No se recibieron datos válidos del usuario');
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Error al registrar el usuario';
      Alert.alert('Error', message);
      console.error(message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrate</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#111"
          value={username}
          onChangeText={setUsernameInput}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#111"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Registrarse" onPress={handleRegister} />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>¿Ya tienes una cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: `#a3b8f0`,
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    backgroundColor: '#8eb7f5',
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    borderColor: '#8eb7f5',
    borderWidth: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 20,
    color: '#000000',
    textAlign: 'center',
  },
  linkText: {
    color: '#0077B6',
    textAlign: 'center',
    marginTop: 15,
  },
  buttonContainer: {
    color: "#00AEEF",
    borderRadius: 8,
    paddingHorizontal: 50,
  }
});


export default RegisterScreen;
