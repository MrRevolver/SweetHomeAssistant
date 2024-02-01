import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";

import { deviceStore } from "store/DeviceStore";
import { deviceSettingsStore } from "store/DeviceSettingsStore";
import { controllerStateStore } from "store/ControllerStateStore";
import { controlPanelStore } from "store/ControlPanelStore";

import { Box } from "grommet";
import { Loader } from "components/Common/Loader";
import { Greeting } from "components/Greeting/Greeting";
import { Schedules } from "components/Schedules/Schedules";
import { ControlBlockGrid } from "./ControlBlocks/ControlBlockGrid";
import { Indications } from "components/Indications/Indications";

export const ControlPanel = observer (() => {

   const { idProject } = useParams ()

   useEffect (() => {

      deviceStore.getDevices (Number (idProject))
      .then (() => {
         controllerStateStore.getState          (Number (idProject))
         controlPanelStore.getControllerOptions (Number (idProject))
         deviceSettingsStore.getSettings        (Number (idProject))
      })
   }, [idProject])

   //console.log (toJS (controllerStateStore))

   if (deviceStore.loading         ||
      controllerStateStore.loading ||
      controlPanelStore.loading    ||
      deviceSettingsStore.loading) return <Loader />
   else {
      return (
         <Box pad = "large">
            <Greeting />
            <Indications />

            { (controllerStateStore.state?.length > 0)
               ? <ControlBlockGrid />
               : controllerStateStore.loading
                  ? 'Ожидание получения статуса контроллера'
                  : <Box align = "center">Контроллер не подключен</Box>
            }

            <Schedules />
         </Box>
      )  
   }
});