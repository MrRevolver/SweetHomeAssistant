import React, { useCallback, useContext, useState } from 'react'

import { controllerStateStore } from 'store/ControllerStateStore'
import { controlPanelStore } from 'store/ControlPanelStore';
import { TBlock } from 'models/ControlPanel';

import { ControlFabric } from "components/Library/ControllerControl/ControlFabric";
import { setControl } from "components/Library/ControllerControl/hooks/setControl";

import { CheckBox, ResponsiveContext } from 'grommet'

export const ControlToggle = (props: {
   controlBlock: TBlock,
   sendCommand : (c: number, v: number) => void
}) => {

   const {
      controlBlock,
      sendCommand
   } = props

   const size = useContext (ResponsiveContext);
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
      <>
         { controlBlock.controls
         .filter  (control => control.type == 'Toogle')
         .flatMap (control => 
            control.options
            .filter (option => option.state == controllerStateStore?.state.find (state => state.name == controlBlock.name)?.value )
            .map    (option => 

               <ControlFabric
                  key      = { option.command }
                  disabled = { disabled }
               >
                  <CheckBox
                     label    = { size != 'small' ? option.label : '' }
                     checked  = { !!option.state }
                     onChange = { () => controlCommand (option.command) }
                     toggle
                     reverse
                  />
               </ControlFabric>
            )) }
      </>
   )
}
