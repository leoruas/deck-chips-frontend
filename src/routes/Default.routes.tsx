import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeDrawer from './HomeDrawer';
import MyDecksDrawer from './MyDecksDrawer';
import EditDeckDrawer from './EditDeckDrawer';
import MyFavorites from '@features/favorites/screens/MyFavorites';
import Settings from '@features/settings/screens/Settings';

export type DefaultStackParamList = {
  Home: undefined;
  MyFavorites: undefined;
  MyDecks: undefined;
  Settings: undefined;
  EditDeck: undefined;
};

const Stack = createNativeStackNavigator<DefaultStackParamList>();

export default function DefaultRoutes() {
  return (
    <Stack.Navigator initialRouteName={'Home'} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeDrawer} />
      <Stack.Screen name="MyFavorites" component={MyFavorites} />
      <Stack.Screen name="MyDecks" component={MyDecksDrawer} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="EditDeck" component={EditDeckDrawer} />
    </Stack.Navigator>
  );
}
