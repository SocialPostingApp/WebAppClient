import { IUser } from '../models';
import { LocalStorageKeys } from '../models/enums/localStorageKeys';

export const getUserFromLocalStorage = (): IUser | null => {
  const user = localStorage.getItem(LocalStorageKeys.USER) ?? '{}';
  return user ? JSON.parse(user) : null;
};

export const getUserIdFromLocalStorage = (): IUser['_id'] | null => {
  const user = localStorage.getItem(LocalStorageKeys.USER) ?? '';
  return user ? JSON.parse(user)._id : null;
};
