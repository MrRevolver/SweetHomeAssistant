import React, { FC, ReactNode, useEffect, useState } from "react";
import { observer } from "mobx-react";

import { Link, useParams } from "react-router-dom";

import Logo from "assets/img/logo.png";
import { Menu } from "grommet-icons";

import { deviceStore } from "store/DeviceStore";
import { projectStore } from "store/ProjectsStore";
import { rootStore } from "store/RootStore";

import { Box, Button, Grid, Avatar, Layer } from "grommet";
import { MainSideBar } from "./MainSideBar";
import { ThemeSwitchButton } from "../Library/ThemeSwitch/ThemeSwitchButton";
import { MainUserSection } from "./UserSection/MainUserSection";
import { PageTitle } from "./components/PageTitle";


export const NavigationList: FC = observer ((props: {
   children?: ReactNode
}) => {

   const [sidebar, setSidebar]   = useState(false);
   const { idProject, idDevice } = useParams();

   useEffect (() => {
      projectStore.getProjects ()
   }, [rootStore.currentUserStore.currentUserData])

   useEffect (() => {
      idProject && deviceStore.getDevices (Number (idProject))
   }, [idProject])

   return (
      <>
         <Grid
            rows      = { ["auto", "flex", "auto"] }
            columns   = { ["auto", "flex"] }
            className = { "main-grid" }
            areas     = { [
               ["header", "header"],
               ["sidebar", "main"],
               ["footer", "footer"],
            ] }
         >
            <Box
               gridArea  = "header"
               className = "header"
               direction = "row"
               align     = "left"
               justify   = "between"
               pad       = "none"
               style     = { { borderBottom: "1px solid #005d8f" } }
            >
               <Box
                  direction = "row"
                  justify   = "start"
                  pad       = "none"
                  align     = "left"
               >

                  <Button 
                     icon    = { <Menu /> } 
                     onClick = { () => setSidebar(!sidebar) }
                  />

                  <Box
                     direction = "row"
                     justify   = "start"
                     pad       = "xsmall"
                  >
                     <Link to = "/">
                        <Avatar src = { Logo } />
                     </Link>
                  </Box>

                  { (idProject && !idDevice) && <PageTitle /> }

               </Box>
            
               <Box
                  direction = "row"
                  justify   = "end"
                  pad       = "none"
               >
                  <ThemeSwitchButton />
                  <MainUserSection   />
               </Box>

            </Box>

            { sidebar && (
               <Layer
                  position  = "left"
                  full      = "vertical"
                  animation = "slide"
                  modal     = { false }
                  onEsc          = { () => setSidebar(false) }
                  onClickOutside = { () => setSidebar(false) }
               >
                  <MainSideBar  onClose = { setSidebar } />
               </Layer>
            ) }

            <Box
               gridArea = "main"
               pad      = "none"
            >
               { props.children }
            </Box>

         </Grid>
      </>
   )
});
