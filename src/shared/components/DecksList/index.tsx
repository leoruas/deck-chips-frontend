import React, { useState } from 'react';
import { FlatGrid } from 'react-native-super-grid';
import { Box } from '../layout/Box';
import GradientBox from '../layout/GradientBox';
import Text from '../Text';
import StarIcon from '@assets/icons/star.svg';
import { Deck, StarIconWrapper } from './styles';
import { theme } from '@app/theme';
import { normalize } from '@shared/helpers/normalize-pixels';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const getDecks = (decksAmount = 5) =>
  Array.from({ length: decksAmount }, (_, i) => {
    return {
      id: i,
      isFavorite: true,
    };
  });

export default function DecksList() {
  const navigation = useNavigation();
  const [decks, setDecks] = useState(getDecks());

  return (
    <Box flex={1}>
      <GradientBox>
        <FlatGrid
          data={decks}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EditDeck');
                }}>
                <Box my="sm">
                  <StarIconWrapper
                    onPress={() => {
                      if (item.isFavorite) {
                        setDecks(prev => {
                          return prev.filter((_, i) => i !== index);
                        });
                        decks.splice(index, 1);
                      }
                    }}>
                    <StarIcon
                      width={normalize(40)}
                      height={normalize(40)}
                      stroke={theme.colors.dark_grey}
                      fill={item.isFavorite ? theme.colors.favorite : theme.colors.light_grey}
                    />
                  </StarIconWrapper>
                  <Deck />
                  <Text textAlign="center">DECK {item.id + 1}</Text>
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
