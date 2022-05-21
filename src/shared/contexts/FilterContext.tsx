import React, { useContext } from 'react';

// TODO: create filter context
interface FilterContextType {}

export interface FilterProviderProps {
  children: React.ReactNode;
}

const FilterContext = React.createContext<FilterContextType>({} as FilterContextType);

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  return <FilterContext.Provider value={{}}>{children}</FilterContext.Provider>;
};
export default FilterContext;

export const useFilter = (): FilterContextType => {
  return useContext(FilterContext);
};
