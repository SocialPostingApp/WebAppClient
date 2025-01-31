import { LocalStorageKeys } from '../models/enums/localStorageKeys';
import apiClient from './httpCommon';

export const addLike = async (postId: string, userId: string) => {
  return await apiClient.post(
    `/like`,
    { userId, postId },
    {
      headers: {
        Authorization: `JWT ${localStorage.getItem(
          LocalStorageKeys.ACCESS_TOKEN_KEY
        )}`,
      },
    }
  );
};
