import api from '@app/api/api';

type GetCardsProps = {
  page: number;
  limit?: number;
  name?: string;
};
export const getCards = async ({ page, limit = 50, name = '' }: GetCardsProps) => {
  const response = await api.get(`cards`, {
    params: {
      page,
      limit,
      name,
    },
  });
  return response.data;
};
