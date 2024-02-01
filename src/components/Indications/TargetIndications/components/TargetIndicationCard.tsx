import React, { useState, useEffect, useCallback } from 'react';
import {
   Card,
   CardHeader,
   Heading,
} from 'grommet';
import { observer } from 'mobx-react';

import { controllerStateStore } from 'store/ControllerStateStore';
import { TargetIndicationEnable } from './components/TargetIndicationEnable';
import { TargetIndicationValue } from './components/TargetIndicationValue';

import { TBlock } from 'models/ControlPanel';

export const TargetIndicationCard = observer ((props: { indicationBlock: TBlock }) => {

   const {
      indicationBlock
   } = props

   const [edit          , setEdit          ] = useState (false)
   const [targetValue   , setTargetValue   ] = useState <number>  ()
   const [targetIsEnable, setTargetIsEnable] = useState <boolean> ()

   const sendCommand = useCallback (async (command, value) => {
      controllerStateStore.setControllerCommand (indicationBlock.device, command, value)
   }, [indicationBlock.device])

   useEffect (() => {

      setTargetValue    (controllerStateStore.state
      .find (option => new RegExp (indicationBlock.name, 'i').test (option.name) && /Значение/.test (option.name))?.value)  

      setTargetIsEnable (!!controllerStateStore.state
      .find (option => new RegExp (indicationBlock.name, 'i').test (option.name) && /Состояние/.test (option.name))?.value)

   }, [controllerStateStore.state, indicationBlock])

   //console.log (toJS (controllerStateStore.state))

   return (

      <Card
         pad    = "small"
         border = { { color: 'brand', size: 'xsmall' } }
         round
      >
         <CardHeader
            justify = "center"
         >
            <Heading
               level  = { 3 }
               margin = { { top: 'xxsmall', bottom: 'none' } }
               weight = 'lighter' 
            >
               { indicationBlock.name }
            </Heading>
         </CardHeader>

         { !edit &&
            <TargetIndicationEnable
               indicationBlock   = { indicationBlock  }
               targetValue       = { targetValue       }
               targetIsEnable    = { targetIsEnable    }
               setTargetIsEnable = { setTargetIsEnable }
               setEdit           = { setEdit           }
               sendCommand       = { sendCommand       }
            />
         }

         { edit &&
            <TargetIndicationValue
               indicationBlock  = { indicationBlock }
               targetValue      = { targetValue      }
               setEdit          = { setEdit          }
            />
         }
      </Card>
   )
})