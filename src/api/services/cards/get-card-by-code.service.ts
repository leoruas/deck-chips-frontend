import api from '@app/api/api';
import { IGetCardResponse } from '@shared/types/cards.types';

export const getCardByCode = async (code: string): Promise<IGetCardResponse> => {
  const response = await api.get(`cards/${code}`);
  return response.data;
};
