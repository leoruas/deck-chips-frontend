import api from '@app/api/api';

export const getCards = async (page: number, limit: number = 26) => {
  const response = await api.get(`cards`, {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};
