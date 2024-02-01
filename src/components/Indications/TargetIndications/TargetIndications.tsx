import React, { useMemo } from "react";
import { observer } from "mobx-react";

import { 
   Box, 
   Heading, 
} from "grommet";

import { TargetIndicationCard } from "./components/TargetIndicationCard";
import { controlPanelStore } from "store/ControlPanelStore";
import { controllerStateStore } from "store/ControllerStateStore";

export const TargetIndications = observer (() => {

   const isTargetState = useMemo (() => controllerStateStore.state?.some (option => /Целевой/.test  (option.name)), [controllerStateStore.state])

   if (controlPanelStore.indicationBlocks.length > 0 && isTargetState) {
         
      return (
         <Box
            direction = "column"
            pad       = "medium"
            flex      = 'shrink'
            border    = { { color: 'brand', size: 'xsmall' } }
            round
         >

            <Heading
               level  = { 3 }
               margin = { { top: 'none' } }
            >
               Целевые показатели
            </Heading>

            <Box
               style = { { gap: 12 } }
            >
               {  controlPanelStore.indicationBlocks &&
                  controlPanelStore.indicationBlocks.map (indicationBlock => (

                     <TargetIndicationCard
                        key             = { indicationBlock.name }
                        indicationBlock = { indicationBlock }
                     />
                  )) 
               }
            </Box>
         </Box>
      )
   }
})