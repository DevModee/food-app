import React, { useState } from 'react';
import { View, TextInput, Alert, Button, TouchableOpacity, Text } from 'react-native';
import { register } from '../api/api';

const RegisterScreen = ({ navigation }): any => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const user = await register(username, password );
      Alert.alert('Registro exitoso');
      navigation.navigate('Home', { username: user.username });
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el usuario');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Nombre"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Registrarse" onPress={handleRegister} />

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: 'blue', marginTop: 10 }}>
          Ya tienes una cuenta? Inicia sesión
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default RegisterScreen;
