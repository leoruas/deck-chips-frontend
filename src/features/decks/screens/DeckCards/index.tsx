import { theme } from '@app/theme';
import CardPreview from '@features/decks/components/CardPreview';
import DeckAppBar from '@features/decks/components/DeckAppBar';
import { Box } from '@shared/components/layout/Box';
import Divider from '@shared/components/layout/Divider';
import { SafeAreaBox } from '@shared/components/layout/SafeAreaBox';
import Text from '@shared/components/Text';
import { getTypeInfo } from '@shared/helpers/get-filter-info';
import { normalize } from '@shared/helpers/normalize-pixels';
import { CardType } from '@shared/types/filters.types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StatusBar, ScrollView } from 'react-native';

export default function DeckCards() {
  return (
    <SafeAreaBox flex={1} bg="bg_primary">
      <StatusBar backgroundColor={theme.colors.bg_primary} />

      <Box flex={1} px="md">
        <ScrollView showsVerticalScrollIndicator={false}>
          <DeckAppBar title={'Deck Name'} />
          <Divider my="md" />

          <RenderType type="Champion" />
          <RenderType type="Spell" />
          <RenderType type="Unit" />
          <RenderType type="Landmark" />
        </ScrollView>
      </Box>
    </SafeAreaBox>
  );
}

const FlexDivider = () => {
  return (
    <Box height={normalize(1)} flex={1} style={{ backgroundColor: theme.colors.text_default }} />
  );
};

type RenderTypeProps = {
  type: CardType;
};
const RenderType = ({ type }: RenderTypeProps) => {
  const { t } = useTranslation('shared');
  const cardType = getTypeInfo(type, t);
  const CardTypeIcon = cardType.icon;

  return (
    <Box my="md">
      <Box flexDirection="row" alignItems="center" my="md">
        <FlexDivider />
        <Box mx="lg" flexDirection="row">
          <CardTypeIcon width={normalize(50)} height={normalize(50)} fill={cardType.color} />
          <Text variant="title2" ml="md">
            {cardType.label}
          </Text>
        </Box>
        <FlexDivider />
      </Box>
      <CardPreview />
      <CardPreview />
    </Box>
  );
};
