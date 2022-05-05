import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
// @ts-ignore
import Logo from '@assets/images/temporary-logo.png';
// @ts-ignore
import GoogleLogo from '@assets/images/google-logo.png';
// @ts-ignore
import FacebookLogo from '@assets/images/facebook-logo.png';
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

export const ImageWrapper = styled.TouchableOpacity`
  border-width: ${getPixelValue(2)};
  border-radius: ${getPixelValue(10)};
  border-color: ${({ theme }) => theme.colors.text_default + theme.colors.opacity75};
  background-color: ${({ theme }) => theme.colors.textfield_default};
  padding: ${getPixelValue(10, 20)};
`;

export const GoogleLogoImage = styled(FastImage).attrs({
  resizeMode: 'contain',
  source: GoogleLogo,
})`
  width: ${getPixelValue(50)};
  height: ${getPixelValue(50)};

  align-self: center;
`;

export const FacebookLogoImage = styled(FastImage).attrs({
  resizeMode: 'contain',
  source: FacebookLogo,
})`
  width: ${getPixelValue(50)};
  height: ${getPixelValue(50)};
  align-self: center;
`;
