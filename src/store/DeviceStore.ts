import { makeAutoObservable } from "mobx";
import { TDeviceFamily } from "../models/Device";
import { getDeviceListInProject } from "../api/device";
import { errorHandler } from "../utils/errorHandler";

class DeviceStore {
   loading = true;
   devices: TDeviceFamily[] = [];

   constructor () {
      makeAutoObservable(this);
   }

   setDevices (devices: TDeviceFamily[]) {
      this.devices = devices;
      this.loading = false;
   }

   getDevices = async (idProject: number) => {
      try {
         const result = await getDeviceListInProject(idProject);
         this.setDevices(result);
      } catch (err: unknown) {
         errorHandler(err);
         this.loading = false;
      }
   };
}

export const deviceStore = new DeviceStore();
