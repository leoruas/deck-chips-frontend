import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { IGetCardResponse } from '@shared/types/cards.types';
import React, { useRef, useState } from 'react';
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

type CardsListProps = {
  cards: IGetCardResponse[];
  onEndReached: () => void;
  isLoading: boolean;
  showCardAmount?: boolean;
};

export default function CardsList({
  cards,
  onEndReached,
  isLoading,
  showCardAmount,
}: CardsListProps) {
  const [selectedCard, setSelectedCard] = useState<IGetCardResponse | undefined>(undefined);
  const cardModalRef = useRef<BottomSheetModal>(null);

  return (
    <Box flex={1}>
      <GradientBox>
        <FlatGrid
          data={cards}
          onEndReached={onEndReached}
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
