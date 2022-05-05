import { createTheme, useTheme as useRestyleTheme } from '@shopify/restyle';
import { typography } from './typography';
import { colors } from './colors';
import { normalize } from '@shared/helpers/normalize-pixels';

export const theme = createTheme({
  colors,
  spacing: {
    none: 0,
    small: normalize(6),
    medium: normalize(12),
    large: normalize(24),
    xlarge: normalize(36),

    sm: normalize(6),
    md: normalize(12),
    lg: normalize(24),
    xlg: normalize(36),
  },
  breakpoints: {
    smallPhone: 0,
    phone: 428,
  },
  textVariants: typography,
});

export type Theme = typeof theme;
export type ColorVariant = keyof Theme['colors'];
export const useTheme = () => useRestyleTheme<Theme>();
