import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ICardType, IGetCardResponse } from '@shared/types/cards.types';
import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import CardModal from '../CardModal';
import { Box } from '../layout/Box';
import GradientBox from '../layout/GradientBox';
import { AddSubtractButtonWrapper, Card, EmptyCardSlot, FilledCardSlot } from './styles';
import PlusIcon from '@assets/icons/plus.svg';
import MinusIcon from '@assets/icons/minus.svg';
import { theme } from '@app/theme';
import { normalize } from '@shared/helpers/normalize-pixels';
import { getCards } from '@app/api/services/cards/get-cards.service';

type CardsListProps = {
  showCardAmount?: boolean;
};

export default function CardsList({ showCardAmount }: CardsListProps) {
  const [selectedCard, setSelectedCard] = useState<IGetCardResponse | undefined>(undefined);
  const cardModalRef = useRef<BottomSheetModal>(null);
  const [page, setPage] = useState(1);
  const [cards, setCards] = useState<IGetCardResponse[]>([]);

  const fetchCards = async () => {
    const cards = await getCards(1);
    setCards(cards);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <Box flex={1}>
      <GradientBox>
        <FlatGrid
          data={cards}
          renderItem={({ item, index }) => {
            return (
              <Box>
                <TouchableOpacity
                  key={`home-cards-list-${index}`}
                  onPress={() => {
                    setSelectedCard(item);
                    cardModalRef.current?.present();
                  }}>
                  <Card source={{ uri: item.assets[0].gameAbsolutePath }} />
                </TouchableOpacity>
                {showCardAmount && (
                  <Box flexDirection="row" justifyContent="center" alignItems="center" my="sm">
                    <AddSubtractButtonWrapper>
                      <MinusIcon
                        width={normalize(14)}
                        height={normalize(14)}
                        stroke={theme.colors.text_default}
                        fill={theme.colors.text_default}
                      />
                    </AddSubtractButtonWrapper>
                    <FilledCardSlot />
                    <EmptyCardSlot />
                    <EmptyCardSlot />
                    <AddSubtractButtonWrapper>
                      <PlusIcon
                        width={normalize(18)}
                        height={normalize(18)}
                        stroke={theme.colors.text_default}
                        fill={theme.colors.text_default}
                      />
                    </AddSubtractButtonWrapper>
                  </Box>
                )}
              </Box>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </GradientBox>

      <CardModal ref={cardModalRef} card={selectedCard} />
    </Box>
  );
}
