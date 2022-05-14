import React from 'react';
import { Box } from './Box';
import { BoxProps } from '@shopify/restyle';
import { theme, Theme } from '@app/theme';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions } from 'react-native';

export type GradientBoxProps = {
  children: React.ReactNode;
} & BoxProps<Theme>;

export default function GradientBox({ children, ...props }: GradientBoxProps) {
  const { height } = Dimensions.get('window');

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[theme.colors.bg_gradient_from, theme.colors.bg_gradient_to]}>
      <Box flex={1} bg="bg_primary" px="md" pt="lg" minHeight={height} {...props}>
        {children}
      </Box>
    </LinearGradient>
  );
}
