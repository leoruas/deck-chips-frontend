import { CardType, RarityType, RegionType } from './filters.types';

export interface ICardType {
  id: string;
  imageUrl: string;
  relatedCards: IRelatedCardType[];
  regions: RegionType[];
  type: CardType;
  rarity: RarityType;
  keyowrds: string[];
  description: string;
  isFavorite: boolean;
}

interface ICardAsset {
  gameAbsolutePath: string;
  fullAbsolutePath: string;
}
export interface IGetCardResponse {
  associatedCardsRefs: string[];
  assets: ICardAsset[];
  regions: RegionType[];
  regionRef: RegionType[];
  attack: number;
  cost: number;
  health: number;
  description: string;
  descriptionRaw: string;
  levelupDescription: string;
  levelupDescriptionRaw: string;
  flavorText: string;
  artistName: string;
  name: string;
  cardCode: string;
  keywords: string[];
  keywordRefs: string[];
  spellSpeed: string;
  spellSpeedRef: string;
  rarity: RarityType;
  rarityRef: RarityType;
  subtypes: [];
  supertype: string;
  type: CardType;
  collectible: boolean;
  set: string;
}

const card = {
  associatedCards: [],
  associatedCardsRefs: [],
  assets: [
    {
      gameAbsolutePath: 'http://dd.b.pvp.net/3_4_0/set1/en_us/img/cards/01IO012.png',
      fullAbsolutePath: 'http://dd.b.pvp.net/3_4_0/set1/en_us/img/cards/01IO012-full.png',
    },
  ],
  regions: ['Ionia'],
  regionRef: ['Ionia'],
  attack: 0,
  cost: 2,
  health: 0,
  description: 'Give an ally +2|+0 or +0|+3 this round.',
  descriptionRaw: 'Give an ally +2|+0 or +0|+3 this round.',
  levelupDescription: '',
  levelupDescriptionRaw: '',
  flavorText:
    '"Never fear change. It will question you, test your limits. It is our greatest teacher." - Karma',
  artistName: 'SIXMOREVODKA',
  name: 'Twin Disciplines',
  cardCode: '01IO012',
  keywords: ['Burst'],
  keywordRefs: ['Burst'],
  spellSpeed: 'Burst',
  spellSpeedRef: 'Burst',
  rarity: 'COMMON',
  rarityRef: 'Common',
  subtypes: [],
  supertype: '',
  type: 'Spell',
  collectible: true,
  set: 'Set1',
};

export interface IRelatedCardType {
  id: string;
  imageUrl: string;
  regions: RegionType[];
  type: CardType;
  rarity: RarityType;
  keyowrds: string[];
  description: string;
  isFavorite: boolean;
}
