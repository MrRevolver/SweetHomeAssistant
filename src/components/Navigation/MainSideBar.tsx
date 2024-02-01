import React from "react"

import { Box, Button } from "grommet"
import { Home, Clock, SettingsOption, Close } from "grommet-icons"
import { MainSideBarButton } from "./MainSideBarButton"

export function MainSideBar (props: {onClose}) {

   return (

      <Box
         fill
         pad        = { { vertical: "small" } }
         gap        = "small"
         overflow   = "auto"
         gridArea   = "sidebar"
         background = "backgroundSideBar"
      >
         <Button
            icon    = { <Close /> }
            onClick = { () => props.onClose (false) }
         />

         <Box
            border = { { side: "bottom", color: "white" } }
            pad    = "medium"
         >
            <MainSideBarButton
               icon = { <Home /> }
               name = { "Главная" }
               link = { "/" }
            />
         </Box>

         <Box
            border = { { side: "bottom", color: "white" } }
            pad    = "medium"
         >
            <MainSideBarButton
               icon = { <Clock /> }
               name = { "История" }
               link = { "/device" }
            />
         </Box>

         <Box
            pad    = "medium"
         >
            <MainSideBarButton
               icon = { <SettingsOption /> }
               name = { "Настройки" }
               link = { "/setting" }
            />
         </Box>

         <Box
            pad       = "small"
            justify   = "between"
            className = "footer"
            style = { { textAlign: "center" } } 
         >
            <Box>
               © { new Date ().getFullYear () } SweetHome
            </Box>
         </Box>
      </Box>
   );
}
