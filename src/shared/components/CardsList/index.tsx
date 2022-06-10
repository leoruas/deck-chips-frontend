import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { IGetCardResponse } from '@shared/types/cards.types';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import CardModal from '../CardModal';
import { Box } from '../layout/Box';
import GradientBox from '../layout/GradientBox';
import { AddSubtractButtonWrapper, Card, EmptyCardSlot, FilledCardSlot } from './styles';
import PlusIcon from '@assets/icons/plus.svg';
import MinusIcon from '@assets/icons/minus.svg';
import { theme } from '@app/theme';
import { normalize } from '@shared/helpers/normalize-pixels';
import { useDeck } from '@shared/contexts/DeckContext';
import { getCardByCode } from '@app/api/services/cards/get-card-by-code.service';

type CardsListProps = {
  cards: IGetCardResponse[];
  onEndReached: () => void;
  isLoading: boolean;
  showCardAmount?: boolean;
  disableEdit?: boolean;
  deckCards?: string[];
  onAddCard?: (cardCode: string) => void;
  onRemoveCard?: (cardCode: string) => void;
  selectable?: boolean;
};

export default function CardsList({
  cards,
  onEndReached,
  isLoading,
  showCardAmount,
  disableEdit,
  deckCards,
  onAddCard,
  onRemoveCard,
  selectable,
}: CardsListProps) {
  const { deck, setDeckCover } = useDeck();

  const [selectedCard, setSelectedCard] = useState<IGetCardResponse | undefined>(undefined);
  const cardModalRef = useRef<BottomSheetModal>(null);

  const fetchInitialCard = async () => {
    if (!deck) return;
    const card = await getCardByCode(deck.coverCardCode);
    setSelectedCard(card);
  };

  useEffect(() => {
    if (selectable && deck?.coverCardCode) {
      fetchInitialCard();
    }
  }, [deck?.coverCardCode]);

  const countOccurrences = (arr: any[], val: any) =>
    arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

  const isSelectedCard = (card: IGetCardResponse) => {
    return selectedCard?.cardCode === card.cardCode;
  };

  return (
    <Box flex={1}>
      <GradientBox>
        <FlatGrid
          data={cards}
          onEndReached={onEndReached}
          renderItem={({ item, index }) => {
            let amount = countOccurrences(deckCards ?? [], item.cardCode);
            const opacity = selectable && !isSelectedCard(item) ? 0.3 : 1;

            return (
              <Box opacity={opacity}>
                <TouchableOpacity
                  key={`home-cards-list-${index}`}
                  onPress={() => {
                    setSelectedCard(item);
                    if (selectable) {
                      setDeckCover(item.cardCode);
                    } else {
                      cardModalRef.current?.present();
                    }
                  }}>
                  <Card source={{ uri: item.assets[0].gameAbsolutePath }} />
                </TouchableOpacity>
                {showCardAmount && (
                  <Box flexDirection="row" justifyContent="center" alignItems="center" my="sm">
                    {!disableEdit && (
                      <AddSubtractButtonWrapper
                        disabled={amount === 0}
                        onPress={() => {
                          onRemoveCard?.(item.cardCode);
                        }}>
                        <MinusIcon
                          width={normalize(14)}
                          height={normalize(14)}
                          stroke={theme.colors.text_default}
                          fill={theme.colors.text_default}
                        />
                      </AddSubtractButtonWrapper>
                    )}
                    {Array.from({ length: 3 }, (_, i) => i).map(i => {
                      if (i < amount) {
                        return <FilledCardSlot />;
                      } else {
                        return <EmptyCardSlot />;
                      }
                    })}
                    {!disableEdit && (
                      <AddSubtractButtonWrapper
                        disabled={amount === 3}
                        onPress={() => {
                          onAddCard?.(item.cardCode);
                        }}>
                        <PlusIcon
                          width={normalize(18)}
                          height={normalize(18)}
                          stroke={theme.colors.text_default}
                          fill={theme.colors.text_default}
                        />
                      </AddSubtractButtonWrapper>
                    )}
                  </Box>
                )}
              </Box>
            );
          }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => {
            return (
              <Box flex={1}>
                {isLoading && <ActivityIndicator color={theme.colors.text_default} size="large" />}
              </Box>
            );
          }}
        />
      </GradientBox>

      <CardModal ref={cardModalRef} card={selectedCard} />
    </Box>
  );
}
