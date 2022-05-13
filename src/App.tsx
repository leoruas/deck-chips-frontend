import React, { useEffect } from 'react';
import { ThemeProvider as RestyleThemeProvider } from '@shopify/restyle';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';

import { theme } from './theme';
import Routes from './routes';
import { AuthProvider } from '@shared/contexts/AuthContext';

const App = () => {
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <RestyleThemeProvider theme={theme}>
          <StyledThemeProvider theme={theme}>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </StyledThemeProvider>
        </RestyleThemeProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default gestureHandlerRootHOC(App);
