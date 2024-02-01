import React from 'react';
import { observer } from 'mobx-react';
import { deviceSettingsStore } from 'store/DeviceSettingsStore';

import { Schedule } from './components/Schedule';
import { Box } from 'grommet';
import { Loader } from 'components/Common/Loader';

export const Schedules = observer (() => {

   //console.log (deviceSettingsStore.devicesSetting)

   if (deviceSettingsStore.loading) return <Loader />
   else return (
      <>
         { deviceSettingsStore.devicesSetting.length > 0 &&

         <Box
            direction = "row"
            flex      = { { grow: 1, shrink: 1 } }
            style     = { { gap: '24px' } }
            wrap
         >

            { deviceSettingsStore.devicesSetting?.map (deviceSetting => (
            
               <Schedule
                  key           = { deviceSetting.id_device }
                  deviceSetting = { deviceSetting }
               />
            )) }

         </Box>
         }
      </>
   )
})