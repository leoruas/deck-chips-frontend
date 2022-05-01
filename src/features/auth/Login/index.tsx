import { Box } from '@shared/components/layout/Box';
import { SafeAreaBox } from '@shared/components/layout/SafeAreaBox';
import Text from '@shared/components/Text';
import React from 'react';
import { StatusBar } from 'react-native';

export default function LoginScreen() {
  return (
    <SafeAreaBox flex={1} justifyContent="center">
      <StatusBar translucent backgroundColor={'transparent'} />
      <Box>
        <Text adjustsFontSizeToFit textAlign="center" fontSize={20}>
          Tela de Login
        </Text>
      </Box>
    </SafeAreaBox>
  );
}
