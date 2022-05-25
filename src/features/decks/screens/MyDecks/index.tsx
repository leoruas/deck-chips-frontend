import { theme } from '@app/theme';
import { Box } from '@shared/components/layout/Box';
import { SafeAreaBox } from '@shared/components/layout/SafeAreaBox';
import Spacer from '@shared/components/layout/Spacer';
import SearchBar from '@shared/components/SearchBar';
import React from 'react';
import { StatusBar } from 'react-native';
import PlusIcon from '@assets/icons/plus.svg';
import { normalize } from '@shared/helpers/normalize-pixels';
import { BottomButton } from './styles';
import DecksList from '@shared/components/DecksList';

export default function MyDecks() {
  return (
    <SafeAreaBox flex={1} bg="bg_primary">
      <StatusBar backgroundColor={theme.colors.bg_primary} />

      <Box flex={1} px="md">
        <SearchBar showMenu rightButtons={['community', 'home', 'decks_menu']} />

        <Spacer height={12} />

        <DecksList />
      </Box>

      <BottomButton
        onPress={() => {
          // TODO: navigate to new deck
          console.log('New Deck');
        }}>
        <PlusIcon
          width={normalize(40)}
          height={normalize(40)}
          stroke={theme.colors.text_default}
          fill={theme.colors.text_default}
        />
      </BottomButton>
    </SafeAreaBox>
  );
}
