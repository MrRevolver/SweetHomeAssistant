import React, { useState, useEffect, useCallback } from 'react';
import { Box, Heading, Text } from 'grommet';
import { getSample } from 'api/sample';
import { TSample } from 'models/Sample';
import { TTag } from 'models/Tag';
import { Loader } from 'components/Common/Loader';
import { controllerStateStore } from 'store/ControllerStateStore';
import { observer } from 'mobx-react';
import { Modal } from 'components/Library/Modal/Modal';
import { IndicationChart } from './components/IndicationChart';

export const CurrentIndicationCard = observer ((props: { tag: TTag }) => {

   const { tag } = props
   const [sample, setSample] = useState <TSample> ();
   const [time  , setTime  ] = useState <number>  ();
   const [modal , setModal ] = useState <boolean> ();

   const getLastSample = useCallback (() => {

      if (controllerStateStore.state?.length > 0) {
         
         getSample (tag?.id_tag)
         .then (lastSample => {
            setTime   (Number (lastSample?.interval))
            setSample (lastSample)
         })
      }
   }, [tag, controllerStateStore.state])

   useEffect (() => { getLastSample () }, [tag, controllerStateStore.state])

   useEffect (() => {

      if (time && time < 600) {
         const intervalId = setInterval (async () => {
            getLastSample ()
         }, (time * 1000));

         return () => clearInterval (intervalId)
      }
   }, [time])

   return (
      
      <Box
         round      = "small"
         pad        = "xsmall"
         background = "brand"
         flex       = 'grow'
         onClick    = { () => setModal (true) }
      >
         <Heading
            level     = { 3 }
            textAlign = "center"
            margin    = { { top: 'xsmall', bottom: 'none' } }
            weight    = 'lighter' 
            fill
         >
            { tag.name }
         </Heading>

         { controllerStateStore.state?.length > 0
            ?  sample
               ? sample.error_text
                  ? (
                     <Box
                        align  = "center"
                        margin = { { vertical: "xsmall" } }
                        style  = { { textAlign: 'center' } }
                        fill
                     >
                        { sample.error_text }
                     </Box>
                  ) : (
                     <Box fill>
                        <Text
                           weight    = "bold"
                           textAlign = "center"
                           size      = "2xl"
                           margin    = { { vertical: "xsmall" } }
                        >
                           { sample?.sample }{ tag?.sign && ' ' + tag?.sign }
                        </Text>
                     </Box>
                     )
               : <Loader size = 'medium' />
            : controllerStateStore.loading 
               ? <Loader size = 'medium' />
               : (
                  <Box 
                     align  = "center"
                     margin = { { vertical: "small" } }
                  >
                     Контроллер не подключен
                  </Box>
               )
         }

         <Modal
            modal      = { modal }
            setModal   = { setModal }
            heading    = { 'Показания параметра "' + tag.name + '"' }
         >
            <IndicationChart 
               tag = { tag }
            />
         </Modal>
      </Box>

   )
})