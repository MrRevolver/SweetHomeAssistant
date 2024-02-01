import React from "react";

import { Box } from "grommet";

import { CurrentIndications } from "./CurrentIndications/CurrentIndications";
import { TargetIndications } from "./TargetIndications/TargetIndications";

export const Indications = () => {

   return (
      <Box
         style     = { { gap: '24px' } }
         margin    = { { bottom: "medium" } }
         direction = 'row-responsive'
         align     = 'start'
      >
         <CurrentIndications />
         <TargetIndications  />
      </Box>
   )
}