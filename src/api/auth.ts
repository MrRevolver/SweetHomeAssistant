import { TAuthRequest, TAuthResponse } from "models/Auth";
import { api } from "api/client";

export const postAuth = async (data: TAuthRequest): Promise<TAuthResponse> => {
   
   return await api.send ('auth');
};