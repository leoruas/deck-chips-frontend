import React, { useState } from 'react';
import { FlatGrid } from 'react-native-super-grid';
import { Box } from '../layout/Box';
import GradientBox from '../layout/GradientBox';
import Text from '../Text';
import DeleteIcon from '@assets/icons/close.svg';
import { Deck, DeleteIconWrapper } from './styles';
import { theme } from '@app/theme';
import { normalize } from '@shared/helpers/normalize-pixels';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { IDeckType } from '@shared/types/cards.types';
import { useDeck } from '@shared/contexts/DeckContext';
import { useTranslation } from 'react-i18next';
import { deleteDeck } from '@app/api/services/decks/delete-deck.service';

type DeckListProps = {
  decks: IDeckType[];
  isLoading: boolean;
  communityView?: boolean;
  refetch?: () => void;
};

export default function DecksList({ decks, isLoading, communityView, refetch }: DeckListProps) {
  const navigation = useNavigation();
  const { setDeck } = useDeck();
  const { t } = useTranslation('shared');

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
        {decks.length === 0 && !isLoading && (
          <Box flex={1} justifyContent="center" alignItems="center">
            <Text>{t('no_decks')}</Text>
          </Box>
        )}
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
                <Box my="sm" flex={1}>
                  {!communityView && (
                    <DeleteIconWrapper
                      onPress={async () => {
                        await deleteDeck(item._id);
                        refetch?.();
                      }}>
                      <DeleteIcon width={normalize(40)} height={normalize(40)} fill={'#b51b10'} />
                    </DeleteIconWrapper>
                  )}
                  <RenderDeck uri={item.coverUrl} />
                  <Text mt="md" flexShrink={1} numberOfLines={1} textAlign="center" variant="title">
                    {item.title}
                  </Text>
                  {communityView && (
                    //TODO: implement deck owner username
                    <Text
                      mt="sm"
                      textAlign="center"
                      flexShrink={1}
                      numberOfLines={1}
                      fontSize={normalize(24)}>
                      {item.userName ? `by ${item.userName}` : 'No Owner'}
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
