import { TAuthRequest, TAuthResponse } from "models/Auth";
import { api } from "api/client";

export const postAuth = async (data: TAuthRequest): Promise<TAuthResponse> => {
   return await api.send("POST", "/auth/", data);
};

export const setWorkspace = async (workspaceId: number): Promise<TAuthResponse> => {
   return await api.send("PUT", "/auth/", { id_workspace: workspaceId });
};