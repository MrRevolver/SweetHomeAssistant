import { api } from "api/client";
import { TTag } from "models/Tag";

export const getTags = async (
   deviceId: number
): Promise<TTag[]> => {
   
   return await api.send ('tag')
};