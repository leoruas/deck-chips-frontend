import { theme } from '@app/theme';
import { Box } from '@shared/components/layout/Box';
import { SafeAreaBox } from '@shared/components/layout/SafeAreaBox';
import Spacer from '@shared/components/layout/Spacer';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import DecksList from '@shared/components/DecksList';
import AppBar from '@shared/components/AppBar';
import { useTranslation } from 'react-i18next';
import { getDecks } from '@app/api/services/decks/get-decks.service';
import { IDeckType } from '@shared/types/cards.types';

export default function CommunityDecks() {
  const { t } = useTranslation('community');
  const [decks, setDecks] = useState<IDeckType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDecks = async () => {
    setIsLoading(true);
    const decks = await getDecks({});

    setDecks(decks);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  return (
    <SafeAreaBox flex={1} bg="bg_primary">
      <StatusBar backgroundColor={theme.colors.bg_primary} />

      <Box flex={1} px="md">
        <AppBar title={t('title')} />

        <Spacer height={12} />

        <DecksList decks={decks} isLoading={isLoading} communityView />
      </Box>
    </SafeAreaBox>
  );
}
