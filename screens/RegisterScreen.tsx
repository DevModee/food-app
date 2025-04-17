import React, { useState } from 'react';
import { View, TextInput, Alert, Button } from 'react-native';
import { register } from '../api/api';

const RegisterScreen = ({ navigation }): any => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const user = await register(email, password );
      Alert.alert('Registro exitoso');
      navigation.navigate('Bienvenido', { username: user.name });
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el usuario');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  )
}

export default RegisterScreen;
