import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, View } from 'react-native';
import Login from './src/screens/Login';
import Home from './src/screens/Comercio/Home';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Home" 
        component={Home}
        options={{
          headerLeft: null,
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#FFD700',
          headerTitleStyle: { color: '#FFD700' },
        }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
