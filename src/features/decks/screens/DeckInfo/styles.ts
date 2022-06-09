import { Box } from '@shared/components/layout/Box';
import { getPixelValue } from '@shared/helpers/normalize-pixels';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import EssenceImg from '@assets/images/essence.png';

export const CounterWrapper = styled(Box)`
  height: ${getPixelValue(30)};
  width: ${getPixelValue(30)};
  align-items: center;
  justify-content: center;
  z-index: 10;

  position: absolute;
  bottom: ${getPixelValue(-15)};
  right: ${getPixelValue(-15)};

  border-radius: ${getPixelValue(100)};
  border-width: ${getPixelValue(2)};
  border-color: ${({ theme }) => theme.colors.text_default + theme.colors.opacity75};
  background-color: ${({ theme }) => theme.colors.textfield_default};
`;

export const EssenceImage = styled(FastImage).attrs({
  resizeMode: 'contain',
  source: EssenceImg,
})`
  width: ${getPixelValue(60)};
  height: ${getPixelValue(60)};
  align-self: center;
`;
