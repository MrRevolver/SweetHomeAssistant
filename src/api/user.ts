import { TCurrentUser, TFormEditCurrentUserData } from "models/CurrentUser";
import { TError } from "models/Error";
import { api } from "api/client";

export const getCurrentUser = async (): Promise<TCurrentUser> => {

   return await api.send ('user')
};

export const editCurrentUser = async (
   data: TFormEditCurrentUserData
): Promise<TCurrentUser> => {

   return await api.send ('user')
};

export const changeUserPassword = async (
   data: {
      currentPassword: string,
      newPassword   : string
   }
): Promise<TCurrentUser | TError> => {

   return await api.send ('user')
};