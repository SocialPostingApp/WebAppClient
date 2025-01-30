import { IComment } from '../models/index';
import { User } from '../models/types/User';
import apiClient from './httpCommon';

export const getCommentsByPost = async (
  postId: string
): Promise<IComment[]> => {
  const response = await apiClient.get(`/comment?post=${postId}`, {
    headers: {
      Authorization: `JWT ${localStorage.getItem('access-token')}`,
    },
  });

  return response.data;
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
      headers: {
        Authorization: `JWT ${localStorage.getItem('access-token')}`,
      },
    }
  );

  return response.data;
};
