import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerFilters from '@shared/components/DrawerFilters';
import EditDeck from '@features/decks/screens/EditDeck';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IDeckType } from '@shared/types/cards.types';
import { DefaultStackParamList } from './Default.routes';

const RightDrawer = createDrawerNavigator();

export type EditDeckProps = {
  deck: IDeckType;
};

type PageProps = NativeStackScreenProps<DefaultStackParamList, 'EditDeck'>;

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
