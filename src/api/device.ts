import {
   TDeviceFamily,
   TDeviceItem,
   TDevicePosition,
   TDeviceSoftware,
   TDeviceSoftwareCompilation,
   TDeviceSoftwareFileClean,
   TDeviceType,
   TFormCreateDevice,
   TFormEditDevice,
} from 'models/Device';
import { api } from 'api/client';

export const getDeviceTypeList = async (): Promise<TDeviceType> => {
   return await api.send('GET', '/device/type/');
};

export const getDeviceListInProject = async (
   projectId: number
): Promise<TDeviceFamily[]> => {
   return await api.send('GET', `/device/?id_project=${projectId}`);
};

export const getDeviceItem = async (
   deviceId: number
): Promise<TDeviceFamily> => {
   return await api.send('GET', `/device/?id_device=${deviceId}`);
};

export const getDeviceInfo = async (
   deviceId: number,
   projectId: number
): Promise<TDeviceFamily> => {
   return await api.send(
      'GET',
      `/device/?id_device=${deviceId}&id_project=${projectId}`
   );
};

export const createDeviceItemInProject = async (
   data: TFormCreateDevice
): Promise<TDeviceItem> => {
   return await api.send('POST', '/device/', data);
};

export const editDeviceItem = async (
   data: TFormEditDevice
): Promise<TDeviceItem> => {
   return await api.send('PUT', '/device/', data);
};

export const deleteDeviceItem = async (
   deviceId: number
): Promise<TDeviceItem> => {
   return await api.send('DELETE', '/device/', {
      id_device: deviceId,
   });
};

// Flow option
export const saveDevicePosition = async (
   devicePosition: TDevicePosition
): Promise<TDeviceFamily> => {
   return await api.send('PATCH', '/device/', {
      id_device: devicePosition.id_device,
      id_locationtype: devicePosition.id_locationtype,
      x: devicePosition.x,
      y: devicePosition.y,
   });
};

// Software option
export const getDeviceSoftware = async (
   deviceId: string
): Promise<TDeviceSoftware> => {
   return await api.send('GET', `/device/softwarecode/?id_device=${deviceId}`);
};

export const changeDeviceSoftware = async (
   softwareId: number | undefined,
   code?: string | undefined
) => {
   return await api.send('PUT', '/device/softwarecode/', {
      id_softwarecode: softwareId,
      code: code,
   });
};

export const createDeviceSoftware = async (
   deviceId: number
): Promise<TDeviceSoftware> => {
   return await api.send('POST', '/device/softwarecode/', {
      id_device: deviceId,
      code: '',
      id_state: 0,
   });
};

/* export const emulateDeviceSoftware = async (
  code: string,
  mode: string,
): Promise<TDeviceSoftwareCompilation> => {
  const codeBlob = new Blob([code], { type: "application/octet-stream" });
  const formdata = new FormData();
  formdata.append("file", codeBlob, "code.c");
  formdata.append("mode", mode);
  return await api.sendCode("http://localhost:8888/compile", formdata);
}; */

export const emulateDeviceSoftware = async (
   deviceId: number,
   code: string,
   ports: string,
   mode: string,
   isload?: boolean
): Promise<TDeviceSoftwareCompilation> => {
   return await api.send('POST', '/device/softwarecode/compile/', {
      id_device: deviceId,
      code: code,
      ports: ports,
      mode: mode,
      isload: isload || false,
   });
};

export const deleteDeviceSoftwareFile = async (
   deviceId: number,
   path: string
): Promise<TDeviceSoftwareFileClean> => {
   return await api.send('DELETE', '/device/softwarecode/clean/', {
      id_device: deviceId,
      out_path: path,
   });
};

export const saveCompilateConfig = async (
   deviceId: number,
   config: string
): Promise<TDeviceFamily> => {
   return await api.send('PUT', '/device/', {
      id_device: deviceId,
      config: config,
   });
};
