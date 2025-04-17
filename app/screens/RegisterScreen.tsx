import React, { useState } from 'react';
import { View, TextInput, Alert, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { register } from '../api/api';

const RegisterScreen = ({ navigation }): any => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const user = await register(username, password);
      Alert.alert('Registro exitoso');
      navigation.navigate('Home', { username: user.username });
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el usuario');
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
          onChangeText={setUsername}
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
