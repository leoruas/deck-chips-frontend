import React from 'react';
import { theme } from '@app/theme';
import { normalize } from '@shared/helpers/normalize-pixels';
import { ActivityIndicator, StatusBar, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { Box } from '../layout/Box';

export default function Loader({ showLoader = false }: { showLoader: boolean }) {
  return (
    <>
      {showLoader && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: `${theme.colors.black + theme.colors.opacity75}`,
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
            },
          ]}>
          <Box
            style={{
              borderRadius: normalize(24),
              width: normalize(140),
              height: normalize(140),
            }}
            alignItems="center"
            justifyContent="center"
            bg="bg_secondary">
            <StatusBar translucent backgroundColor={'transparent'} />
            <ActivityIndicator color={theme.colors.text_default} size={normalize(50)} />
          </Box>
        </Animated.View>
      )}
    </>
  );
}
