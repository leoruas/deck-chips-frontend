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
import { useFilters } from '@shared/contexts/FilterContext';

export default function DrawerFilters() {
  const { t } = useTranslation('shared');

  return (
    <ScrollView style={{ flex: 1 }} nestedScrollEnabled>
      <Box flex={1}>
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
  const { filterRegion, isFilterSelected, currentFilterValue, resetFilters } = useFilters();

  const renderItem = (key: RegionType) => {
    const region = getRegionInfo(key, t);
    const Icon = region.icon;
    const hasFilter = !!currentFilterValue;
    const isSelected = isFilterSelected('region', key);

    return (
      <TouchableOpacity
        onPress={() => {
          if (isSelected) {
            resetFilters();
          } else {
            filterRegion(key);
          }
        }}>
        <FilterItem
          opacity={isSelected || !hasFilter ? 1 : 0.5}
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
        renderItem={({ item }) => renderItem(item)}
        itemDimension={normalize(100)}
        scrollEnabled={false}
      />
    </Box>
  );
};

const RenderCosts = () => {
  const costs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const { filterCost, isFilterSelected, currentFilterValue, resetFilters } = useFilters();

  return (
    <Box flexDirection="row" flexWrap="wrap" mt="lg">
      {costs.map(cost => {
        const hasFilter = !!currentFilterValue;
        const isSelected = isFilterSelected('cost', cost.toString());

        return (
          <TouchableOpacity
            onPress={() => {
              if (isSelected) {
                resetFilters();
              } else {
                filterCost(cost);
              }
            }}>
            <CostCircle
              opacity={isSelected || !hasFilter ? 1 : 0.5}
              colors={[theme.colors.light_blue, theme.colors.dark_blue]}
              key={cost}>
              <Text color="white">{cost === '10' ? '10+' : cost}</Text>
            </CostCircle>
          </TouchableOpacity>
        );
      })}
    </Box>
  );
};

const RenderTypes = () => {
  const { t } = useTranslation('shared');
  const { filterType, isFilterSelected, currentFilterValue, resetFilters } = useFilters();

  const renderItem = (key: CardType) => {
    const type = getTypeInfo(key, t);
    const Icon = type.icon;
    const hasFilter = !!currentFilterValue;
    const isSelected = isFilterSelected('type', key);

    return (
      <TouchableOpacity
        onPress={() => {
          if (isSelected) {
            resetFilters();
          } else {
            filterType(key);
          }
        }}>
        <FilterItem
          label={type.label}
          opacity={isSelected || !hasFilter ? 1 : 0.5}
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
  const { filterRarity, isFilterSelected, currentFilterValue, resetFilters } = useFilters();

  const renderItem = (key: RarityType) => {
    const rarity = getRarityInfo(key, t);
    const Icon = rarity.icon;
    const hasFilter = !!currentFilterValue;
    const isSelected = isFilterSelected('rarity', key);

    return (
      <TouchableOpacity
        onPress={() => {
          if (isSelected) {
            resetFilters();
          } else {
            filterRarity(key);
          }
        }}>
        <FilterItem
          label={rarity.label}
          opacity={isSelected || !hasFilter ? 1 : 0.5}
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
  const { filterSet, isFilterSelected, currentFilterValue, resetFilters } = useFilters();

  const setsItems: { [key in SetType]: SetsItemProps } = {
    Set1: {
      source: FoundationsImage,
      label: t('sets.foundations'),
    },
    Set2: {
      source: RisingTidesImage,
      label: t('sets.rising_tides'),
    },
    Set3: {
      source: CallOfTheMountainImage,
      label: t('sets.call_of_mountain'),
    },
    Set4: {
      source: EmpiresOfAscendedImage,
      label: t('sets.empires_of_ascended'),
    },
    Set5: {
      source: BeyondBandlewoodImage,
      label: t('sets.beyond_bandlewood'),
    },
  };

  const renderItem = (key: SetType) => {
    const { source } = setsItems[key];
    const hasFilter = !!currentFilterValue;
    const isSelected = isFilterSelected('set', key);

    return (
      <TouchableOpacity
        onPress={() => {
          if (isSelected) {
            resetFilters();
          } else {
            filterSet(key);
          }
        }}>
        <FilterItem
          label={setsItems[key].label}
          opacity={isSelected || !hasFilter ? 1 : 0.5}
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
