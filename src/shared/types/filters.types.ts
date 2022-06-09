export const regionsKeys = [
  'BandleCity',
  'Bilgewater',
  'Demacia',
  'Freljord',
  'Ionia',
  'Noxus',
  'PiltoverZaun',
  'ShadowIsles',
  'Shurima',
  'Targon',
] as const;
export type RegionType = typeof regionsKeys[number];

export const typesKeys = ['Unit', 'Champion', 'Spell', 'Landmark'] as const;
export type CardType = typeof typesKeys[number];

export const raritiesKeys = ['Common', 'Rare', 'Epic', 'Champion'] as const;
export type RarityType = typeof raritiesKeys[number];

export const setsKeys = [
  'foundations',
  'rising_tides',
  'call_of_mountain',
  'empires_of_ascended',
  'beyond_bandlewood',
] as const;
export type SetType = typeof setsKeys[number];
