import React, { useState } from 'react';
import { View, TextInput, Alert, Button } from 'react-native';
import api from '../api/api';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLolgin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      Alert.alert('Login existoso');
    } catch (error) {
      Alert.alert('Error');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Emaill" value={email} onChangeText={setEmail} />"
      <TextInput placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Iniciar sesión" onPress={handleLolgin} />
    </View>
  )
}
