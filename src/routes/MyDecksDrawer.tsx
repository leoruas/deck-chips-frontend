import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MyDecks from '@features/decks/screens/MyDecks';
import DrawerMenu from '@shared/components/DrawerMenu';

const LeftDrawer = createDrawerNavigator();

export default function LeftDrawerScreen() {
  return (
    <LeftDrawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        drawerStyle: {
          width: '65%',
        },
      }}
      drawerContent={() => <DrawerMenu />}>
      <LeftDrawer.Screen name="MyDecksLeftDrawer" component={MyDecks} />
    </LeftDrawer.Navigator>
  );
}
