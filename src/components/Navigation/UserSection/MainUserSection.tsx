import React, { FC } from "react"
import { observer } from "mobx-react"
import { useNavigate } from "react-router-dom"

import { rootStore } from "store/RootStore"

import { Button, DropButton, Box } from "grommet"
import { Notification, Logout, User } from "grommet-icons"

import { MainSideBarButton } from "../MainSideBarButton"
import { SideBarLink } from "../styles"


export const MainUserSection: FC = observer(() => {

   const navigate = useNavigate()

   const handleLogout = () => {
      rootStore.authStore.logout();
      rootStore.currentUserStore.clearCurrentUserData();
      navigate("/login");
   };

   return (
      <>
         <Button
            secondary
            icon    = { <Notification /> }
            onClick = { () => navigate("/notifications") }
         />

         <DropButton
            plain
            style = { { padding: "4px 12px" } }
            hoverIndicator
            icon        = { <User /> }
            label       = { rootStore.currentUserStore.currentUserData?.name ?? "" }
            dropAlign   = { { "top": "bottom" } }
            dropContent = { (
               <>
                  <Box pad = "medium">
                     <SideBarLink to = "/setting">
                        Настройки
                     </SideBarLink>
                  </Box>

                  <Box pad = "medium">
                     <MainSideBarButton
                        icon     = { <Logout />   }
                        name     = { "Выход"      }
                        callback = { handleLogout }
                     />
                  </Box>
               </> 
            ) }
         />
      </>
   );
});