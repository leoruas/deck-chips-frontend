import api from '@app/api/api';
import { IDeckType } from '@shared/types/cards.types';

type SaveDeckProps = {
  title: string;
  cards: string[];
  coverCardCode: string;
};
export const saveDeck = async ({ ...params }: SaveDeckProps) => {
  console.log(params);
  await api.post(`decks/`, {
    ...params,
  });
};
