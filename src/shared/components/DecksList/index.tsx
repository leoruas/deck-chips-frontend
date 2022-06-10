import React, { useEffect, useState } from 'react';
import { FlatGrid } from 'react-native-super-grid';
import { Box } from '../layout/Box';
import GradientBox from '../layout/GradientBox';
import Text from '../Text';
import StarIcon from '@assets/icons/star.svg';
import { Deck, StarIconWrapper } from './styles';
import { theme } from '@app/theme';
import { normalize } from '@shared/helpers/normalize-pixels';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { IDeckType } from '@shared/types/cards.types';
import { getDecks } from '@app/api/services/decks/get-decks.service';

export default function DecksList() {
  const navigation = useNavigation();
  const [decks, setDecks] = useState<IDeckType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDecks = async () => {
    setIsLoading(true);
    const decks = await getDecks();

    setDecks(decks);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator color={theme.colors.text_default} size="large" />
      </Box>
    );
  }

  return (
    <Box flex={1}>
      <GradientBox>
        <FlatGrid
          data={decks}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate('EditDeck');
                }}>
                <Box my="sm">
                  <StarIconWrapper
                    onPress={() => {
                      // if (item.isFavorite) {
                      //   setDecks(prev => {
                      //     return prev.filter((_, i) => i !== index);
                      //   });
                      //   decks.splice(index, 1);
                      // }
                    }}>
                    <StarIcon
                      width={normalize(40)}
                      height={normalize(40)}
                      stroke={theme.colors.dark_grey}
                      fill={false ? theme.colors.favorite : theme.colors.light_grey}
                    />
                  </StarIconWrapper>
                  <Deck source={{ uri: item.coverUrl }} />
                  <Text textAlign="center">{item.title}</Text>
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
