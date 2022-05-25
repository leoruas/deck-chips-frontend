import React from 'react';
import { StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Text from '@shared/components/Text';
import CardsList from '@shared/components/CardsList';
import { useTranslation } from 'react-i18next';
import AppBar from '@shared/components/AppBar';
import { SafeAreaBox } from '@shared/components/layout/SafeAreaBox';
import { theme } from '@app/theme';
import { normalize } from '@shared/helpers/normalize-pixels';
import { Box } from '@shared/components/layout/Box';
import DecksList from '@shared/components/DecksList';

const Tab = createMaterialTopTabNavigator();

export default function MyFavorites() {
  const { t } = useTranslation('favorites');

  return (
    <SafeAreaBox flex={1} bg="bg_primary">
      <StatusBar backgroundColor={theme.colors.bg_primary} />

      <Box px="md" flex={1}>
        <AppBar title={t('title')} />

        {/* @ts-ignore */}
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarLabel: () => (
              <Text numberOfLines={1} fontSize={normalize(30)}>
                {route.name.toUpperCase()}
              </Text>
            ),
            tabBarStyle: {
              elevation: 0,
              marginHorizontal: normalize(24),
              marginBottom: normalize(16),
              borderBottomColor: theme.colors.tabbar_line,
              borderBottomWidth: normalize(4),
              backgroundColor: theme.colors.transparent,
            },
            tabBarIndicatorStyle: {
              backgroundColor: theme.colors.text_default,
              height: normalize(4),
              bottom: normalize(-4),
            },
            tabBarInactiveTintColor: theme.colors.tabbar_line,
          })}>
          <Tab.Screen name={t('cards')} children={() => <CardsList />} />

          <Tab.Screen name={t('decks')} children={() => <DecksList />} />
        </Tab.Navigator>
      </Box>
    </SafeAreaBox>
  );
}
