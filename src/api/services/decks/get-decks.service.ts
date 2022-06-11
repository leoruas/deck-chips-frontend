import api from '@app/api/api';

type GetDecksProps = {
  search?: string;
  userId?: string;
};

export const getDecks = async ({ search, userId }: GetDecksProps) => {
  let searchQuery = '';
  if (search) {
    searchQuery = `?title=${search}`;
  }

  const response = await api.get(`decks${searchQuery}`, {
    params: {
      userId,
    },
  });

  return response.data;
};
