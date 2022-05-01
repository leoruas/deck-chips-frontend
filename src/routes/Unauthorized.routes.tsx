import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@features/auth/Login';

export type UnauthorizedStackParamList = {
  Login: undefined;
};

const Stack = createNativeStackNavigator<UnauthorizedStackParamList>();

export default function UnauthorizedRoutes() {
  return (
    <Stack.Navigator initialRouteName={'Login'} screenOptions={{ headerShown: false }}>
      <Stack.Group
        screenOptions={{
          animation: 'slide_from_bottom',
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
