import { theme } from '@app/theme';
import { Box } from '@shared/components/layout/Box';
import { SafeAreaBox } from '@shared/components/layout/SafeAreaBox';
import Spacer from '@shared/components/layout/Spacer';
import SearchBar from '@shared/components/SearchBar';
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import PlusIcon from '@assets/icons/plus.svg';
import { normalize } from '@shared/helpers/normalize-pixels';
import { BottomButton } from './styles';
import DecksList from '@shared/components/DecksList';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDeck } from '@shared/contexts/DeckContext';
import { getDecks } from '@app/api/services/decks/get-decks.service';
import { IDeckType } from '@shared/types/cards.types';
import { debounce } from 'lodash';
import { useAuth } from '@shared/contexts/AuthContext';

export default function MyDecks() {
  const navigation = useNavigation();
  const { setNewDeck } = useDeck();
  const [search, setSearch] = React.useState('');
  const [decks, setDecks] = useState<IDeckType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();
  const { authData } = useAuth();

  const fetchDecks = async (title: string) => {
    setIsLoading(true);
    const userId = authData?.id;
    const decks = await getDecks({ search: title, userId });

    setDecks(decks);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDecks(search);
  }, [isFocused]);

  const onSearchChange = (text: string) => {
    setSearch(text);
    setDecks([]);
    dFetchDecks(text);
  };

  const dFetchDecks = useCallback(debounce(fetchDecks, 500), []);

  return (
    <SafeAreaBox flex={1} bg="bg_primary">
      <StatusBar backgroundColor={theme.colors.bg_primary} />

      <Box flex={1} px="md">
        <SearchBar
          text={search}
          onChangeText={onSearchChange}
          showMenu
          rightButtons={['community', 'home', 'decks_menu']}
        />

        <Spacer height={12} />

        <DecksList decks={decks} isLoading={isLoading} />
      </Box>

      <BottomButton
        onPress={() => {
          setNewDeck();
          navigation.navigate('EditDeck', {});
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
