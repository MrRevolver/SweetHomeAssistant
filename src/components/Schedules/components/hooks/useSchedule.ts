import { setDeviceSettings } from 'api/setting';

import { TDeviceSetting, TTask } from 'models/Setting';
import { toast } from 'react-toastify';
import { deviceSettingsStore } from 'store/DeviceSettingsStore';

const checkSchedule = (task: TTask) => {

   const checkInterval = () => {

      switch (task?.Interval) {
         case 1:
            return  Object.prototype.hasOwnProperty.call (task, 'EveryDay')
         case 2:
            return (Object.prototype.hasOwnProperty.call (task, 'EveryWeek') &&
                    Object.prototype.hasOwnProperty.call (task, 'WeekDays')  &&
                    task?.WeekDays.length)
         default:
            return true
      }
   }

   const checkAction = () => {

      switch (task?.Action) {
         case 0:
            return Object.prototype.hasOwnProperty.call (task, 'Command')
         case 1:
            return Object.prototype.hasOwnProperty.call (task, 'FunctionName')
         case 2:
            return Object.prototype.hasOwnProperty.call (task, 'EventName')
         default:
            return false
      }
   }

   return (Object.hasOwnProperty.call (task, 'DStart'  ) &&
           Object.hasOwnProperty.call (task, 'Interval') &&
           Object.hasOwnProperty.call (task, 'Action'  ) &&
           checkInterval () && checkAction ())
}

const saveDeviceSetting = async (idDevice: number, settings) => {

   const result: TDeviceSetting = await setDeviceSettings ({
      id_device: (Number (idDevice)),
      settings : settings
   })

   deviceSettingsStore.setSettings (result)
   return true
}

export const createSchedule = (idDevice: number, activeTask: TTask) => {

   const settings = deviceSettingsStore.devicesSetting.find (deviceSetting => deviceSetting.id_device == idDevice).settings ?? { 'Schedule': undefined }
      
   if (checkSchedule (activeTask)) {

      if (settings?.Schedule?.some (task => task.Id == activeTask.Id)) {
         const idx = settings?.Schedule?.flatMap (task => task.Id).indexOf (activeTask.Id)
         settings?.Schedule.splice (idx, 1, activeTask)
      }
      else {
         if (settings?.Schedule?.length > 0) settings.Schedule = [...settings.Schedule, activeTask]
         else                                settings.Schedule = [activeTask]
      }

      return saveDeviceSetting (idDevice, settings)
   } else toast.error ('Не все параметры задачи заполнены')
}

export const deleteSchedule = (idDevice: number, idTask: number) => {

   const settings = deviceSettingsStore.devicesSetting.find (deviceSetting => deviceSetting.id_device == idDevice).settings;

   if (settings?.Schedule?.some (task => task.Id == idTask)) {
      const idx = settings?.Schedule?.flatMap (task => task.Id).indexOf (idTask)
      settings?.Schedule?.splice (idx, 1)

      return saveDeviceSetting (idDevice, settings)
   } else toast.error ('Что-то пошло не так...')
}
