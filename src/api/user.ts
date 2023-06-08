import { TCurrentUser, TFormEditCurrentUserData } from "models/CurrentUser";
import { api } from "api/client";

export const getCurrentUser = async (): Promise<TCurrentUser> => {
  return await api.send("GET", "/user/");
};

export const editCurrentUser = async (
  data: TFormEditCurrentUserData
): Promise<TCurrentUser> => {
  return await api.send("PUT", "/user/", data);
};
