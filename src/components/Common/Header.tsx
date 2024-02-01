import React from "react";

import { controllerStateStore } from "store/ControllerStateStore";

import { Box } from "grommet";
import { ThemeSwitchButton } from "components/Library/ThemeSwitch/ThemeSwitchButton";

controllerStateStore.setParams (window.location)

export function HeaderComponent () {

   return (
      <header>
         <Box
            direction = "row"
            align     = "center"
            justify   = "center"
         >
            <ThemeSwitchButton />
         </Box>
      </header>
   );
}
