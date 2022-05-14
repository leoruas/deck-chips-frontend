import React from 'react';
import { Box } from '@shared/components/layout/Box';
import Text from '@shared/components/Text';
import Divider from '@shared/components/layout/Divider';

export default function HomeDrawerComponent() {
  return (
    <Box flex={1} bg="bg_secondary" py="lg" px="md">
      <Text>Drawer</Text>
      <Divider my="md" />
    </Box>
  );
}
