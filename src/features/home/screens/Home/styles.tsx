import CardImage from '@assets/images/card.png';
import { getPixelValue } from '@shared/helpers/normalize-pixels';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

export const Card = styled(FastImage).attrs({
  resizeMode: 'contain',
  source: CardImage,
})`
  width: ${getPixelValue(280)};
  height: ${getPixelValue(280)};
  align-self: center;
`;
