import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '@features/home/screens/Home';
import DrawerMenu from '@shared/components/DrawerMenu';
import DrawerFilters from '@shared/components/DrawerFilters';

const LeftDrawer = createDrawerNavigator();
const RightDrawer = createDrawerNavigator();

const LeftDrawerScreen = () => {
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
      <LeftDrawer.Screen name="HomeLeftDrawer" component={Home} />
    </LeftDrawer.Navigator>
  );
};

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
      <RightDrawer.Screen name="HomeDrawer" component={LeftDrawerScreen} />
    </RightDrawer.Navigator>
  );
}
