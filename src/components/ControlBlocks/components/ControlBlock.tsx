import React, { useCallback } from 'react';
import { observer } from 'mobx-react';

import { Box, Card, CardBody, CardHeader, Heading } from 'grommet';

import { controllerStateStore } from 'store/ControllerStateStore';
import { TBlock } from 'models/ControlPanel';

import { ControlButtonsGroup } from 'components/Library/Controls/ControlButtonsGroup';
import { ControlRangeInput } from 'components/Library/Controls/ControlRangeInput';
import { ControlToggle } from 'components/Library/Controls/ControlToggle';


export const ControlBlock = observer ((props: {
   controlBlock: TBlock
}) => {

   const {
      controlBlock
   } = props

   const sendCommand = useCallback ( async (command: number, value: number) => {
      controllerStateStore.setControllerCommand (controlBlock.device, command, value)
   }, [controlBlock.device])

   //console.log (toJS (controlBlock))

   return (

      <Card
         border = { { color: 'brand', size: 'xsmall' } }
         pad    = { { horizontal: "medium" } }
         flex   = "grow"
      >
         <CardHeader>
            <Heading 
               level  = { 3 }
            >
               { controlBlock.label }
            </Heading>

            { (controlBlock && controllerStateStore.state?.length > 0) &&

               <ControlToggle
                  controlBlock = { controlBlock }
                  sendCommand  = { sendCommand }
               />

            }

         </CardHeader>

         <CardBody>
            
            { (controlBlock && controllerStateStore.state?.length > 0) &&

               <Box
                  pad       = { { vertical: "medium" } }
                  direction = "column"
                  fill
               >
                  <ControlButtonsGroup 
                     controlBlock = { controlBlock }
                     sendCommand  = { sendCommand }
                  />
                  <ControlRangeInput 
                     controlBlock = { controlBlock }
                     sendCommand  = { sendCommand }
                  />
               </Box>
               
            }

         </CardBody>
      </Card>
   )
})