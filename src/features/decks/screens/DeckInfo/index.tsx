import { getCardByCode } from '@app/api/services/cards/get-card-by-code.service';
import { DefaultStackParamList } from '@app/routes/Default.routes';
import { theme } from '@app/theme';
import DeckAppBar from '@features/decks/components/DeckAppBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box } from '@shared/components/layout/Box';
import Divider from '@shared/components/layout/Divider';
import { SafeAreaBox } from '@shared/components/layout/SafeAreaBox';
import Text from '@shared/components/Text';
import { getRarityInfo, getRegionInfo, getTypeInfo } from '@shared/helpers/get-filter-info';
import { normalize } from '@shared/helpers/normalize-pixels';
import { IGetCardResponse } from '@shared/types/cards.types';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Dimensions, ScrollView, StatusBar } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { CounterWrapper, EssenceImage } from './styles';

const WIDTH = Dimensions.get('window').width;

export type DeckInfoProps = {
  deckCards: string[];
  deckTitle: string;
};

type CardWithAmount = {
  card: IGetCardResponse;
  amount: number;
};

type PageProps = NativeStackScreenProps<DefaultStackParamList, 'DeckCards'>;

export default function DeckInfo({ route }: PageProps) {
  const { t } = useTranslation('deck_info');
  const { deckCards, deckTitle } = route.params;
  const [cards, setCards] = useState<CardWithAmount[]>([]);
  const [loading, setLoading] = useState(false);
  const [graphData, setGraphData] = useState({
    labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  });

  const generateGraphData = (cardsData: CardWithAmount[]) => {
    const labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

    const data = labels.map(label => {
      const cardsOfCost =
        label === '10'
          ? cardsData.filter(card => card.card.cost >= parseInt(label))
          : cardsData.filter(card => {
              console.log(card.card.cost);
              return card.card.cost === parseInt(label);
            });

      return cardsOfCost.reduce((a, b) => a + b.amount, 0);
    });
    console.log(data);
    setGraphData({
      labels,
      datasets: [
        {
          data,
        },
      ],
    });
  };

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
    generateGraphData(arr);
    setLoading(false);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const spellsAmount = useMemo(() => {
    if (!cards.length) return [];

    const totalCards = cards.filter(({ card }) => card.type === 'Spell');

    return totalCards.reduce((a, b) => a + b.amount, 0);
  }, [cards]);

  const championsAmount = useMemo(() => {
    if (!cards.length) return [];

    const totalCards = cards.filter(
      ({ card }) => card.type === 'Unit' && card.rarityRef === 'Champion',
    );

    return totalCards.reduce((a, b) => a + b.amount, 0);
  }, [cards]);

  const unitsAmount = useMemo(() => {
    if (!cards.length) return [];

    const totalCards = cards.filter(
      ({ card }) => card.type === 'Unit' && card.rarityRef !== 'Champion',
    );

    return totalCards.reduce((a, b) => a + b.amount, 0);
  }, [cards]);

  const landmarksAmount = useMemo(() => {
    if (!cards.length) return [];

    const totalCards = cards.filter(({ card }) => card.type === 'Landmark');

    return totalCards.reduce((a, b) => a + b.amount, 0);
  }, [cards]);

  const commonsAmount = useMemo(() => {
    if (!cards.length) return [];

    const totalCards = cards.filter(({ card }) => card.rarityRef === 'Common');

    return totalCards.reduce((a, b) => a + b.amount, 0);
  }, [cards]);

  const raresAmount = useMemo(() => {
    if (!cards.length) return [];

    const totalCards = cards.filter(({ card }) => card.rarityRef === 'Rare');

    return totalCards.reduce((a, b) => a + b.amount, 0);
  }, [cards]);

  const epicsAmount = useMemo(() => {
    if (!cards.length) return [];

    const totalCards = cards.filter(({ card }) => card.rarityRef === 'Epic');

    return totalCards.reduce((a, b) => a + b.amount, 0);
  }, [cards]);

  if (loading) {
    return (
      <Box flex={1} bg="bg_primary">
        <ActivityIndicator color={theme.colors.text_default} size="large" />
      </Box>
    );
  }

  return (
    <SafeAreaBox flex={1} bg="bg_primary">
      <StatusBar backgroundColor={theme.colors.bg_primary} />

      <Box flex={1} px="md">
        <ScrollView showsVerticalScrollIndicator={false}>
          <DeckAppBar title={deckTitle} />
          <Divider my="md" />
          <Box flexDirection="row" alignItems="center" mt="md">
            <Text variant="title" mr="lg">
              {t('mana_cost')}
            </Text>
            <FlexDivider />
          </Box>
          <BarChart
            style={{
              marginLeft: normalize(-50),
            }}
            fromZero
            data={graphData}
            width={WIDTH}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundGradientFrom: 'transparent',
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: 'transparent',
              backgroundGradientToOpacity: 0,
              color: () => `rgba(107, 189, 226)`,
              labelColor: () => theme.colors.text_default,
              propsForLabels: {
                fontSize: normalize(20),
              },
              barPercentage: 0.6,
              fillShadowGradientToOpacity: 0.7,
              fillShadowGradientFromOpacity: 1,
            }}
            withHorizontalLabels={false}
            showValuesOnTopOfBars
            withInnerLines={false}
          />

          {/* <Box flexDirection="row" alignItems="center" mt="md">
            <Text variant="title" mr="lg">
              {t('regions')}
            </Text>
            <FlexDivider />
          </Box>
          <RenderRegions /> */}

          <Box flexDirection="row" alignItems="center" mt="md">
            <Text variant="title" mr="lg">
              {t('type')}
            </Text>
            <FlexDivider />
          </Box>
          <RenderTypes
            championsAmount={championsAmount ?? 0}
            unitsAmount={unitsAmount ?? 0}
            spellsAmount={spellsAmount ?? 0}
            landmarksAmount={landmarksAmount ?? 0}
          />

          <Box flexDirection="row" alignItems="center" mt="md">
            <Text variant="title" mr="lg">
              {t('rarity')}
            </Text>
            <FlexDivider />
          </Box>
          <RenderRarities
            championsAmount={championsAmount ?? 0}
            raresAmount={raresAmount ?? 0}
            commonsAmount={commonsAmount ?? 0}
            epicsAmount={epicsAmount ?? 0}
          />

          {/* <Box flexDirection="row" alignItems="center" mt="md">
            <Text variant="title" mr="lg">
              {t('total_cost')}
            </Text>
            <FlexDivider />
          </Box>
          <Box flexDirection="row" alignItems="center" justifyContent="center" my="md">
            <EssenceImage />
            <Text>{t('amount_essences', { amount: 2000 })}</Text>
          </Box> */}
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

