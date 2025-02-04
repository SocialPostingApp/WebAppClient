import { LocalStorageKeys } from '../models/enums/localStorageKeys';

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem(LocalStorageKeys.USER) ?? '{}';
  return user ? JSON.parse(user) : null;
};

export const getUserIdFromLocalStorage = () => {
  const user = localStorage.getItem(LocalStorageKeys.USER) ?? '';
  return user ? JSON.parse(user)._id : null;
};
