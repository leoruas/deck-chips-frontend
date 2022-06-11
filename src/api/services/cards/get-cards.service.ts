import api from '@app/api/api';
import { FilterOptions } from '@shared/contexts/FilterContext';

type GetCardsProps = {
  page: number;
  limit?: number;
  name?: string;
  filterOption?: FilterOptions;
  filterValue?: string;
};
export const getCards = async ({
  page,
  limit = 50,
  name = '',
  filterOption,
  filterValue,
}: GetCardsProps) => {
  const params: any = {
    page,
    limit,
    name,
  };

  if (filterOption && filterValue) {
    params[filterOption] = filterValue;
  }

  const response = await api.get(`cards`, {
    params,
  });

  return response.data;
};
