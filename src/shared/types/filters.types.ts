export const regionsKeys = [
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
export type RegionType = typeof regionsKeys[number];

export const typesKeys = ['follower', 'champion', 'spell', 'landmark'] as const;
export type CardType = typeof typesKeys[number];

export const raritiesKeys = ['common', 'rare', 'epic', 'champion'] as const;
export type RarityType = typeof raritiesKeys[number];

export const setsKeys = [
  'foundations',
  'rising_tides',
  'call_of_mountain',
  'empires_of_ascended',
  'beyond_bandlewood',
] as const;
export type SetType = typeof setsKeys[number];
