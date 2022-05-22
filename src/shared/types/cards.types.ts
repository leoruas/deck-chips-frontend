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
