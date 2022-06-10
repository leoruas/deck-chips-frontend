import { getCardByCode } from '@app/api/services/cards/get-card-by-code.service';
import { DefaultStackParamList } from '@app/routes/Default.routes';
import { theme } from '@app/theme';
import CardPreview from '@features/decks/components/CardPreview';
import DeckAppBar from '@features/decks/components/DeckAppBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box } from '@shared/components/layout/Box';
import Divider from '@shared/components/layout/Divider';
import { SafeAreaBox } from '@shared/components/layout/SafeAreaBox';
import Text from '@shared/components/Text';
import { getTypeInfo } from '@shared/helpers/get-filter-info';
import { normalize } from '@shared/helpers/normalize-pixels';
import { IGetCardResponse } from '@shared/types/cards.types';
import { CardType } from '@shared/types/filters.types';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StatusBar, ScrollView, ActivityIndicator } from 'react-native';

export type DeckCardsProps = {
  deckCards: string[];
  deckTitle: string;
};

type PageProps = NativeStackScreenProps<DefaultStackParamList, 'DeckCards'>;

type CardWithAmount = {
  card: IGetCardResponse;
  amount: number;
};

export default function DeckCards({ route }: PageProps) {
  const { deckCards, deckTitle } = route.params;
  const [cards, setCards] = useState<CardWithAmount[]>([]);
  const [loading, setLoading] = useState(false);

  const countOccurrences = (arr: any[], val: any) =>
    arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

  const fetchCards = async () => {
    setLoading(true);
    const arr: CardWithAmount[] = [];

    const unique = [...new Set(deckCards)];
    for (let index: number = 0; index < unique.length; index++) {
      const ref = unique[index];
      const card = await getCardByCode(ref);
      if (!card) return;
      arr.push({
        card,
        amount: countOccurrences(deckCards, ref),
      });
    }

    setCards(arr);
    setLoading(false);
  };

  useEffect(() => {
    fetchCards();
  }, [deckCards]);

  const spells = useMemo(() => {
    if (!cards.length) return [];

    return cards.filter(({ card }) => card.type === 'Spell');
  }, [cards]);

  const champions = useMemo(() => {
    if (!cards.length) return [];

    return cards.filter(({ card }) => card.type === 'Unit' && card.rarityRef === 'Champion');
  }, [cards]);

  const units = useMemo(() => {
    if (!cards.length) return [];

    return cards.filter(({ card }) => card.type === 'Unit' && card.rarityRef !== 'Champion');
  }, [cards]);

  const landmarks = useMemo(() => {
    if (!cards.length) return [];

    return cards.filter(({ card }) => card.type === 'Landmark');
  }, [cards]);

  return (
    <SafeAreaBox flex={1} bg="bg_primary">
      <StatusBar backgroundColor={theme.colors.bg_primary} />

      <Box flex={1} px="md">
        <ScrollView showsVerticalScrollIndicator={false}>
          <DeckAppBar title={deckTitle} />
          <Divider my="md" />

          {loading ? (
            <Box>
              <ActivityIndicator color={theme.colors.text_default} size="large" />
            </Box>
          ) : (
            <Box>
              {!!champions.length && <RenderType type="Champion" cards={champions} />}
              {!!spells.length && <RenderType type="Spell" cards={spells} />}
              {!!units.length && <RenderType type="Unit" cards={units} />}
              {!!landmarks.length && <RenderType type="Landmark" cards={landmarks} />}
            </Box>
          )}
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
  cards: CardWithAmount[];
};
const RenderType = ({ type, cards }: RenderTypeProps) => {
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
      {cards.map(({ card, amount }) => {
        return <CardPreview card={card} amount={amount} />;
      })}
    </Box>
  );
};
