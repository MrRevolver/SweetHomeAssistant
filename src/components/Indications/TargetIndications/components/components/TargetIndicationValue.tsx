import React, { useCallback, useMemo, useState } from "react";
import { controlPanelStore } from "store/ControlPanelStore";

import { controllerStateStore } from "store/ControllerStateStore";
import { TBlock } from "models/ControlPanel";

import { Button, CardBody, CardFooter, TextInput } from "grommet";

import { ControlFabric } from "components/Library/ControllerControl/ControlFabric";
import { setControl } from "components/Library/ControllerControl/hooks/setControl";


type TTargetIndicationProps = {
   indicationBlock: TBlock,
   targetValue    : number,
   setEdit        : (boolean) => void
}

export const TargetIndicationValue = (props: TTargetIndicationProps) => {

   const {
      indicationBlock,
      targetValue,
      setEdit
   } = props

   const valueCommand = useMemo (() => indicationBlock.controls
   .flatMap (control => control.options).find (option => /Значение/.test (option.label)).command,
   [indicationBlock.controls])

   const [disabled, setDisabled] = useState (false)
   const [value   , setValue   ] = useState <number> (targetValue)

   const setIndication = useCallback (async (command, value?) => {

      controllerStateStore.setControllerCommand (indicationBlock.device, command, value)

      setControl ({
         name: controlPanelStore.getControlBlockOption    (command)?.label
         ??    controlPanelStore.getIndicationBlockOption (command)?.label,
         command: command,
         value  : value
      }, setDisabled)

      setEdit (false)
   }, [controlPanelStore.controlBlocks, controlPanelStore.indicationBlocks])

   return (
      <>
         <CardBody
            margin = { { vertical: "xsmall" } }
         >
            <TextInput
               placeholder = 'Установите целевое значение'
               type        = 'number'
               value       = { value }
               onChange    = { event => setValue (Number (event.target.value)) }
            />
         </CardBody>

         <CardFooter
            justify = 'between'
         >
            <Button
               secondary
               label   = 'Отмена'
               margin  = { { top: 'small' } }
               onClick = { () => setEdit (false) }
            />

            <ControlFabric
               disabled = { disabled }
            >
               <Button
                  primary
                  label   = 'Применить'
                  margin  = { { top: 'small' } }
                  onClick = { () => setIndication (valueCommand, value) }
               />
            </ControlFabric>

         </CardFooter>
      </>
   )
}