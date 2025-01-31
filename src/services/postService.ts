import { LocalStorageKeys } from '../models/enums/localStorageKeys';
import { IPost, IUser } from '../models/index';
import apiClient from './httpCommon';

export interface IPostResponse {
  posts: IPost[];
  hasMore: boolean;
}

const OFFSET = 2;

export const getAllPosts = async (page: number): Promise<IPostResponse> => {
  const response = await apiClient.get(`/post?page=${page}&limit=${OFFSET}`, {
    headers: {
      Authorization: `JWT ${localStorage.getItem(
        LocalStorageKeys.ACCESS_TOKEN_KEY
      )}`,
    },
  });

  return response.data;
};

export const addPost = async (
  post: Omit<IPost, 'owner' | '_id'>,
  userId: IUser['_id']
): Promise<IPost> => {
  const response = await apiClient.post(
    '/post',
    { ...post, owner: userId },
    {
      headers: {
        Authorization: `JWT ${localStorage.getItem(
          LocalStorageKeys.ACCESS_TOKEN_KEY
        )}`,
      },
    }
  );

  return response.data;
};
