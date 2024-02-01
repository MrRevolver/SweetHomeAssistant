import { TProjectItem } from "models/Project";
import { api } from "api/client";

export const getProjectList = async (): Promise<TProjectItem[]> => {

   return await api.send ('project')
};