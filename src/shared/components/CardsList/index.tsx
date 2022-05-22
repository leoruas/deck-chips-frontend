import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ICardType } from '@shared/types/cards.types';
import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import CardModal from '../CardModal';
import { Box } from '../layout/Box';
import GradientBox from '../layout/GradientBox';
import { Card } from './styles';

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

export default function CardsList() {
  const [selectedCard, setSelectedCard] = useState<ICardType | undefined>(undefined);
  const cardModalRef = useRef<BottomSheetModal>(null);

  return (
    <Box flex={1}>
      <GradientBox>
        <FlatGrid
          data={getCards()}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={`home-cards-list-${index}`}
                onPress={() => {
                  setSelectedCard(item);
                  cardModalRef.current?.present();
                }}>
                <Card />
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </GradientBox>

      <CardModal ref={cardModalRef} card={selectedCard} />
    </Box>
  );
}
