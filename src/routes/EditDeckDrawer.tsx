import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerFilters from '@shared/components/DrawerFilters';
import EditDeck from '@features/decks/screens/EditDeck';

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
      <RightDrawer.Screen name="EditDeckDrawer" component={EditDeck} />
    </RightDrawer.Navigator>
  );
}
