import React from "react";
import { observer } from "mobx-react";
import { deviceSettingsStore } from "store/DeviceSettingsStore";

import { CheckBox } from "grommet";
import { toast } from "react-toastify";

import { createSchedule } from "../hooks/useSchedule";

export const ToggleSchedule = observer (( props: {
   idDevice: number,
   idTask  : number
} ) => {
   
   const { 
      idDevice,
      idTask
   } = props

   const schedule = { ...deviceSettingsStore.schedules.find (task => task?.Id === idTask) }

   const saveSettingsFromToggle = (value: boolean) => {

      if (createSchedule (idDevice, { ...schedule, IsEnable: value })) {

         toast.success  (
            deviceSettingsStore.devicesSetting
            .find (deviceSetting => deviceSetting.settings.Schedule
            .some (task => task?.Id == idTask)).error_text ?? 'Расписание обновлено'
         )
      }
   }

   return (
      <CheckBox
         checked  = { schedule?.IsEnable }
         onChange = { e =>  saveSettingsFromToggle (e.target.checked) }
         toggle
      />
   )
})