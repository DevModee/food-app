import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './navigation/AuthNavigator';
import HomeScreen from './screens/HomeScreen';
import { WeightProvider } from './context/WeightContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <WeightProvider>
      <NavigationContainer>
        <Stack.Navigator id={undefined} initialRouteName="Auth" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthNavigator} />
          <Stack.Screen name="Welcome" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </WeightProvider>
  );
}
