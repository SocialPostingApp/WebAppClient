import { LocalStorageKeys } from '../models/enums/localStorageKeys';
import { IPost } from '../models/index';
import { OFFSET } from '../views/feed/Feed';
import apiClient from './httpCommon';

export interface IPostResponse {
  posts: IPost[];
  hasMore: boolean;
}

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
