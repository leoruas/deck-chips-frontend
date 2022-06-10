import { CardType, RarityType, RegionType } from './filters.types';

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

export interface IDeckType {
  _id: string;
  title: string;
  coverCardCode: string;
  coverUrl?: string;
  cards: string[];
}
