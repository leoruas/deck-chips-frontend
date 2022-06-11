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
import { FilterProvider } from '@shared/contexts/FilterContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { DeckProvider } from '@shared/contexts/DeckContext';
import { LogBox } from 'react-native';

const App = () => {
  useEffect(() => {
    Orientation.lockToPortrait();
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <RestyleThemeProvider theme={theme}>
          <StyledThemeProvider theme={theme}>
            <AuthProvider>
              <FilterProvider>
                <DeckProvider>
                  <BottomSheetModalProvider>
                    <Routes />
                  </BottomSheetModalProvider>
                </DeckProvider>
              </FilterProvider>
            </AuthProvider>
          </StyledThemeProvider>
        </RestyleThemeProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default gestureHandlerRootHOC(App);
