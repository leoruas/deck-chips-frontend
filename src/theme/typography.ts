import { normalize } from '@shared/helpers/normalize-pixels';

export const typography = {
  defaults: {
    fontSize: normalize(25),
    color: 'text_default',
    fontFamily: 'Univers-Condensed',
    letterSpacing: normalize(1.5),
  },
  button_label: {
    fontSize: normalize(34),
    color: 'text_default',
    fontFamily: 'Univers-Condensed',
    letterSpacing: normalize(1.5),
  },
  title: {
    fontSize: normalize(32),
    color: 'text_default',
    fontFamily: 'Univers-Condensed',
    letterSpacing: normalize(1.5),
  },
};
