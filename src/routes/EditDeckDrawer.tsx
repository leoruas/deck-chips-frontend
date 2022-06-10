import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerFilters from '@shared/components/DrawerFilters';
import EditDeck from '@features/decks/screens/EditDeck';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DefaultStackParamList } from './Default.routes';

export type EditDeckProps = {
  disableEdit?: boolean;
};

type PageProps = NativeStackScreenProps<DefaultStackParamList, 'EditDeck'>;

const RightDrawer = createDrawerNavigator();

export default function RightDrawerScreen({ route }: PageProps) {
  const params = route.params;

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
      <RightDrawer.Screen
        name="EditDeckDrawer"
        initialParams={{ ...params }}
        component={EditDeck}
      />
    </RightDrawer.Navigator>
  );
}
