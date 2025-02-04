import { IComment } from '../models/index';
import { User } from '../models/types/User';
import { headers } from './authService';
import apiClient from './httpCommon';

export const getCommentsByPost = async (
  postId: string
): Promise<IComment[]> => {
  const response = await apiClient.get(`/comment?post=${postId}`, {
    headers: headers(),
  });

  return response.data;
};

export const getCommentsCountByPost = async (
  postId: string
): Promise<number> => {
  const response = await apiClient.get(`/comment/post/${postId}`, {
    headers: headers(),
  });

  return response.data?.amount ?? 0;
};

export const addComment = async (
  postId: string,
  message: string,
  userId: User['_id']
): Promise<IComment> => {
  const response = await apiClient.post(
    '/comment',
    { postId, message, userId },
    {
      headers: headers(),
    }
  );

  return response.data;
};
