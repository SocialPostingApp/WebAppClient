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

export const removeLike = async (postId: string, userId: string) => {
  return await apiClient.delete(`/like/${postId}/${userId}`, {
    headers: {
      Authorization: `JWT ${localStorage.getItem(
        LocalStorageKeys.ACCESS_TOKEN_KEY
      )}`,
    },
  });
};

export const getLikedUserIds = async (postId: string) => {
  const response = await apiClient.get(`/like/${postId}`, {
    headers: {
      Authorization: `JWT ${localStorage.getItem(
        LocalStorageKeys.ACCESS_TOKEN_KEY
      )}`,
    },
  });

  return response.data;
};
