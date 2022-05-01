import React from 'react';
import { View } from 'react-native';

type SpacerProps = {
  width?: number;
  height?: number;
};

const Spacer = ({ width = 0, height = 0 }: SpacerProps) => {
  return <View style={{ width, height }} />;
};

export default Spacer;
