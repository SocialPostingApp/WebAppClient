import { IUser } from './IUser';

export interface IPost {
  _id: string;
  owner: Pick<IUser, '_id' | 'name'>;
  title: string;
  review: string;
  image?: string;
  rate: number;
  comments?: string[];
}
