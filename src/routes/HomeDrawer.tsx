import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '@features/home/screens/Home';
import HomeDrawerComponent from '@features/home/components/HomeDrawerComponent';

export type DrawerStackParamsList = {
  HomeDrawer: undefined;
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
        },
        swipeEnabled: true,
      }}
      drawerContent={() => <HomeDrawerComponent />}>
      <Drawer.Screen name="HomeDrawer" component={Home} />
    </Drawer.Navigator>
  );
}
