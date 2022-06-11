import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerFilters from '@shared/components/DrawerFilters';
import EditDeck from '@features/decks/screens/EditDeck';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IDeckType } from '@shared/types/cards.types';
import { DefaultStackParamList } from './Default.routes';
import DeckCover from '@features/decks/screens/DeckCover';

const RightDrawer = createDrawerNavigator();

export default function RightDrawerScreen() {
  return (
    <RightDrawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerStyle: {
          width: '75%',
        },
        swipeEnabled: false,
      }}
      drawerContent={() => <DrawerFilters />}>
      <RightDrawer.Screen name="DeckCoverDrawer" component={DeckCover} />
    </RightDrawer.Navigator>
  );
}
