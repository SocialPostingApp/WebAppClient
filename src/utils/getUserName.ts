import { LocalStorageKeys } from '../models/enums/localStorageKeys';

export const getUserNameFromLocalStorage = () => {
  const user = localStorage.getItem(LocalStorageKeys.USER) ?? '';
  return user ? JSON.parse(user).name : null;
};