// const RenderRegions = () => {
//   const { t } = useTranslation('shared');

//   const region1 = getRegionInfo('ShadowIsles', t);
//   const Region1Icon = region1.icon;

//   const region2 = getRegionInfo('Freljord', t);
//   const Region2Icon = region2.icon;

//   return (
//     <Box flexDirection="row" alignItems="center" my="md" pl="md">
//       <Box flexDirection="row" alignItems="center" my="sm" mx="md" flex={1}>
//         <Box mr="md">
//           <Region1Icon
//             width={normalize(50)}
//             height={normalize(50)}
//             fill={region1.color ?? 'none'}
//           />
//           <CounterWrapper>
//             <Text fontSize={normalize(14)}>20</Text>
//           </CounterWrapper>
//         </Box>
//         <Text mx="md" numberOfLines={2} fontSize={normalize(25)} flex={1}>
//           {region1.label}
//         </Text>
//       </Box>

//       <Box flexDirection="row" alignItems="center" my="sm" mx="md" flex={1}>
//         <Box mr="md">
//           <Region2Icon
//             width={normalize(50)}
//             height={normalize(50)}
//             fill={region2.color ?? 'none'}
//           />
//           <CounterWrapper>
//             <Text fontSize={normalize(14)}>20</Text>
//           </CounterWrapper>
//         </Box>
//         <Text mx="md" numberOfLines={2} fontSize={normalize(25)} flex={1}>
//           {region2.label}
//         </Text>
//       </Box>
//     </Box>
//   );
// };

type RenderTypesProps = {
  championsAmount: number;
  unitsAmount: number;
  spellsAmount: number;
  landmarksAmount: number;
};

