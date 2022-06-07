import { Box } from '@shared/components/layout/Box';
import { getPixelValue } from '@shared/helpers/normalize-pixels';
import styled from 'styled-components/native';

export const BottomBarWrapper = styled(Box)`
  position: absolute;
  bottom: ${getPixelValue(30)};
  align-self: center;
  flex-direction: row;
  align-items: center;
`;

export const BottomBarTextButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})`
  margin: ${getPixelValue(0, -20)};
  padding: ${getPixelValue(10, 25)};
  width: ${getPixelValue(130)};
  background-color: ${({ theme }) => theme.colors.textfield_default};
  align-items: center;
  border-radius: ${getPixelValue(10)};
  border-width: ${getPixelValue(2)};
  border-color: ${({ theme }) => theme.colors.text_default + theme.colors.opacity75};
`;

export const SaveButtonWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  height: ${getPixelValue(95)};
  width: ${getPixelValue(95)};
  align-items: center;
  justify-content: center;
  z-index: 10;

  border-radius: ${getPixelValue(100)};
  border-width: ${getPixelValue(2)};
  border-color: ${({ theme }) => theme.colors.text_default + theme.colors.opacity75};
  padding: ${getPixelValue(0, 12)};
  background-color: ${({ theme }) => theme.colors.textfield_default};
`;
