import { makeAutoObservable } from "mobx";
import { errorHandler } from "utils/errorHandler";

import { TDeviceSetting, TTask } from "models/Setting";
import { getDeviceSettings } from "api/setting";
import { deviceStore } from "./DeviceStore";

class DeviceSettingsStore {

   loading = false
   devicesSetting: TDeviceSetting[] = []
   idProject

   constructor () { makeAutoObservable (this) }

   async getSettings (idProject: number) {

      this.setLoading (true)

      try {
         if (this.idProject != idProject) {
            this.idProject = idProject
            this.devicesSetting = []
         }
         
         deviceStore.devices
         .forEach (device => {
            getDeviceSettings (device.id_device)
            .then (result => this.setSettings (result))
         })
      }
      catch (err) {
         if (!err.error_text) errorHandler (err)
         this.setLoading (false)
      }
   }

   setSettings (deviceSetting: TDeviceSetting) {

      const idx = this.devicesSetting.flatMap (deviceSetting => deviceSetting.id_device).indexOf (deviceSetting.id_device)

      if (idx === -1) this.devicesSetting = [...this.devicesSetting, deviceSetting]
      else            this.devicesSetting.splice (idx, 1, deviceSetting)

      this.setLoading (false)
   }

   setLoading = (isLoading: boolean) => {
      this.loading = isLoading
   };

   get schedules (): TTask[] {
      return this.devicesSetting.flatMap (deviceSetting => deviceSetting.settings?.Schedule)
   }
}

export const deviceSettingsStore = new DeviceSettingsStore ()
