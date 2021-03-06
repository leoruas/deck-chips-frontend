import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeDrawer from './HomeDrawer';
import MyDecksDrawer from './MyDecksDrawer';
import EditDeckDrawer, { EditDeckProps } from './EditDeckDrawer';
import DeckCoverDrawer from './DeckCoverDrawer';
import MyFavorites from '@features/favorites/screens/MyFavorites';
import Settings from '@features/settings/screens/Settings';
import DeckInfo, { DeckInfoProps } from '@features/decks/screens/DeckInfo';
import DeckCards, { DeckCardsProps } from '@features/decks/screens/DeckCards';
import CommunityDecks from '@features/community/screens/ComunityDecks';

export type DefaultStackParamList = {
  Home: undefined;
  MyFavorites: undefined;
  MyDecks: undefined;
  Settings: undefined;
  EditDeck: EditDeckProps;
  DeckInfo: DeckInfoProps;
  DeckCards: DeckCardsProps;
  DeckCover: undefined;
  CommunityDecks: undefined;
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
      <Stack.Screen name="DeckInfo" component={DeckInfo} />
      <Stack.Screen name="DeckCards" component={DeckCards} />
      <Stack.Screen name="DeckCover" component={DeckCoverDrawer} />
      <Stack.Screen name="CommunityDecks" component={CommunityDecks} />
    </Stack.Navigator>
  );
}
