import { getPixelValue } from '@shared/helpers/normalize-pixels';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

export const CostCircle = styled(LinearGradient)`
  margin: ${getPixelValue(6)};
  align-items: center;
  justify-content: center;

  width: ${getPixelValue(45)};
  height: ${getPixelValue(45)};

  border-radius: ${getPixelValue(100)};
`;

export const SetImage = styled(FastImage).attrs({
  resizeMode: 'contain',
})`
  width: ${getPixelValue(50)};
  height: ${getPixelValue(50)};
`;
