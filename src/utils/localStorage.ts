import { errorHandler } from "./errorHandler";

export const getLocalStorageItem = (key: string, defaultValue: unknown) => {
   const localStorageData = localStorage.getItem(key);

   if (localStorageData) {
      try {
         return JSON.parse(localStorageData);
      } catch (err) {
         removeLocalStorageItem(key);
         errorHandler(err);
         return;
      }
   } else return defaultValue;
};

export const setLocalStorageItem = (key: string, value: unknown): void => {
   localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorageItem = (key: string): void =>
   localStorage.removeItem(key);
