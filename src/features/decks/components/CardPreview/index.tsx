import { theme } from '@app/theme';
import { Box } from '@shared/components/layout/Box';
import Text from '@shared/components/Text';
import { normalize } from '@shared/helpers/normalize-pixels';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { CardImage, CircleButtonWrapper, ManaCostGemImage } from './styles';

export default function CardPreview() {
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
          colors={[
            theme.colors.PiltoverZaun,
            `${theme.colors.PiltoverZaun}${theme.colors.opacity75}`,
            `transparent`,
          ]}
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
              <Text color="white">1</Text>
            </Box>
            <ManaCostGemImage />
          </Box>
          <Text color="white" ml="md" numberOfLines={1}>
            Daring Poro
          </Text>
        </Box>
        <CardImage
          source={{ uri: 'https://dd.b.pvp.net/3_4_0/set1/en_us/img/cards/01PZ020-full.png' }}>
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
            <Text color="white">3</Text>
          </Box>
        </CardImage>
      </Box>
      <CircleButtonWrapper>
        <Text>-1</Text>
      </CircleButtonWrapper>
    </Box>
  );
}
