import React, { useMemo } from "react";
import { observer } from "mobx-react";
import { deviceStore } from 'store/DeviceStore';

import { 
   Box, 
   Heading,
} from "grommet";
import { CurrentIndicationCard } from "./components/CurrentIndicationCard";
import { Loader } from "components/Common/Loader";

export const CurrentIndications = observer (() => {

   // TODO: перевести в конструктор
   const tags = useMemo (() => deviceStore.tags
   .filter (tag => tag.istable) 
   .sort   ((a, b) => { return a.id_tag - b.id_tag }),
   [deviceStore.tags])

   if (deviceStore.loading) return <Loader />
   else if (tags.length > 0) {
      
      return (
         <>
            <Box
               border = { { color: 'brand', size: 'xsmall' } }
               pad    = "medium"
               round
               flex
            >
               <Box>
                  <Heading
                     level  = { 3 }
                     margin = { { top: 'none' } }
                  >
               Текущие показатели
                  </Heading>
               </Box>

         
               <Box
                  direction = 'row'
                  flex      = { { grow: 1, shrink: 1 } }
                  style     = { { gap: '24px' } }
                  wrap
               >
                  { tags
                  .map    (tag => (

                     <CurrentIndicationCard
                        key = { tag.id_tag }
                        tag = { tag }
                     />
                  )) 
                  }
               </Box>


               { /*  <Box
               justify   = "end"
               pad       = { { top: "medium" } }
               flex      = { { grow: 0, shrink: 0 } }
               direction = 'row'
            >
               <Button
                  primary
                  reverse
                  label = "Подробнее"
                  title = "Подробнее"
               />
            </Box>  */ }
            </Box>
         </>
      )}
})