import { makeAutoObservable } from "mobx";
import { TDevice } from "../models/Device";
import { getDeviceListInProject } from "../api/device";
import { errorHandler } from "../utils/errorHandler";
import { getTags } from "api/tag";
import { TTag } from "models/Tag";

class DeviceStore {
   loading = true
   devices: TDevice[] = []
   tags   : TTag[]    = []

   constructor () {
      makeAutoObservable(this)
   }

   setDevices (devices: TDevice[], tags: TTag[]) {
      this.devices = devices
      this.tags    = tags
      this.loading = false
   }

   getDevices = async (idProject: number) => {
      try {
         const devices = await getDeviceListInProject (idProject)
         let tags: TTag[] = []

         for (const device of devices) {
            const deviceTags = await getTags (device.id_device)
            tags = [...tags, ...deviceTags]
         }

         this.setDevices (devices, tags.sort((a, b) => a.sorting - b.sorting))
      } 
      catch (err: unknown) {
         errorHandler(err)
         this.loading = false
      }
   };
}

export const deviceStore = new DeviceStore()
