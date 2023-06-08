import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Header } from "grommet";
import { Home, Clock, SettingsOption, Close } from "grommet-icons";

import { MainSideBarButton } from "./MainSideBarButton";

export function MainSideBar (props: {onClose}) {

   const navigate = useNavigate();

   //console.log(toJS (rootStore.currentUserStore.currentUserData))

   return (

      <Box
         fill
         pad        = { { vertical: "small",
            horizontal: "medium" } }
         gap        = "small"
         overflow   = "auto"
         gridArea   = "sidebar"
         background = "backgroundSideBar"
      >
         <Button
            icon = { <Close /> }
            onClick = { () => props.onClose (false) }
         />

         <Box>
            <MainSideBarButton
               icon = { <Home /> }
               name = { "Главная" }
               link = { "/" }
            />
         </Box>

         <Box>
            <MainSideBarButton
               icon = { <Clock /> }
               name = { "История" }
               link = { "/device" }
            />
         </Box>

         <Box>
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
               © { new Date ().getFullYear () } UniPort
            </Box>
         </Box>
      </Box>
   );
}
