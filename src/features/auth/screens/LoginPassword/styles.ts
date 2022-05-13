import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import Logo from '@assets/images/chip-logo.png';
import { getPixelValue } from '@shared/helpers/normalize-pixels';

export const LogoImage = styled(FastImage).attrs({
  resizeMode: 'contain',
  source: Logo,
})`
  width: ${getPixelValue(260)};
  height: ${getPixelValue(260)};
  align-self: center;
`;

export const LoginButton = styled.TouchableOpacity`
  border-width: ${getPixelValue(2)};
  border-radius: ${getPixelValue(10)};
  border-color: ${({ theme }) => theme.colors.text_default + theme.colors.opacity75};
  padding: ${getPixelValue(8, 12)};
  background-color: ${({ theme }) => theme.colors.textfield_default};
  align-items: center;
`;
