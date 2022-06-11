import api from '@app/api/api';
import { IDeckType } from '@shared/types/cards.types';

type SaveDeckProps = {
  id: string;
  title: string;
  cards: string[];
  coverCardCode: string;
  userId?: string;
  userName?: string;
};
export const updateDeck = async ({ ...params }: SaveDeckProps) => {
  try {
    const body = {
      title: params.title,
      cards: params.cards,
      coverCardCode: params.coverCardCode,
    };

    await api.patch(`decks/${params.id}`, {
      ...body,
    });
  } catch (err) {
    console.error(err);
  }
};
