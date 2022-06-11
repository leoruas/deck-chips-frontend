import { theme } from '@app/theme';
import CardsList from '@shared/components/CardsList';
import { Box } from '@shared/components/layout/Box';
import { SafeAreaBox } from '@shared/components/layout/SafeAreaBox';
import Spacer from '@shared/components/layout/Spacer';
import SearchBar, { SearchBarButtonOptions } from '@shared/components/SearchBar';
import Text from '@shared/components/Text';
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { BottomBarTextButton, BottomBarWrapper, SaveButtonWrapper } from './styles';
import SaveIcon from '@assets/icons/save.svg';
import { normalize } from '@shared/helpers/normalize-pixels';
import { useTranslation } from 'react-i18next';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getCards } from '@app/api/services/cards/get-cards.service';
import { IGetCardResponse } from '@shared/types/cards.types';
import { debounce } from 'lodash';
import { useFilters } from '@shared/contexts/FilterContext';
import { useDeck } from '@shared/contexts/DeckContext';
import { saveDeck } from '@app/api/services/decks/save-deck.service';
import Loader from '@shared/components/Loader';
import { DefaultStackParamList } from '@app/routes/Default.routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { updateDeck } from '@app/api/services/decks/update-deck.service';

type PageProps = NativeStackScreenProps<DefaultStackParamList, 'EditDeck'>;

export default function EditDeck({ route }: PageProps) {
  const { disableEdit } = route.params;
  const rightButtons: SearchBarButtonOptions[] = disableEdit
    ? ['filters']
    : ['deck_cover', 'filters'];
  const { t } = useTranslation('edit_deck');
  const navigation = useNavigation();
  const { deck } = useDeck();

  const [page, setPage] = useState(1);
  const [cards, setCards] = useState<IGetCardResponse[]>([]);
  const [search, setSearch] = useState('');
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { currentFilterOption, currentFilterValue, resetFilters } = useFilters();
  const isFocused = useIsFocused();
  const [deckCards, setDeckCards] = useState(deck?.cards ? [...deck.cards] : []);

  const fetchCards = async (pageNum: number, name: string) => {
    setIsFetching(true);
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
    setIsFetching(false);
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
        <Loader showLoader={isLoading} />
        <SearchBar text={search} onChangeText={onSearchChange} rightButtons={rightButtons} />

        <Spacer height={12} />

        <CardsList
          showCardAmount
          disableEdit={disableEdit}
          cards={cards}
          deckCards={deckCards}
          onAddCard={(code: string) => {
            setDeckCards(prev => [...prev, code]);
          }}
          onRemoveCard={(code: string) => {
            const index = deckCards.indexOf(code);
            setDeckCards(prev => prev.filter((_, i) => i !== index));
          }}
          onEndReached={onEndReached}
          isLoading={isFetching}
        />
      </Box>

      <BottomBarWrapper>
        <BottomBarTextButton
          onPress={() => {
            navigation.navigate('DeckCards', {
              deckCards,
              deckTitle: deck?.title ?? '',
            });
          }}>
          <Text numberOfLines={1}>{t('cards')}</Text>
        </BottomBarTextButton>
        <SaveButtonWrapper
          onPress={async () => {
            if (disableEdit) {
              return;
            }
            setIsLoading(true);

            if (!deckCards.length) {
              setIsLoading(false);
              return;
            }
            const coverCardCode =
              deck?.coverCardCode === '' ? deckCards[0] : deck?.coverCardCode ?? '';

            if (deck?._id) {
              await updateDeck({
                id: deck._id,
                title: deck?.title ?? 'New Deck',
                coverCardCode,
                cards: deckCards.slice(0, 40),
              });
            } else {
              await saveDeck({
                title: deck?.title ?? 'New Deck',
                coverCardCode,
                cards: deckCards.slice(0, 40),
              });
            }
            setIsLoading(false);
            navigation.goBack();
          }}>
          <SaveIcon width={normalize(50)} height={normalize(50)} fill={theme.colors.text_default} />
        </SaveButtonWrapper>
        <BottomBarTextButton
          onPress={() => {
            navigation.navigate('DeckInfo', {
              deckCards,
              deckTitle: deck?.title ?? '',
            });
          }}>
          <Text numberOfLines={1}>{t('info')}</Text>
        </BottomBarTextButton>
      </BottomBarWrapper>
    </SafeAreaBox>
  );
}
