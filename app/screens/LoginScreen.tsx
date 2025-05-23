import React, { useState } from 'react';
import { View, TextInput, Alert, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { login } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }): any => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      const loggedInUser = response.user;

      if (loggedInUser && loggedInUser.username) {
        await AsyncStorage.setItem('username', loggedInUser.username);
        Alert.alert('Login existoso');
        navigation.navigate('Home', { username: loggedInUser.username });
      } else {
        throw new Error('No se recibieron datos validos del usuario');
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Error al iniciar sesión';
      console.error(message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicia sesión</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleLogin} />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>¿No tenes cuenta? Registrate</Text>
        </TouchableOpacity>

      </View>

  );
};


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

export default LoginScreen;
