import { headers } from './authService';
import apiClient from './httpCommon';

export const addLike = async (postId: string, userId: string) => {
  return await apiClient.post(
    `/like`,
    { userId, postId },
    {
      headers: headers(),
    }
  );
};

export const removeLike = async (postId: string, userId: string) => {
  return await apiClient.delete(`/like/${postId}/${userId}`, {
    headers: headers(),
  });
};

export const getLikedUserIds = async (postId: string) => {
  const response = await apiClient.get(`/like/${postId}`, {
    headers: headers(),
  });

  return response.data;
};