const RenderTypes = ({
  championsAmount,
  unitsAmount,
  spellsAmount,
  landmarksAmount,
}: RenderTypesProps) => {
  const { t } = useTranslation('shared');

  const champions = getTypeInfo('Champion', t);
  const ChampionsIcon = champions.icon;

  const units = getTypeInfo('Unit', t);
  const UnitsIcon = units.icon;

  const spells = getTypeInfo('Spell', t);
  const SpellsIcon = spells.icon;

  const landmarks = getTypeInfo('Landmark', t);
  const LandmarksIcon = landmarks.icon;

  return (
    <Box>
      <Box flexDirection="row" alignItems="center" my="md" pl="md">
        <Box flexDirection="row" alignItems="center" my="sm" mx="md" flex={1}>
          <Box mr="md">
            <ChampionsIcon
              width={normalize(50)}
              height={normalize(50)}
              fill={theme.colors.type_color}
            />
            <CounterWrapper>
              <Text fontSize={normalize(14)}>{championsAmount}</Text>
            </CounterWrapper>
          </Box>
          <Text mx="md" numberOfLines={2} fontSize={normalize(25)} flex={1}>
            {champions.label}
          </Text>
        </Box>

        <Box flexDirection="row" alignItems="center" my="sm" mx="md" flex={1}>
          <Box mr="md">
            <UnitsIcon
              width={normalize(50)}
              height={normalize(50)}
              fill={theme.colors.type_color}
            />
            <CounterWrapper>
              <Text fontSize={normalize(14)}>{unitsAmount}</Text>
            </CounterWrapper>
          </Box>
          <Text mx="md" numberOfLines={2} fontSize={normalize(25)} flex={1}>
            {units.label}
          </Text>
        </Box>
      </Box>

      <Box flexDirection="row" alignItems="center" my="md" pl="md">
        <Box flexDirection="row" alignItems="center" my="sm" mx="md" flex={1}>
          <Box mr="md">
            <SpellsIcon
              width={normalize(50)}
              height={normalize(50)}
              fill={theme.colors.type_color}
            />
            <CounterWrapper>
              <Text fontSize={normalize(14)}>{spellsAmount}</Text>
            </CounterWrapper>
          </Box>
          <Text mx="md" numberOfLines={2} fontSize={normalize(25)} flex={1}>
            {spells.label}
          </Text>
        </Box>

        <Box flexDirection="row" alignItems="center" my="sm" mx="md" flex={1}>
          <Box mr="md">
            <LandmarksIcon
              width={normalize(50)}
              height={normalize(50)}
              fill={theme.colors.type_color}
            />
            <CounterWrapper>
              <Text fontSize={normalize(14)}>{landmarksAmount}</Text>
            </CounterWrapper>
          </Box>
          <Text mx="md" numberOfLines={1} fontSize={normalize(20)} flex={1}>
            {landmarks.label}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

type RenderRaritiesProps = {
  championsAmount: number;
  commonsAmount: number;
  raresAmount: number;
  epicsAmount: number;
};

const RenderRarities = ({
  championsAmount,
  commonsAmount,
  raresAmount,
  epicsAmount,
}: RenderRaritiesProps) => {
  const { t } = useTranslation('shared');

  const champion = getRarityInfo('Champion', t);
  const ChampionIcon = champion.icon;

  const common = getRarityInfo('Common', t);
  const CommonIcon = common.icon;

  const rare = getRarityInfo('Rare', t);
  const RareIcon = rare.icon;

  const epic = getRarityInfo('Epic', t);
  const EpicIcon = epic.icon;

  return (
    <Box>
      <Box flexDirection="row" alignItems="center" my="md" pl="md">
        <Box flexDirection="row" alignItems="center" my="sm" mx="md" flex={1}>
          <Box mr="md">
            <CommonIcon
              width={normalize(50)}
              height={normalize(50)}
              fill={theme.colors.type_color}
            />
            <CounterWrapper>
              <Text fontSize={normalize(14)}>{commonsAmount}</Text>
            </CounterWrapper>
          </Box>
          <Text mx="md" numberOfLines={2} fontSize={normalize(25)} flex={1}>
            {common.label}
          </Text>
        </Box>

        <Box flexDirection="row" alignItems="center" my="sm" mx="md" flex={1}>
          <Box mr="md">
            <RareIcon width={normalize(50)} height={normalize(50)} fill={theme.colors.type_color} />
            <CounterWrapper>
              <Text fontSize={normalize(14)}>{raresAmount}</Text>
            </CounterWrapper>
          </Box>
          <Text mx="md" numberOfLines={2} fontSize={normalize(25)} flex={1}>
            {rare.label}
          </Text>
        </Box>
      </Box>

      <Box flexDirection="row" alignItems="center" my="md" pl="md">
        <Box flexDirection="row" alignItems="center" my="sm" mx="md" flex={1}>
          <Box mr="md">
            <EpicIcon width={normalize(50)} height={normalize(50)} fill={theme.colors.type_color} />
            <CounterWrapper>
              <Text fontSize={normalize(14)}>{epicsAmount}</Text>
            </CounterWrapper>
          </Box>
          <Text mx="md" numberOfLines={2} fontSize={normalize(25)} flex={1}>
            {epic.label}
          </Text>
        </Box>

        <Box flexDirection="row" alignItems="center" my="sm" mx="md" flex={1}>
          <Box mr="md">
            <ChampionIcon
              width={normalize(50)}
              height={normalize(50)}
              fill={theme.colors.type_color}
            />
            <CounterWrapper>
              <Text fontSize={normalize(14)}>{championsAmount}</Text>
            </CounterWrapper>
          </Box>
          <Text mx="md" numberOfLines={1} fontSize={normalize(25)} flex={1}>
            {champion.label}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
