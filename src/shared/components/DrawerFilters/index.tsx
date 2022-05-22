import React, { ReactNode } from 'react';
import Text from '@shared/components/Text';
import GradientBox from '@shared/components/layout/GradientBox';
import { useTranslation } from 'react-i18next';
import Divider from '@shared/components/layout/Divider';

import FoundationsImage from '@assets/images/sets/foundations.png';
import RisingTidesImage from '@assets/images/sets/rising_tides.png';
import CallOfTheMountainImage from '@assets/images/sets/call_of_mountain.png';
import EmpiresOfAscendedImage from '@assets/images/sets/empires_of_ascended.png';
import BeyondBandlewoodImage from '@assets/images/sets/beyond_bandlewood.png';

import { Box } from '@shared/components/layout/Box';
import { FlatGrid } from 'react-native-super-grid';
import { Theme, theme } from '@app/theme';
import { normalize } from '@shared/helpers/normalize-pixels';
import { ScrollView, TouchableOpacity } from 'react-native';
import { CostCircle, SetImage } from './styles';
import { BoxProps } from '@shopify/restyle';
import {
  RarityType,
  raritiesKeys,
  RegionType,
  regionsKeys,
  SetType,
  setsKeys,
  CardType,
  typesKeys,
} from '@shared/types/filters.types';
import { getRarityInfo, getRegionInfo, getTypeInfo } from '@shared/helpers/get-filter-info';

export default function DrawerFilters() {
  const { t } = useTranslation('shared');

  return (
    <ScrollView style={{ flex: 1 }} nestedScrollEnabled>
      <Box flex={1} pointerEvents="none">
        <GradientBox flex={1} py="lg" px="md">
          <Text variant="title">{t('filters.regions')}</Text>
          {RenderRegions()}
          <Divider my="lg" />

          <Text variant="title">{t('filters.cost')}</Text>
          {RenderCosts()}
          <Divider my="lg" />

          <Text variant="title">{t('filters.type')}</Text>
          {RenderTypes()}
          <Divider my="lg" />

          <Text variant="title">{t('filters.rarity')}</Text>
          {RenderRarities()}
          <Divider my="lg" />

          <Text variant="title">{t('filters.set')}</Text>
          {RenderSets()}
        </GradientBox>
      </Box>
    </ScrollView>
  );
}

type FilterItemProps = {
  icon: ReactNode;
  label: string;
  fontSize?: number;
} & BoxProps<Theme>;

const FilterItem = ({ icon, label, fontSize = 25, ...props }: FilterItemProps) => {
  return (
    <Box flexDirection="row" alignItems="center" my="sm" {...props}>
      {icon}
      <Text mx="md" numberOfLines={2} fontSize={normalize(fontSize)}>
        {label}
      </Text>
    </Box>
  );
};

const RenderRegions = () => {
  const { t } = useTranslation('shared');

  const renderItem = (key: RegionType) => {
    const region = getRegionInfo(key, t);
    const Icon = region.icon;

    return (
      <TouchableOpacity
        onPress={() => {
          //TODO: Implement region filter
          console.log('Region', key);
        }}>
        <FilterItem
          label={region.label}
          icon={
            <Icon key={key} width={normalize(30)} height={normalize(30)} fill={theme.colors[key]} />
          }
        />
      </TouchableOpacity>
    );
  };

  const data = Array.from(regionsKeys);

  return (
    <Box mt="sm">
      <FlatGrid
        data={data}
        nestedScrollEnabled
        renderItem={({ item }) => renderItem(item)}
        itemDimension={normalize(100)}
        scrollEnabled={false}
      />
    </Box>
  );
};

const RenderCosts = () => {
  const costs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'];

  return (
    <Box flexDirection="row" flexWrap="wrap" mt="lg">
      {costs.map(cost => {
        return (
          <TouchableOpacity
            onPress={() => {
              //TODO: implement cost filter
              console.log('Cost', cost);
            }}>
            <CostCircle colors={[theme.colors.light_blue, theme.colors.dark_blue]} key={cost}>
              <Text color="white">{cost}</Text>
            </CostCircle>
          </TouchableOpacity>
        );
      })}
    </Box>
  );
};

const RenderTypes = () => {
  const { t } = useTranslation('shared');

  const renderItem = (key: CardType) => {
    const type = getTypeInfo(key, t);
    const Icon = type.icon;

    return (
      <TouchableOpacity
        onPress={() => {
          //TODO: Implement types filter
          console.log('Type', key);
        }}>
        <FilterItem
          label={type.label}
          icon={
            <Icon
              key={key}
              width={normalize(30)}
              height={normalize(30)}
              fill={theme.colors.type_color}
            />
          }
        />
      </TouchableOpacity>
    );
  };

  const data = Array.from(typesKeys);

  return (
    <Box mt="md">
      <FlatGrid
        data={data}
        nestedScrollEnabled
        renderItem={({ item }) => renderItem(item)}
        itemDimension={normalize(100)}
        scrollEnabled={false}
      />
    </Box>
  );
};

const RenderRarities = () => {
  const { t } = useTranslation('shared');

  const renderItem = (key: RarityType) => {
    const rarity = getRarityInfo(key, t);
    const Icon = rarity.icon;

    return (
      <TouchableOpacity
        onPress={() => {
          //TODO: Implement rarities filter
          console.log('Type', key);
        }}>
        <FilterItem
          label={rarity.label}
          icon={
            <Icon
              key={key}
              width={normalize(30)}
              height={normalize(30)}
              fill={theme.colors.type_color}
            />
          }
        />
      </TouchableOpacity>
    );
  };

  const data = Array.from(raritiesKeys);

  return (
    <Box mt="md">
      <FlatGrid
        data={data}
        nestedScrollEnabled
        renderItem={({ item }) => renderItem(item)}
        itemDimension={normalize(100)}
        scrollEnabled={false}
      />
    </Box>
  );
};

type SetsItemProps = {
  source: any;
  label: string;
};

const RenderSets = () => {
  const { t } = useTranslation('shared');

  const setsItems: { [key in SetType]: SetsItemProps } = {
    foundations: {
      source: FoundationsImage,
      label: t('sets.foundations'),
    },
    rising_tides: {
      source: RisingTidesImage,
      label: t('sets.rising_tides'),
    },
    call_of_mountain: {
      source: CallOfTheMountainImage,
      label: t('sets.call_of_mountain'),
    },
    empires_of_ascended: {
      source: EmpiresOfAscendedImage,
      label: t('sets.empires_of_ascended'),
    },
    beyond_bandlewood: {
      source: BeyondBandlewoodImage,
      label: t('sets.beyond_bandlewood'),
    },
  };

  const renderItem = (key: SetType) => {
    const { source } = setsItems[key];

    return (
      <TouchableOpacity
        onPress={() => {
          //TODO: Implement sets filter
          console.log('Set', key);
        }}>
        <FilterItem
          label={setsItems[key].label}
          fontSize={18}
          pr="xlg"
          icon={<SetImage source={source} key={key} />}
        />
      </TouchableOpacity>
    );
  };

  const data = Array.from(setsKeys);

  return (
    <Box mt="md">
      <FlatGrid
        data={data}
        nestedScrollEnabled
        renderItem={({ item }) => renderItem(item)}
        itemDimension={normalize(100)}
        scrollEnabled={false}
      />
    </Box>
  );
};
