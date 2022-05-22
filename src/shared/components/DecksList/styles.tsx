import DeckImage from '@assets/images/deck.png';
import { getPixelValue } from '@shared/helpers/normalize-pixels';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

export const Deck = styled(FastImage).attrs({
  resizeMode: 'contain',
  source: DeckImage,
})`
  width: ${getPixelValue(260)};
  height: ${getPixelValue(260)};
  align-self: center;
`;

export const StarIconWrapper = styled.TouchableOpacity`
  position: absolute;
  z-index: 10;
  right: ${getPixelValue(25)};
  top: ${getPixelValue(30)};
`;
