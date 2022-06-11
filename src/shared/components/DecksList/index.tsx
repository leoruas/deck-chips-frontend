import React, { useEffect, useState } from 'react';
import { FlatGrid } from 'react-native-super-grid';
import { Box } from '../layout/Box';
import GradientBox from '../layout/GradientBox';
import Text from '../Text';
import StarIcon from '@assets/icons/star.svg';
import { Deck, StarIconWrapper } from './styles';
import { theme } from '@app/theme';
import { normalize } from '@shared/helpers/normalize-pixels';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { IDeckType } from '@shared/types/cards.types';
import { getDecks } from '@app/api/services/decks/get-decks.service';
import { useDeck } from '@shared/contexts/DeckContext';

type DeckListProps = {
  decks: IDeckType[];
  isLoading: boolean;
  communityView?: boolean;
};

export default function DecksList({ decks, isLoading, communityView }: DeckListProps) {
  const navigation = useNavigation();
  const { setDeck } = useDeck();

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
                  setDeck(item);
                  navigation.navigate('EditDeck', {
                    disableEdit: communityView ? true : false,
                  });
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
                  <RenderDeck uri={item.coverUrl} />
                  <Text mt="md" textAlign="center" variant="title">
                    {item.title}
                  </Text>
                  {communityView && (
                    //TODO: implement deck owner username
                    <Text mt="sm" textAlign="center">
                      by username
                    </Text>
                  )}
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

type RenderDeckProps = {
  uri?: string;
};
const RenderDeck = ({ uri }: RenderDeckProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Deck source={{ uri }} onLoadEnd={() => setIsLoading(false)}>
      {isLoading && (
        <Box flex={1} justifyContent="center">
          <ActivityIndicator size="large" color="white" />
        </Box>
      )}
    </Deck>
  );
};
