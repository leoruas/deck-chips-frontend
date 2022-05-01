import { createTheme, useTheme as useRestyleTheme } from '@shopify/restyle';
import { typography } from './typography';
import { colors } from './colors';

export const theme = createTheme({
  colors,
  spacing: {
    none: 0,
    xsmall: '4%',
    small: '8%',
    medium: '16%',
    large: '24%',
    xlarge: '40%',

    xsm: '4%',
    sm: '8%',
    md: '16%',
    lg: '24%',
    xlg: '40%',
  },
  breakpoints: {
    smallPhone: 0,
    phone: 375,
  },
  borderRadii: {},
  textVariants: typography,
});

export type Theme = typeof theme;
export type ColorVariant = keyof Theme['colors'];
export const useTheme = () => useRestyleTheme<Theme>();
