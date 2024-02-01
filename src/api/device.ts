import { TDevice } from 'models/Device';
import { api } from 'api/client';

export const getDeviceListInProject = async (
   projectId: number
): Promise<TDevice[]> => {
   
   return await api.send ('device');
}
