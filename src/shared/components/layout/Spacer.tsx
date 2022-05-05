import { normalize } from '@shared/helpers/normalize-pixels';
import React from 'react';
import { View } from 'react-native';

type SpacerProps = {
  width?: number;
  height?: number;
};

const Spacer = ({ width = 0, height = 0 }: SpacerProps) => {
  return <View style={{ width: normalize(width), height: normalize(height) }} />;
};

export default Spacer;
