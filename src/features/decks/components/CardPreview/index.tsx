import { theme } from '@app/theme';
import { Box } from '@shared/components/layout/Box';
import Text from '@shared/components/Text';
import { normalize } from '@shared/helpers/normalize-pixels';
import { IGetCardResponse } from '@shared/types/cards.types';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CardImage, CircleButtonWrapper, ManaCostGemImage } from './styles';

type CardPreviewProps = {
  card: IGetCardResponse;
  amount: number;
};

export default function CardPreview({ card, amount }: CardPreviewProps) {
  const color = theme.colors[card.regionRef[0]];
  const [imageLoading, setImageLoading] = React.useState(true);

  return (
    <Box flexDirection="row" alignItems="center" my="sm">
      <Box flex={1}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            position: 'absolute',
            zIndex: 10,
            width: '70%',
            height: '100%',
            borderRadius: normalize(8),
          }}
          colors={[color, `${color}${theme.colors.opacity75}`, `transparent`]}
        />
        <Box
          alignItems="center"
          flexDirection="row"
          style={{
            position: 'absolute',
            zIndex: 10,
            flex: 1,
            width: '50%',
            height: '100%',
          }}>
          <Box>
            <Box
              justifyContent="center"
              alignItems="center"
              style={{
                position: 'absolute',
                zIndex: 20,
                height: normalize(40),
                width: '100%',
              }}>
              <Text color="white">{card.cost}</Text>
            </Box>
            <ManaCostGemImage />
          </Box>
          <Text color="white" ml="md" numberOfLines={1}>
            {card.name}
          </Text>
        </Box>
        <CardImage
          source={{ uri: card.assets[0].fullAbsolutePath }}
          onLoadEnd={() => setImageLoading(false)}>
          <Box
            bg="bg_primary"
            style={{
              position: 'absolute',
              zIndex: 20,
              right: normalize(10),
              padding: normalize(8),
              top: normalize(8),
              borderRadius: normalize(5),
            }}>
            <Text color="white">{amount}</Text>
          </Box>
          {imageLoading && (
            <Box flex={1} justifyContent="center">
              <ActivityIndicator size="large" color="white" />
            </Box>
          )}
        </CardImage>
      </Box>
    </Box>
  );
}
