import { Dimensions, PixelRatio } from 'react-native';

const d = Dimensions.get('window');

const scaledWidth = d.width / 428;

export function normalize(size: number): number {
  return PixelRatio.roundToNearestPixel(size * scaledWidth);
}

export const getPixelValue = (...values: number[]): string => {
  const finalValue = values.reduce((p, c) => {
    if (!isNaN(c)) return `${p} ${normalize(c)}px`;
    return '';
  }, '');

  return finalValue;
};
