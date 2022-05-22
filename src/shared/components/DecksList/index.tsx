import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FlatGrid } from 'react-native-super-grid';
import { Box } from '../layout/Box';
import GradientBox from '../layout/GradientBox';
import Text from '../Text';
import StarIcon from '@assets/icons/star.svg';
import { Deck, StarIconWrapper } from './styles';
import { theme } from '@app/theme';
import { normalize } from '@shared/helpers/normalize-pixels';

const getDecks = (decksAmount = 5) => Array.from({ length: decksAmount }, (_, i) => i);

export default function DecksList() {
  const [decks, setDecks] = useState(getDecks());

  return (
    <Box flex={1}>
      <GradientBox>
        <FlatGrid
          data={decks}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity>
                <Box my="sm">
                  <StarIconWrapper
                    onPress={() => {
                      setDecks(prev => {
                        return prev.filter((_, i) => i !== index);
                      });
                      decks.splice(index, 1);
                      console.log('here', decks);
                    }}>
                    <StarIcon
                      width={normalize(40)}
                      height={normalize(40)}
                      stroke={theme.colors.black}
                      fill={theme.colors.favorite}
                    />
                  </StarIconWrapper>
                  <Deck />
                  <Text textAlign="center">NOME DECK {item + 1}</Text>
                </Box>
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </GradientBox>
    </Box>
  );
}
