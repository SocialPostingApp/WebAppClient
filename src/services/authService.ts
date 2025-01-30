import { AxiosResponse } from 'axios';
import { IUser } from '../models/index';
import apiClient from './httpCommon';
import { CredentialResponse } from '@react-oauth/google';
import { LocalStorageKeys } from '../models/enums/localStorageKeys';

export const headers = () => {
  const tokens = getTokens();
  if (tokens.accessToken) {
    return {
      Authorization: `JWT ${tokens.accessToken}`,
    };
  }
  return {};
};

export const refreshTokenHeaders = () => {
  const tokens = getTokens();
  if (tokens.refreshToken) {
    return {
      Authorization: `JWT ${tokens.refreshToken}`,
    };
  }
  return {};
};

export const getTokens = () => {
  return {
    accessToken: localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN_KEY),
    refreshToken: localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN_KEY),
  };
};

export const saveTokens = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN_KEY, refreshToken);
};

export const resetTokens = () => {
  localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN_KEY);
  localStorage.removeItem(LocalStorageKeys.REFRESH_TOKEN_KEY);
};

type LoginResponse = {
  user: IUser;
  accessToken: string;
  refreshToken: string;
};
export const login = async (
  email: string,
  password: string
): Promise<AxiosResponse<LoginResponse>> => {
  return await apiClient.post('/auth/login', { email, password });
};

type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

export const refresh = async (): Promise<AxiosResponse<RefreshResponse>> => {
  return await apiClient.post(
    '/auth/refresh',
    {},
    {
      headers: refreshTokenHeaders(),
    }
  );
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<AxiosResponse<IUser>> => {
  return await apiClient.post('/auth/register', {
    name,
    email,
    password,
  });
};

type GoogleSignInResponse = {
  user: IUser;
  accessToken: string;
  refreshToken: string;
};

export const googleSignIn = async (
  credentialResponse: CredentialResponse
): Promise<AxiosResponse<GoogleSignInResponse>> => {
  return await apiClient.post('/auth/google', {
    credential: credentialResponse,
  });
};
