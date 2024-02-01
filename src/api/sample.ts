import { api } from "api/client";
import { TSample } from "models/Sample";

export const getSample = async (
   tagId: number
): Promise<TSample> => {
   
   return await api.send ('sample')
};