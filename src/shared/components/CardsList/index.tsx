import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ICardType } from '@shared/types/cards.types';
import React, { useRef, useState } from 'react';
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

const getCards = (cardsAmount = 20) =>
  Array.from({ length: cardsAmount }, (_, i) => {
    const card: ICardType = {
      id: 'Card #1',
      imageUrl:
        'https://cdn-lor.mobalytics.gg/production/images/set1/pt_br/img/card/game/01SI047.png',
      relatedCards: [
        {
          id: 'Card #2',
          imageUrl:
            'https://cdn-lor.mobalytics.gg/production/images/set1/pt_br/img/card/game/01SI047.png',
          regions: ['shadow_isles'],
          type: 'spell',
          rarity: 'common',
          keyowrds: [],
          description: `Card #${i + 2}`,
          isFavorite: (i + 1) % 2 === 0,
        },
        {
          id: 'Card #3',
          imageUrl:
            'https://cdn-lor.mobalytics.gg/production/images/set1/pt_br/img/card/game/01SI047.png',
          regions: ['shadow_isles'],
          type: 'spell',
          rarity: 'common',
          keyowrds: [],
          description: `Card #${i + 2}`,
          isFavorite: (i + 1) % 2 === 0,
        },
      ],
      regions: ['shadow_isles'],
      type: 'spell',
      rarity: 'common',
      keyowrds: [],
      description: `Card #${
        i + 1
      }, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dolor est, porttitor et velit at, blandit suscipit est. Aenean pulvinar tincidunt aliquet.`,
      isFavorite: i % 2 === 0,
    };

    return card;
  });

type CardsListProps = {
  showCardAmount?: boolean;
};

export default function CardsList({ showCardAmount }: CardsListProps) {
  const [selectedCard, setSelectedCard] = useState<ICardType | undefined>(undefined);
  const cardModalRef = useRef<BottomSheetModal>(null);

  return (
    <Box flex={1}>
      <GradientBox>
        <FlatGrid
          data={getCards()}
          renderItem={({ item, index }) => {
            return (
              <Box>
                <TouchableOpacity
                  key={`home-cards-list-${index}`}
                  onPress={() => {
                    setSelectedCard(item);
                    cardModalRef.current?.present();
                  }}>
                  <Card />
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
