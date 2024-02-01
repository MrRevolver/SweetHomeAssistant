import { api } from 'api/client';
import { TDeviceSetting } from 'models/Setting';

export const getDeviceSettings = async (
   deviceId: number
): Promise<TDeviceSetting> => {

   return await api.send('setting')
};

export const setDeviceSettings = async (
   data: {
      id_device: number,
      settings : TDeviceSetting
   }
): Promise<TDeviceSetting> => {
   return await api.send('setting')
};