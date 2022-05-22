import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeDrawer from './HomeDrawer';
import MyFavorites from '@features/favorites/screens/MyFavorites';

export type DefaultStackParamList = {
  Home: undefined;
  MyFavorites: undefined;
};

const Stack = createNativeStackNavigator<DefaultStackParamList>();

export default function DefaultRoutes() {
  return (
    <Stack.Navigator initialRouteName={'Home'} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeDrawer} />
      <Stack.Screen name="MyFavorites" component={MyFavorites} />
    </Stack.Navigator>
  );
}
