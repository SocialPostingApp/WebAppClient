import { IUser } from './IUser';

export type UpdateUserInput = Omit<IUser, 'email'>;
