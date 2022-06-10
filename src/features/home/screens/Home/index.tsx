import { getCards } from '@app/api/services/cards/get-cards.service';
import { theme } from '@app/theme';
import CardsList from '@shared/components/CardsList';
import { Box } from '@shared/components/layout/Box';
import { SafeAreaBox } from '@shared/components/layout/SafeAreaBox';
import Spacer from '@shared/components/layout/Spacer';
import SearchBar from '@shared/components/SearchBar';
import { IGetCardResponse } from '@shared/types/cards.types';
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import debounce from 'lodash/debounce';

export default function Home() {
  const [page, setPage] = useState(1);
  const [cards, setCards] = useState<IGetCardResponse[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchCards = async (pageNum: number, name: string) => {
    setIsLoading(true);
    const cards = await getCards({ page: pageNum, name });
    setPage(pageNum);
    setCards(prev => [...prev, ...cards]);
    setIsLoading(false);
  };

  const dFetchCards = useCallback(debounce(fetchCards, 500), []);

  useEffect(() => {
    fetchCards(1, search);
  }, []);

  const onSearchChange = (text: string) => {
    setSearch(text);
    setCards([]);
    dFetchCards(1, text);
  };

  const onEndReached = () => {
    dFetchCards(page + 1, search);
  };

  return (
    <SafeAreaBox flex={1} bg="bg_primary">
      <StatusBar backgroundColor={theme.colors.bg_primary} />

      <Box flex={1} px="md">
        <SearchBar
          text={search}
          onChangeText={onSearchChange}
          showMenu
          rightButtons={['community', 'decks', 'filters']}
        />

        <Spacer height={12} />

        <CardsList cards={cards} onEndReached={onEndReached} isLoading={isLoading} />
      </Box>
    </SafeAreaBox>
  );
}
