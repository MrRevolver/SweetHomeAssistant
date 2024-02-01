import React, { useCallback, useState } from 'react'

import { Box, Button } from 'grommet'
import { controllerStateStore } from 'store/ControllerStateStore'
import { TBlock } from 'models/ControlPanel';

import { ControlFabric } from "components/Library/ControllerControl/ControlFabric";
import { setControl } from "components/Library/ControllerControl/hooks/setControl";
import { controlPanelStore } from 'store/ControlPanelStore';

export const ControlButtonsGroup = (props: {
   controlBlock: TBlock,
   sendCommand : (command: number, value: number) => void
}) => {

   const {
      controlBlock,
      sendCommand
   } = props

   const [disabled, setDisabled] = useState (false)

   const controlCommand = useCallback (async (command: number, value?: number) => {

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
         direction = 'row'
         wrap
      >
         { controlBlock.controls
         .filter (control => control.type == 'Button')
         .map   ((control, i) => (

            <ControlFabric
               key      = { i }
               disabled = { disabled }
            >
               <Box
                  flex = 'grow'
               >

                  { control.options.map (option => (
                     <Button
                        key     = { option.command }
                        size    = "large"
                        primary = { controllerStateStore?.state
                        ?.find (state => state.name == controlBlock.name)?.value == option.state ? true : false }
                        label   = { controllerStateStore?.state
                        ?.find (state => state.name == controlBlock.name)?.value ? option.labelOn : option.labelOff }
                        style   = { { borderRadius: 0 } }
                        onClick = { () => controlCommand (option.command) }
                        fill = 'horizontal'
                     />
                  )) }

               </Box>
            </ControlFabric>
         )) }
      </Box>
   )
}
