import api from '@app/api/api';

type SaveDeckProps = {
  title: string;
  cards: string[];
  coverCardCode: string;
  userId?: string;
  userName?: string;
};

export const saveDeck = async ({ ...params }: SaveDeckProps) => {
  try {
    await api.post(`decks/`, {
      ...params,
    });
  } catch (err) {
    console.error(err);
  }
};
