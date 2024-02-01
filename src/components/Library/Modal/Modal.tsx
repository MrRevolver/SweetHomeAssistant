import React, { useState, useEffect } from 'react';

import { Box, Button, Heading, Layer } from 'grommet';
import { Close } from 'grommet-icons';

type TModalProps = {
   modal: boolean;
   setModal: React.Dispatch <React.SetStateAction <boolean>>;
   heading: string;
   subheading?: string
   children: JSX.Element;
};

export const Modal = (props: TModalProps) => {

   const [bug, setBug] = useState (true) //for bug of grommet

   const { 
      modal,
      setModal,
      heading,
      subheading,
      children
   } = props;

   useEffect (() => {
      setModal (false)
   }, [bug])

   return (
      <>

         { modal && (

            <Layer
               onEsc          = { () => setModal (false) }
               onClickOutside = { () => setModal (false) }
            >
               <Box
                  pad = 'medium'
                  round
               >
                  <Box
                     justify   = 'between'
                     direction = "row"
                     align = 'baseline'
                  >

                     <Heading
                        margin = { { vertical: '10px' } }
                        level  = { 2 }
                     >
                        { heading }
                     </Heading>

                     <Button
                        icon    = { <Close /> }
                        onClick = { () => setBug (!bug) } 
                     />

                  </Box>
                  <Box>

                     <Heading
                        margin = { { top: 'none' } }
                        level  = { 3 }
                     >
                        { subheading }
                     </Heading>

                  </Box>
                  
                  { children }
               </Box>
            </Layer>

         ) }

      </>
   );
};
