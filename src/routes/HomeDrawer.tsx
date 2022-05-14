import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '@features/home/screens/Home';
import HomeDrawerComponent from '@features/home/components/HomeDrawerComponent';
import { theme } from '@app/theme';

export type DrawerStackParamsList = {
  Home: undefined;
};

const Drawer = createDrawerNavigator<DrawerStackParamsList>();

export default function DrawerMyProfile() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        drawerStyle: {
          width: '65%',
          backgroundColor: theme.colors.bg_secondary,
        },
        swipeEnabled: true,
      }}
      drawerContent={() => <HomeDrawerComponent />}>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
}
