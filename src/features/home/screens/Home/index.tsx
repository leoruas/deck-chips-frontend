import { theme } from '@app/theme';
import CardsList from '@shared/components/CardsList';
import { Box } from '@shared/components/layout/Box';
import { SafeAreaBox } from '@shared/components/layout/SafeAreaBox';
import Spacer from '@shared/components/layout/Spacer';
import SearchBar from '@shared/components/SearchBar';
import React from 'react';
import { StatusBar } from 'react-native';

export default function Home() {
  return (
    <SafeAreaBox flex={1} bg="bg_primary">
      <StatusBar backgroundColor={theme.colors.bg_primary} />

      <Box flex={1} px="md">
        <SearchBar showMenu rightButtons={['community', 'decks', 'filters']} />

        <Spacer height={12} />

        <CardsList />
      </Box>
    </SafeAreaBox>
  );
}
