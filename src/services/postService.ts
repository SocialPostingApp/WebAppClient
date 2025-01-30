import { IPost } from "../models/index";
import apiClient from "./httpCommon";

export const getAllPosts = async (
): Promise<IPost[]> => {
  const response = await apiClient.get("/post",
    {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access-token")}`
      }
    }
  );

  return response.data;
};