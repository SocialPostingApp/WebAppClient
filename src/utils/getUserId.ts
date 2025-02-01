import { LocalStorageKeys } from '../models/enums/localStorageKeys';

export const getUserIdFromLocalStorage = () => {
  const user = localStorage.getItem(LocalStorageKeys.USER) ?? '';
  return user ? JSON.parse(user)._id : null;
};
