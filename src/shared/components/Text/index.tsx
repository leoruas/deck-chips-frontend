import { createText } from '@shopify/restyle';
import styled from 'styled-components/native';
import { flexbox, FlexboxProps } from 'styled-system';
import { Theme } from '@app/theme';

const TextRestyle = createText<Theme>();

const Text = styled(TextRestyle)<FlexboxProps>`
  ${flexbox}
`;

export default Text;
