import api from '@app/api/api';

type GetDecksProps = {
  search?: string;
};
export const getDecks = async ({ search }: GetDecksProps) => {
  let searchQuery = '';
  if (search) {
    searchQuery = `?title=${search}`;
  }
  const response = await api.get(`decks${searchQuery}`);

  return response.data;
};
