import DeckImage from '@assets/images/deck.png';
import { getPixelValue } from '@shared/helpers/normalize-pixels';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

const WIDTH = Dimensions.get('window').width;
export const Deck = styled(FastImage).attrs({
  resizeMode: 'cover',
})`
  width: ${WIDTH * 0.4}px;
  height: ${getPixelValue(260)};
  align-self: center;

  border-width: ${getPixelValue(4)};
  border-radius: ${getPixelValue(10)};
  border-color: ${({ theme }) => theme.colors.text_default + theme.colors.opacity75};
`;

export const StarIconWrapper = styled.TouchableOpacity`
  position: absolute;
  z-index: 10;
  right: ${getPixelValue(15)};
  top: ${getPixelValue(10)};
`;
