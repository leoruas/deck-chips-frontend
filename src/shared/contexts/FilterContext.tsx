import { CardType, RarityType, RegionType, SetType } from '@shared/types/filters.types';
import React, { useContext, useState } from 'react';

export type FilterOptions = 'region' | 'type' | 'cost' | 'rarity' | 'set' | null;
// TODO: create filter context
interface FilterContextType {
  currentFilterOption: FilterOptions;
  setCurrentFilterOption: (val: FilterOptions) => void;
  currentFilterValue?: string;
  setCurrentFilterValue: (val: string) => void;
  filterRegion: (val: RegionType) => void;
  filterType: (val: CardType) => void;
  filterRarity: (val: RarityType) => void;
  filterSet: (val: SetType) => void;
  filterCost: (val: string) => void;
  resetFilters: () => void;
  isFilterSelected: (option: FilterOptions, val: string) => boolean;
}

export interface FilterProviderProps {
  children: React.ReactNode;
}

const FilterContext = React.createContext<FilterContextType>({} as FilterContextType);

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [currentFilterOption, setCurrentFilterOption] = useState<FilterOptions>(null);
  const [currentFilterValue, setCurrentFilterValue] = useState<string | undefined>(undefined);

  const regionTypeToFilter: { [key in RegionType]: string } = {
    BandleCity: 'bandle city',
    Bilgewater: 'bilgewater',
    Demacia: 'demacia',
    Freljord: 'freljord',
    Ionia: 'ionia',
    Noxus: 'noxus',
    PiltoverZaun: 'piltover zaun',
    ShadowIsles: 'shadow isles',
    Shurima: 'shurima',
    Targon: 'targon',
  };

  const cardTypeToFilter: { [key in CardType]: string } = {
    Unit: 'unit',
    Spell: 'spell',
    Landmark: 'landmark',
    Champion: 'champion',
  };

  const rarityTypeToFilter: { [key in RarityType]: string } = {
    Common: 'common',
    Rare: 'rare',
    Epic: 'epic',
    Champion: 'champion',
  };

  const setTypeToFilter: { [key in SetType]: string } = {
    Set1: 'set1',
    Set2: 'set2',
    Set3: 'set3',
    Set4: 'set4',
    Set5: 'set5',
  };

  const resetFilters = () => {
    setCurrentFilterOption(null);
    setCurrentFilterValue(undefined);
  };

  const filterRegion = (region: RegionType) => {
    setCurrentFilterOption('region');
    setCurrentFilterValue(regionTypeToFilter[region]);
  };

  const filterType = (cardType: CardType) => {
    setCurrentFilterOption('type');
    setCurrentFilterValue(cardTypeToFilter[cardType]);
  };

  const filterRarity = (rarity: RarityType) => {
    setCurrentFilterOption('rarity');
    setCurrentFilterValue(rarityTypeToFilter[rarity]);
  };

  const filterSet = (set: SetType) => {
    setCurrentFilterOption('set');
    setCurrentFilterValue(setTypeToFilter[set]);
  };

  const filterCost = (cost: string) => {
    setCurrentFilterOption('cost');
    setCurrentFilterValue(cost);
  };

  const isFilterSelected = (filterOption: FilterOptions, value: string) => {
    if (filterOption === 'region') {
      return currentFilterValue === regionTypeToFilter[value as RegionType];
    }
    if (filterOption === 'type') {
      return (
        currentFilterValue === cardTypeToFilter[value as CardType] && currentFilterOption === 'type'
      );
    }
    if (filterOption === 'rarity') {
      return (
        currentFilterValue === rarityTypeToFilter[value as RarityType] &&
        currentFilterOption === 'rarity'
      );
    }
    if (filterOption === 'set') {
      return currentFilterValue === setTypeToFilter[value as SetType];
    }
    if (filterOption === 'cost') {
      return currentFilterValue === value;
    }

    return false;
  };

  return (
    <FilterContext.Provider
      value={{
        currentFilterOption,
        setCurrentFilterOption,
        currentFilterValue,
        setCurrentFilterValue,
        filterRegion,
        filterType,
        filterRarity,
        filterSet,
        filterCost,
        resetFilters,
        isFilterSelected,
      }}>
      {children}
    </FilterContext.Provider>
  );
};
export default FilterContext;

export const useFilters = (): FilterContextType => {
  return useContext(FilterContext);
};
