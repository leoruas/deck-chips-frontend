import { createTheme, useTheme as useRestyleTheme } from '@shopify/restyle';
import { typography } from './typography';
import { colors } from './colors';

export const theme = createTheme({
  colors,
  spacing: {
    none: 0,
    xsmall: '1%',
    small: '2%',
    medium: '4%',
    large: '10%',
    xlarge: '15%',

    xsm: '1%',
    sm: '2%',
    md: '4%',
    lg: '10%',
    xlg: '15%',
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
