import api from '@app/api/api';

export const getDecks = async () => {
  const response = await api.get(`decks`);

  return response.data;
};
