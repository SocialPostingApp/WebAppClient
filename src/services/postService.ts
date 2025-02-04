import { LocalStorageKeys } from '../models/enums/localStorageKeys';
import { IPost, IUser } from '../models/index';
import { headers } from './authService';
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

  return response?.data ?? { posts: [], hasMore: false };
};

export const getPostsByUserId = async (
  page: number,
  userId: string
): Promise<IPostResponse> => {
  const response = await apiClient.get(
    `/post?sender=${userId}&page=${page}&limit=${OFFSET}`,
    {
      headers: {
        Authorization: `JWT ${localStorage.getItem(
          LocalStorageKeys.ACCESS_TOKEN_KEY
        )}`,
      },
    }
  );

  return response?.data ?? { posts: [], hasMore: false };
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

export const editPost = async (
  postId: string,
  post: Omit<IPost, 'owner' | '_id'>,
  userId: IUser['_id']
): Promise<IPost> => {
  const response = await apiClient.put(
    `/post/${postId}`,
    { ...post, owner: userId },
    {
      headers: headers(),
    }
  );

  return response.data;
};

export const deletePost = async (postId: string): Promise<IPost> => {
  const response = await apiClient.delete(`/post/${postId}`, {
    headers: {
      Authorization: `JWT ${localStorage.getItem(
        LocalStorageKeys.ACCESS_TOKEN_KEY
      )}`,
    },
  });

  return response.data;
};
