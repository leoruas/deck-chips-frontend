import { IDeckType } from '@shared/types/cards.types';
import React, { useContext, useState } from 'react';

interface DeckContextType {
  deck?: IDeckType;
  setDeck: (val?: IDeckType) => void;
  setNewDeck: () => void;
  setDeckCover: (code: string) => void;
  setDeckTitle: (code: string) => void;
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

  const setDeckCover = (cardCode: string) => {
    if (!deck) return;

    setDeck({
      ...deck,
      coverCardCode: cardCode,
    });
  };

  const setDeckTitle = (newTitle: string) => {
    if (!deck) return;

    setDeck({
      ...deck,
      title: newTitle,
    });
  };

  return (
    <DeckContext.Provider
      value={{
        deck,
        setDeck,
        setNewDeck,
        setDeckCover,
        setDeckTitle,
      }}>
      {children}
    </DeckContext.Provider>
  );
};
export default DeckContext;

export const useDeck = (): DeckContextType => {
  return useContext(DeckContext);
};
