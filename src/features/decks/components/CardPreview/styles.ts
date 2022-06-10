import { getPixelValue } from '@shared/helpers/normalize-pixels';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import ManaCostGemImg from '@assets/images/mana-cost-gem.png';

const WIDTH = Dimensions.get('window').width;
export const CardImage = styled(FastImage).attrs({
  resizeMode: 'cover',
})`
  width: ${WIDTH * 0.75}px;
  height: ${getPixelValue(60)};
  align-self: center;
  border-radius: ${getPixelValue(8)};
`;

export const ManaCostGemImage = styled(FastImage).attrs({
  resizeMode: 'contain',
  source: ManaCostGemImg,
})`
  width: ${getPixelValue(40)};
  height: ${getPixelValue(40)};
`;

export const CircleButtonWrapper = styled.TouchableOpacity`
  height: ${getPixelValue(35)};
  width: ${getPixelValue(35)};
  align-items: center;
  justify-content: center;

  border-radius: ${getPixelValue(100)};
  border-width: ${getPixelValue(1)};
  border-color: ${({ theme }) => theme.colors.text_default + theme.colors.opacity75};
  padding: ${getPixelValue(0, 6)};
  background-color: ${({ theme }) => theme.colors.textfield_default};
`;
