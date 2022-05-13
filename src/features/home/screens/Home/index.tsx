import { theme } from '@app/theme';
import { Box } from '@shared/components/layout/Box';
import { SafeAreaBox } from '@shared/components/layout/SafeAreaBox';
import SearchBar from '@shared/components/SearchBar';
import React from 'react';
import { StatusBar } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Card } from './styles';

const getCards = (cardsAmount = 20) => Array.from({ length: cardsAmount }, (_, i) => i);

export default function Home() {
  return (
    <SafeAreaBox flex={1} bg="bg_primary">
      <StatusBar backgroundColor={theme.colors.bg_primary} />
      <Box px="md" pt="lg" flex={1}>
        <SearchBar showMenu rightButtons={['community', 'decks', 'filters']} />

        <FlatGrid
          data={getCards()}
          renderItem={({ item }) => {
            return <Card key={item} />;
          }}
        />
      </Box>
    </SafeAreaBox>
  );
}
