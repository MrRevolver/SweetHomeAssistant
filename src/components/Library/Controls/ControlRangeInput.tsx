import React, { useCallback, useState } from 'react'

import { Box, RangeInput, Text } from 'grommet'
import { controllerStateStore } from 'store/ControllerStateStore'

import { TBlock } from 'models/ControlPanel';

import { ControlFabric } from "components/Library/ControllerControl/ControlFabric";
import { setControl } from "components/Library/ControllerControl/hooks/setControl";
import { controlPanelStore } from 'store/ControlPanelStore';

export const ControlRangeInput = (props: {
   controlBlock: TBlock,
   sendCommand : (c: number, v: number) => void
}) => {

   const {
      controlBlock,
      sendCommand
   } = props

   const [rangeValue, setRangeValue] = useState (controllerStateStore?.state
   ?.find (state => state.name == controlBlock.name)?.value)
   const [disabled, setDisabled] = useState (false)

   const controlCommand = useCallback (async (command, value?) => {

      sendCommand (command, value)

      setControl ({
         name: controlPanelStore.getControlBlockOption    (command)?.label
         ??    controlPanelStore.getIndicationBlockOption (command)?.label,
         command: command,
         value  : value
      }, setDisabled)
   }, [controlPanelStore.controlBlocks, controlPanelStore.indicationBlocks])
   
   return (
      <Box
         direction = 'column'
      >
         { controlBlock.controls
         .filter  (control => control.type == 'RangeInput')
         .flatMap (control => 
            control.options.map (option => (

               <ControlFabric
                  key      = { option.command }
                  disabled = { disabled }
               >
                  <Box>
                     { rangeValue != undefined &&
                  <Box
                     justify = 'end'
                     fill    = 'horizontal'
                  >
                     <Text
                        alignSelf = 'center'
                     >
                        { `${option.label}: ${rangeValue}%` }
                     </Text>
                  </Box>
                     }
                     <Box
                        margin = { { top: 'medium' } }
                        fill   = 'horizontal'
                     >
                        <RangeInput
                           max      = { 100 }
                           value    = { rangeValue }
                           onClick  = { () => controlCommand (option.command, rangeValue) }
                           onChange = { event => setRangeValue (Number (event.target.value)) }
                        />
                     </Box>
                  </Box>
               </ControlFabric>

            )) ) 
         }

      </Box>
   )
}
