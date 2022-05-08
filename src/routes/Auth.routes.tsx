import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '@features/auth/SignUp';
import Login from '@features/auth/Login';
import LoginPassword, { LoginPasswordProps } from '@features/auth/LoginPassword';

export type AuthStackParamList = {
  SignUp: undefined;
  Login: undefined;
  LoginPassword: LoginPasswordProps;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthRoutes() {
  return (
    <Stack.Navigator initialRouteName={'Login'} screenOptions={{ headerShown: false }}>
      <Stack.Group
        screenOptions={{
          animation: 'simple_push',
        }}>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="LoginPassword" component={LoginPassword} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
