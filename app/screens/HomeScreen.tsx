import React from 'react';
import { View, Text } from 'react-native';

const HomeScreen = ({ route }: any) => {
  const { username } = route.params;

  return (
    <View>
      <Text>Bienvenido, {username}!</Text>
    </View>
  )
}

export default HomeScreen;
