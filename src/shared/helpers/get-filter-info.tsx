import React from 'react';

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

import { CardType, RarityType, RegionType } from '@shared/types/filters.types';
import { SvgProps } from 'react-native-svg';
import { TFunction } from 'i18next';
import { theme } from '@app/theme';

type InfoItemProps = {
  icon: React.FC<SvgProps>;
  label: string;
  color?: string;
};

export const getRegionInfo = (region: RegionType, t: TFunction) => {
  const regionItems: { [key in RegionType]: InfoItemProps } = {
    bandle_city: {
      icon: props => <BandleCityIcon {...props} />,
      label: t('regions.bandle_city'),
      color: theme.colors.bandle_city,
    },
    bilgewater: {
      icon: props => <BilgewaterIcon {...props} />,
      label: t('regions.bilgewater'),
      color: theme.colors.bilgewater,
    },
    demacia: {
      icon: props => <DemaciaIcon {...props} />,
      label: t('regions.demacia'),
      color: theme.colors.demacia,
    },
    freljord: {
      icon: props => <FreljordIcon {...props} />,
      label: t('regions.freljord'),
      color: theme.colors.freljord,
    },
    ionia: {
      icon: props => <IoniaIcon {...props} />,
      label: t('regions.ionia'),
      color: theme.colors.ionia,
    },
    noxus: {
      icon: props => <NoxusIcon {...props} />,
      label: t('regions.noxus'),
      color: theme.colors.noxus,
    },
    pnz: {
      icon: props => <PnzIcon {...props} />,
      label: t('regions.pnz'),
      color: theme.colors.pnz,
    },
    shadow_isles: {
      icon: props => <ShadowIslesIcon {...props} />,
      label: t('regions.shadow_isles'),
      color: theme.colors.shadow_isles,
    },
    shurima: {
      icon: props => <ShurimaIcon {...props} />,
      label: t('regions.shurima'),
      color: theme.colors.shurima,
    },
    targon: {
      icon: props => <TargonIcon {...props} />,
      label: t('regions.targon'),
      color: theme.colors.targon,
    },
  };

  return regionItems[region];
};

export const getTypeInfo = (type: CardType, t: TFunction) => {
  const typeItems: { [key in CardType]: InfoItemProps } = {
    follower: {
      icon: props => <FollowerIcon {...props} />,
      label: t('types.follower'),
      color: theme.colors.type_color,
    },
    champion: {
      icon: props => <ChampionTypeIcon {...props} />,
      label: t('types.champion'),
      color: theme.colors.type_color,
    },
    spell: {
      icon: props => <SpellIcon {...props} />,
      label: t('types.spell'),
      color: theme.colors.type_color,
    },
    landmark: {
      icon: props => <LandmarkIcon {...props} />,
      label: t('types.landmark'),
      color: theme.colors.type_color,
    },
  };

  return typeItems[type];
};

export const getRarityInfo = (rarity: RarityType, t: TFunction) => {
  const rarityItems: { [key in RarityType]: InfoItemProps } = {
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

  return rarityItems[rarity];
};
