import { LocalStorageKeys } from '../models/enums/localStorageKeys';
import { IPost } from '../models/index';
import apiClient from './httpCommon';

export const getAllPosts = async (): Promise<IPost[]> => {
  const response = await apiClient.get('/post', {
    headers: {
      Authorization: `JWT ${localStorage.getItem(
        LocalStorageKeys.ACCESS_TOKEN_KEY
      )}`,
    },
  });

  return response.data;
};
