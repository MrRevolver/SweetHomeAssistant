import React from "react";
import { Box } from "grommet";
import { ThemeSwitchButton } from "../UI/ThemeSwitch/ThemeSwitchButton";

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
