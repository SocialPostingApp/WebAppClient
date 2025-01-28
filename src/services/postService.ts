import { IPost } from "../models/index";
import apiClient from "./httpCommon";

export const getAllPosts = async (
): Promise<IPost[]> => {
  const response = await apiClient.get("/post");

  return response.data;
};