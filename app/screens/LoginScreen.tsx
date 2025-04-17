import React, { useState } from 'react';
import { View, TextInput, Alert, Button } from 'react-native';
import { login } from '../api/api';

const LoginScreen = ({ navigation }): any => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const user = await login(username, password);
      Alert.alert('Login existoso');
      navigation.navigate('Home', { username: user.username });
    } catch (error) {
      Alert.alert('Error', 'Contraseña o email incorrecto');
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
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
