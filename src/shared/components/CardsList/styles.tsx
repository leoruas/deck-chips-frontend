import CardImage from '@assets/images/card.png';
import { getPixelValue } from '@shared/helpers/normalize-pixels';
import FastImage from 'react-native-fast-image';
import EmptyCardSlotImage from '@assets/images/empty-card-slot.png';
import FilledCardSlotImage from '@assets/images/filled-card-slot.png';
import styled from 'styled-components/native';

export const Card = styled(FastImage).attrs({
  resizeMode: 'contain',
})`
  width: ${getPixelValue(280)};
  height: ${getPixelValue(280)};
  align-self: center;
`;

export const AddSubtractButtonWrapper = styled.TouchableOpacity`
  height: ${getPixelValue(25)};
  width: ${getPixelValue(25)};
  align-items: center;
  justify-content: center;

  border-radius: ${getPixelValue(100)};
  border-width: ${getPixelValue(1)};
  border-color: ${({ theme }) => theme.colors.text_default + theme.colors.opacity75};
  padding: ${getPixelValue(0, 6)};
  background-color: ${({ theme }) => theme.colors.textfield_default};
  margin: ${getPixelValue(0, 6)};
`;

export const EmptyCardSlot = styled(FastImage).attrs({
  resizeMode: 'contain',
  source: EmptyCardSlotImage,
})`
  width: ${getPixelValue(20)};
  height: ${getPixelValue(20)};
  margin: ${getPixelValue(0, 2)};
`;

export const FilledCardSlot = styled(FastImage).attrs({
  resizeMode: 'contain',
  source: FilledCardSlotImage,
})`
  width: ${getPixelValue(20)};
  height: ${getPixelValue(20)};
  margin: ${getPixelValue(0, 2)};
`;
