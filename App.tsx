import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavitator from './navigation/AuthNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <AuthNavitator />
    </NavigationContainer>
  )
}
