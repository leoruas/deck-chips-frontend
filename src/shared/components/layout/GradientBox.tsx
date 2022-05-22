import React from 'react';
import { Box } from './Box';
import { BoxProps } from '@shopify/restyle';
import { theme, Theme } from '@app/theme';
import LinearGradient from 'react-native-linear-gradient';

export type GradientBoxProps = {
  children: React.ReactNode;
} & BoxProps<Theme>;

export default function GradientBox({ children, ...props }: GradientBoxProps) {
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[theme.colors.bg_gradient_from, theme.colors.bg_gradient_to]}>
      <Box flex={1} bg="bg_primary" {...props}>
        {children}
      </Box>
    </LinearGradient>
  );
}
