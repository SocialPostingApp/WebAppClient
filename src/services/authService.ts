import { AxiosResponse } from "axios";
import { IUser } from "../models/index";
import apiClient from "./httpCommon";
import { CredentialResponse } from "@react-oauth/google";

export const ACCESS_TOKEN_KEY = "access-token";
export const REFRESH_TOKEN_KEY = "refresh-token";

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
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
  };
};

export const saveTokens = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const resetTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
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
  return await apiClient.post("/auth/login", { email, password });
};


type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

export const refresh = async (): Promise<AxiosResponse<RefreshResponse>> => {
  return await apiClient.post(
    "/auth/refresh",
    {},
    {
      headers: refreshTokenHeaders(),
    }
  );
};

type RegistrationResponse = {
  user: IUser;
  accessToken: string;
  refreshToken: string;
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<AxiosResponse<RegistrationResponse>> => {
  return await apiClient.post("/auth/register", {
    name,
    email,
    password
  });
};

type GoogleSignInResponse = {
  user: IUser;
  accessToken: string;
  refreshToken: string;
};

export const googleSignIn = async (
  credentialResponse: CredentialResponse,
  type?: string,
  bio?: string
): Promise<AxiosResponse<GoogleSignInResponse>> => {
  return await apiClient.post("/auth/google", {
    credentialResponse,
    type,
    bio,
  });
};