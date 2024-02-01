import { api } from "api/client";
import { TStateRequestResult } from "models/ControllerState";

export const getControllerState = async (
   alias: string
): Promise<TStateRequestResult> => {

   return await api.send ('controller');
};

export const setControllerCommand = async (
   alias  : string,
   command: number,
   value? : number,
): Promise<{
   code   : number,
   message: string
}> => {
   
   return await api.send ('command');
};