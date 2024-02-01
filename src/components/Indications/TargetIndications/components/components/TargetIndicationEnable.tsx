import React, { useCallback, useMemo, useState } from "react";

import { controlPanelStore } from "store/ControlPanelStore";
import { TBlock } from "models/ControlPanel";

import { ControlFabric } from "components/Library/ControllerControl/ControlFabric";
import { setControl } from "components/Library/ControllerControl/hooks/setControl";

import { Button, CardBody, CardFooter, CheckBox, Text } from "grommet";

type TTargetIndicationProps = {
   indicationBlock  : TBlock,
   targetValue      : number,
   targetIsEnable   : boolean,
   setTargetIsEnable: React.Dispatch<React.SetStateAction<boolean>>,
   setEdit          : (b: boolean) => void,
   sendCommand      : (command: number, value: number) => void
}

export const TargetIndicationEnable = (props: TTargetIndicationProps) => {

   const {
      indicationBlock,
      targetValue,
      targetIsEnable,
      setTargetIsEnable,
      setEdit,
      sendCommand
   } = props

   const stateCommandOn  = useMemo (() => indicationBlock.controls
   .flatMap (control => control.options).find (option => /Состояние/.test (option.label) && option.state == 1).command,
   [indicationBlock.controls])

   const stateCommandOff = useMemo (() => indicationBlock.controls
   .flatMap (control => control.options).find (option => /Состояние/.test (option.label) && option.state == 0).command,
   [indicationBlock.controls])

   const [disabled, setDisabled] = useState (false)

   const setIndication = useCallback (async (command: number, value?: number) => {

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
         <CardBody>

            <Text
               textAlign = 'center'
               weight    = 'bolder'
               size      = "large"
               margin    = { { vertical: "xsmall" } }
            >
               { targetValue } { indicationBlock.sign }
            </Text>

         </CardBody>

         <CardFooter
            justify = 'between'
            margin  = { { top: "small" } }
         >
                  
            <ControlFabric
               disabled = { disabled }
            >
               <CheckBox
                  checked  = { targetIsEnable }
                  onChange = { e =>  {
                     setIndication (e.target.checked ? stateCommandOn : stateCommandOff)
                     setTargetIsEnable (e.target.checked)
                  } }
                  toggle
               />
            </ControlFabric>

            <Button
               primary
               reverse
               label   = "Изменить"
               onClick = { () => setEdit (true) }
            />

         </CardFooter>
      </>
   )
}