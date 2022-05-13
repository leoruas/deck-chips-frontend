import { getPixelValue } from '@shared/helpers/normalize-pixels';
import styled from 'styled-components/native';

export const TextInputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: ${getPixelValue(2)};
  border-radius: ${getPixelValue(10)};
  border-color: ${({ theme }) => theme.colors.text_default + theme.colors.opacity75};
  padding: ${getPixelValue(0, 12)};
  background-color: ${({ theme }) => theme.colors.textfield_default};
`;
