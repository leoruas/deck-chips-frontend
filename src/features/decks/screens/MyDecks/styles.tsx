import { getPixelValue } from '@shared/helpers/normalize-pixels';
import styled from 'styled-components/native';

export const BottomButton = styled.TouchableOpacity`
  height: ${getPixelValue(65)};
  width: ${getPixelValue(65)};
  position: absolute;
  z-index: 10;
  right: ${getPixelValue(25)};
  bottom: ${getPixelValue(30)};
  align-items: center;
  justify-content: center;

  border-radius: ${getPixelValue(100)};
  border-width: ${getPixelValue(2)};
  border-color: ${({ theme }) => theme.colors.text_default + theme.colors.opacity75};
  padding: ${getPixelValue(0, 12)};
  background-color: ${({ theme }) => theme.colors.textfield_default};
`;
