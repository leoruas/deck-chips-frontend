import { theme } from '@app/theme';
import GradientBox from '@shared/components/layout/GradientBox';
import { SafeAreaBox } from '@shared/components/layout/SafeAreaBox';
import Spacer from '@shared/components/layout/Spacer';
import SearchBar from '@shared/components/SearchBar';
import React from 'react';
import { StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FlatGrid } from 'react-native-super-grid';
import { Card } from './styles';

const getCards = (cardsAmount = 20) => Array.from({ length: cardsAmount }, (_, i) => i);

export default function Home() {
  return (
    <SafeAreaBox flex={1}>
      <StatusBar backgroundColor={theme.colors.bg_primary} />

      <GradientBox>
        <SearchBar showMenu rightButtons={['community', 'decks', 'filters']} />
        <Spacer height={12} />

        <FlatGrid
          data={getCards()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity>
                <Card key={item} />
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </GradientBox>
    </SafeAreaBox>
  );
}
