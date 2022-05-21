import React, { ReactNode } from 'react';
import Text from '@shared/components/Text';
import GradientBox from '@shared/components/layout/GradientBox';
import { useTranslation } from 'react-i18next';
import Divider from '@shared/components/layout/Divider';
import { SvgProps } from 'react-native-svg';

import BandleCityIcon from '@assets/images/regions/bandle_city.svg';
import BilgewaterIcon from '@assets/images/regions/bilgewater.svg';
import DemaciaIcon from '@assets/images/regions/demacia.svg';
import FreljordIcon from '@assets/images/regions/freljord.svg';
import IoniaIcon from '@assets/images/regions/ionia.svg';
import NoxusIcon from '@assets/images/regions/noxus.svg';
import PnzIcon from '@assets/images/regions/pnz.svg';
import ShadowIslesIcon from '@assets/images/regions/shadow_isles.svg';
import ShurimaIcon from '@assets/images/regions/shurima.svg';
import TargonIcon from '@assets/images/regions/targon.svg';

import FollowerIcon from '@assets/images/types/follower.svg';
import ChampionTypeIcon from '@assets/images/types/champion.svg';
import SpellIcon from '@assets/images/types/spell.svg';
import LandmarkIcon from '@assets/images/types/landmark.svg';

import CommonIcon from '@assets/images/rarities/common.svg';
import RareIcon from '@assets/images/rarities/rare.svg';
import EpicIcon from '@assets/images/rarities/epic.svg';
import ChampionIcon from '@assets/images/rarities/champion.svg';

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

export default function DrawerFilters() {
  const { t } = useTranslation('shared');

  return (
    <ScrollView style={{ flex: 1 }} nestedScrollEnabled>
      {/* ver se pointerEvents remove problema com nested scroll */}
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
          <Divider my="lg" />
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

type RenderFilterItemProps = {
  icon: React.FC<SvgProps>;
  label: string;
};

const RenderRegions = () => {
  const { t } = useTranslation('shared');
  const regions = [
    'bandle_city',
    'bilgewater',
    'demacia',
    'freljord',
    'ionia',
    'noxus',
    'pnz',
    'shadow_isles',
    'shurima',
    'targon',
  ] as const;
  type Regions = typeof regions[number];

  const regionItems: { [key in Regions]: RenderFilterItemProps } = {
    bandle_city: {
      icon: props => <BandleCityIcon {...props} />,
      label: t('regions.bandle_city'),
    },
    bilgewater: {
      icon: props => <BilgewaterIcon {...props} />,
      label: t('regions.bilgewater'),
    },
    demacia: {
      icon: props => <DemaciaIcon {...props} />,
      label: t('regions.demacia'),
    },
    freljord: {
      icon: props => <FreljordIcon {...props} />,
      label: t('regions.freljord'),
    },
    ionia: {
      icon: props => <IoniaIcon {...props} />,
      label: t('regions.ionia'),
    },
    noxus: {
      icon: props => <NoxusIcon {...props} />,
      label: t('regions.noxus'),
    },
    pnz: {
      icon: props => <PnzIcon {...props} />,
      label: t('regions.pnz'),
    },
    shadow_isles: {
      icon: props => <ShadowIslesIcon {...props} />,
      label: t('regions.shadow_isles'),
    },
    shurima: {
      icon: props => <ShurimaIcon {...props} />,
      label: t('regions.shurima'),
    },
    targon: {
      icon: props => <TargonIcon {...props} />,
      label: t('regions.targon'),
    },
  };

  const renderItem = (key: Regions) => {
    const Icon = regionItems[key].icon;

    return (
      <TouchableOpacity
        onPress={() => {
          //TODO: Implement region filter
          console.log('Region', key);
        }}>
        <FilterItem
          label={regionItems[key].label}
          icon={
            <Icon key={key} width={normalize(30)} height={normalize(30)} fill={theme.colors[key]} />
          }
        />
      </TouchableOpacity>
    );
  };

  const data = Array.from(regions);

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
  const types = ['follower', 'champion', 'spell', 'landmark'] as const;
  type Types = typeof types[number];

  const typeItems: { [key in Types]: RenderFilterItemProps } = {
    follower: {
      icon: props => <FollowerIcon {...props} />,
      label: t('types.follower'),
    },
    champion: {
      icon: props => <ChampionTypeIcon {...props} />,
      label: t('types.champion'),
    },
    spell: {
      icon: props => <SpellIcon {...props} />,
      label: t('types.spell'),
    },
    landmark: {
      icon: props => <LandmarkIcon {...props} />,
      label: t('types.landmark'),
    },
  };

  const renderItem = (key: Types) => {
    const Icon = typeItems[key].icon;

    return (
      <TouchableOpacity
        onPress={() => {
          //TODO: Implement types filter
          console.log('Type', key);
        }}>
        <FilterItem
          label={typeItems[key].label}
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

  const data = Array.from(types);

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
  const rarities = ['common', 'rare', 'epic', 'champion'] as const;
  type Rarities = typeof rarities[number];

  const rarityItems: { [key in Rarities]: RenderFilterItemProps } = {
    common: {
      icon: props => <CommonIcon {...props} />,
      label: t('rarities.common'),
    },
    rare: {
      icon: props => <RareIcon {...props} />,
      label: t('rarities.rare'),
    },
    epic: {
      icon: props => <EpicIcon {...props} />,
      label: t('rarities.epic'),
    },
    champion: {
      icon: props => <ChampionIcon {...props} />,
      label: t('rarities.champion'),
    },
  };

  const renderItem = (key: Rarities) => {
    const Icon = rarityItems[key].icon;

    return (
      <TouchableOpacity
        onPress={() => {
          //TODO: Implement rarities filter
          console.log('Type', key);
        }}>
        <FilterItem
          label={rarityItems[key].label}
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

  const data = Array.from(rarities);

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
  const sets = [
    'foundations',
    'rising_tides',
    'call_of_mountain',
    'empires_of_ascended',
    'beyond_bandlewood',
  ] as const;
  type Sets = typeof sets[number];

  const setsItems: { [key in Sets]: SetsItemProps } = {
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

  const renderItem = (key: Sets) => {
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

  const data = Array.from(sets);

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
