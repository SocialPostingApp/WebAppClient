import { IUser } from "./IUser";

export interface IComment {
  _id: string;
  message: string;
  userId: Pick<IUser, "_id" | "name">;
  postId: string;
}
