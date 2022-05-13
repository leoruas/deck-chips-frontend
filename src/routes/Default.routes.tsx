import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@features/home/screens/Home';

export type DefaultStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<DefaultStackParamList>();

export default function DefaultRoutes() {
  return (
    <Stack.Navigator initialRouteName={'Home'} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
