import api from '@app/api/api';

export const deleteDeck = async (id: string) => {
  try {
    await api.delete(`decks/${id}`);
  } catch (err) {
    console.error(err);
  }
};
