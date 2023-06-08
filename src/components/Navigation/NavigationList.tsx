import React, { FC, ReactNode, useEffect, useState } from "react";

import { observer } from "mobx-react";
import { Box, Button, Grid, Text, Avatar, Heading, Layer } from "grommet";
import { Link, useParams } from "react-router-dom";
import { Menu } from "grommet-icons";
import Logo from "assets/img/logo.png";
import { MainSideBar } from "./MainSideBar";
import { ThemeSwitchButton } from "../UI/ThemeSwitch/ThemeSwitchButton";
import { MainUserSection } from "./UserSection/MainUserSection";
import { PageTitle } from "./components/PageTitle";
import { Loader } from "components/Common/Loader";
import { deviceStore } from "store/DeviceStore";
import { JsxElement } from "typescript";


export const NavigationList: FC = observer((props: {
   children?: React.ReactNode
}) => {
   const [sidebar, setSidebar] = useState(false);

   const { idProject, idDevice } = useParams();

   useEffect(() => {
      !deviceStore?.devices.length   && idProject && !Number.isFinite(idProject) && deviceStore.getDevices(Number(idProject));
    
   }, [idProject, idDevice]);

   return (
      <>
         <Grid
            rows = { ["auto", "flex", "auto"] }
            columns = { ["auto", "flex"] }
            areas = { [
               ["header", "header"],
               ["sidebar", "main"],
               ["footer", "footer"],
            ] }
            className = { "main-grid" }
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
                  position = "left"
                  full     = "vertical"
                  animation = "slide"
                  modal = { false }
                  onEsc    = { () => setSidebar(false) }
                  onClickOutside = { () => setSidebar(false) }
               >
                  <MainSideBar 
                     onClose = { setSidebar }
                  />
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
