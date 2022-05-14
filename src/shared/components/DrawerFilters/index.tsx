import React from 'react';
import Text from '@shared/components/Text';
import GradientBox from '@shared/components/layout/GradientBox';

export default function DrawerFilters() {
  return (
    <GradientBox flex={1} py="lg" px="md">
      <Text>Fitlers</Text>
    </GradientBox>
  );
}
