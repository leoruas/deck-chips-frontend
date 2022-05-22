import { Box } from '@shared/components/layout/Box';
import { getPixelValue } from '@shared/helpers/normalize-pixels';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

export const ModalWrapper = styled(Box)`
  background: ${({ theme }) => theme.colors.bg_primary};
  border-top-left-radius: ${getPixelValue(48)};
  border-top-right-radius: ${getPixelValue(48)};
  position: absolute;
  bottom: 0;
  width: 100%;
  flex: 1;
  max-height: ${getPixelValue(550)};
`;

export const Card = styled(FastImage).attrs({
  resizeMode: 'contain',
})<{ width: number; height: number }>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
`;
