import { theme } from '@app/theme';
import { Box } from '@shared/components/layout/Box';
import { SafeAreaBox } from '@shared/components/layout/SafeAreaBox';
import Spacer from '@shared/components/layout/Spacer';
import React from 'react';
import { StatusBar } from 'react-native';
import DecksList from '@shared/components/DecksList';
import AppBar from '@shared/components/AppBar';
import { useTranslation } from 'react-i18next';

export default function CommunityDecks() {
  const { t } = useTranslation('community');
  return (
    <SafeAreaBox flex={1} bg="bg_primary">
      <StatusBar backgroundColor={theme.colors.bg_primary} />

      <Box flex={1} px="md">
        <AppBar title={t('title')} />

        <Spacer height={12} />

        <DecksList communityView />
      </Box>
    </SafeAreaBox>
  );
}
