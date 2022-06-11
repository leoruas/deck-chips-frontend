import { getCards } from '@app/api/services/cards/get-cards.service';
import { theme } from '@app/theme';
import CardsList from '@shared/components/CardsList';
import { Box } from '@shared/components/layout/Box';
import { SafeAreaBox } from '@shared/components/layout/SafeAreaBox';
import Spacer from '@shared/components/layout/Spacer';
import SearchBar from '@shared/components/SearchBar';
import { IGetCardResponse } from '@shared/types/cards.types';
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, TextInput } from 'react-native';
import debounce from 'lodash/debounce';
import { useFilters } from '@shared/contexts/FilterContext';
import { useIsFocused } from '@react-navigation/native';
import { Deck } from '@shared/components/DecksList/styles';
import { useDeck } from '@shared/contexts/DeckContext';
import { normalize } from '@shared/helpers/normalize-pixels';
import { TextInputWrapper } from '@shared/components/TextField/styles';

export default function DeckCover() {
  const [page, setPage] = useState(1);
  const [cards, setCards] = useState<IGetCardResponse[]>([]);
  const [search, setSearch] = useState('');
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { currentFilterOption, currentFilterValue, resetFilters } = useFilters();
  const isFocused = useIsFocused();
  const { deck, setDeckTitle } = useDeck();

  const fetchCards = async (pageNum: number, name: string) => {
    setIsLoading(true);
    const cards = await getCards({
      page: pageNum,
      name,
      filterOption: currentFilterOption,
      filterValue: currentFilterValue,
    });
    setPage(pageNum);

    if (cards.length === 0) {
      setIsLastPage(true);
    }
    setCards(prev => [...prev, ...cards]);
    setIsLoading(false);
  };

  const dFetchCards = useCallback(debounce(fetchCards, 500), []);

  useEffect(() => {
    resetFilters();
  }, [isFocused]);

  useEffect(() => {
    setCards([]);
    fetchCards(1, search);
  }, [currentFilterValue, currentFilterOption]);

  const onSearchChange = (text: string) => {
    setSearch(text);
    setCards([]);
    dFetchCards(1, text);
  };

  const onEndReached = () => {
    if (isLastPage) {
      return;
    }
    dFetchCards(page + 1, search);
  };

  return (
    <SafeAreaBox flex={1} bg="bg_primary">
      <StatusBar backgroundColor={theme.colors.bg_primary} />

      <Box flex={1} px="md">
        <SearchBar text={search} onChangeText={onSearchChange} rightButtons={['filters']} />

        <Spacer height={12} />

        <CardsList cards={cards} onEndReached={onEndReached} isLoading={isLoading} selectable />

        <Box
          position="absolute"
          style={{
            bottom: normalize(10),
            width: '100%',
            left: '3%',
          }}>
          <TextInputWrapper noFlex>
            <TextInput
              value={deck?.title}
              onChangeText={setDeckTitle}
              placeholderTextColor={theme.colors.text_default}
              style={{
                fontSize: normalize(27),
                color: theme.colors.text_default,
                fontFamily: 'Univers-Condensed',
                letterSpacing: normalize(1.5),
                marginHorizontal: normalize(8),
              }}
            />
          </TextInputWrapper>
        </Box>
      </Box>
    </SafeAreaBox>
  );
}
