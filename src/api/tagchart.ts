import { api } from "api/client";
import { TSample } from "models/Sample";

export const getTagChart = async (
   tagId   : number,
   DBegin  : string | string[],
   DEnd    : string | string[],
   fullData: boolean
): Promise<TSample[]> => {

   return await api.send ('chart')
};