import React from 'react';
import { Box } from './Box';
import { BoxProps } from '@shopify/restyle';
import { theme, Theme } from '@app/theme';
import { normalize } from '@shared/helpers/normalize-pixels';

export type GradientBoxProps = {} & BoxProps<Theme>;

export default function Divider({ ...props }: GradientBoxProps) {
  return (
    <Box
      height={normalize(1)}
      width={'100%'}
      style={{ backgroundColor: theme.colors.text_default }}
      {...props}
    />
  );
}
