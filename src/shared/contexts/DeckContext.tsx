import { IDeckType } from '@shared/types/cards.types';
import React, { useContext, useState } from 'react';

interface DeckContextType {
  deck?: IDeckType;
  setDeck: (val?: IDeckType) => void;
  setNewDeck: () => void;
}

export interface DeckProviderProps {
  children: React.ReactNode;
}

const DeckContext = React.createContext<DeckContextType>({} as DeckContextType);

export const DeckProvider: React.FC<DeckProviderProps> = ({ children }) => {
  const [deck, setDeck] = useState<IDeckType | undefined>(undefined);

  const setNewDeck = () => {
    setDeck({
      _id: '',
      title: 'Deck Name',
      coverCardCode: '',
      cards: [],
    });
  };

  return (
    <DeckContext.Provider
      value={{
        deck,
        setDeck,
        setNewDeck,
      }}>
      {children}
    </DeckContext.Provider>
  );
};
export default DeckContext;

export const useDeck = (): DeckContextType => {
  return useContext(DeckContext);
};
