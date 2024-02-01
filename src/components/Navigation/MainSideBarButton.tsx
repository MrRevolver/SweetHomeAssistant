import React from "react";

import { Box, Button, Text } from "grommet";
import { SideBarLink } from "./styles";

type MainSideBarButtonProps = {
   callback?: () => void,
   icon     : JSX.Element,
   link?    : string,
   name     : string,
};

export function MainSideBarButton (props: MainSideBarButtonProps) {

   return (
      <Button
         hoverIndicator
         onClick = { () => props.callback?.() }
      >
         <SideBarLink 
            to = { props.link || "" }
         >
            <Box
               pad       = { { horizontal: "small", vertical: "small" } }
               direction = "row"
               align     = "center"
               gap       = "small"
            >
               { props.icon }
               <Text>
                  { props.name }
               </Text>
            </Box>
         </SideBarLink>
      </Button>
   );
}
