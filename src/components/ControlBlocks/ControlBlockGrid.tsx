import React from 'react';
import { Box } from 'grommet';
import { observer } from 'mobx-react';

import { deviceStore } from 'store/DeviceStore';

import { ControlBlock } from './components/ControlBlock';
import { controlPanelStore } from 'store/ControlPanelStore';

export const ControlBlockGrid = observer (() => {

   return (
      <>
         { deviceStore.devices?.length > 0 &&

            <Box
               direction = "row"
               flex      = { { grow: 1, shrink: 1 } }
               style     = { { gap: '24px' } }
               wrap
            >

               {  controlPanelStore.controlBlocks &&
                  controlPanelStore.controlBlocks.map ((controlBlock, i) => (

                     <ControlBlock
                        key          = { controlBlock.device + i }
                        controlBlock = { controlBlock }
                     />
                  ))
               }

            </Box>
            
         }
      </>
   )
})