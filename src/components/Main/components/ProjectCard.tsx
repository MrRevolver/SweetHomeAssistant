import React from "react";
import { TProjectItem } from "models/Project";

import { Card, CardFooter, CardHeader, CardBody, Text } from "grommet";
import { LinkButton } from "components/Library/components/LinkButton";

export function ProjectCard (props: { project: TProjectItem }) {

   return (

      <>
         <LinkButton
            to = { `/projects/${props.project.id_project}` }
         >
            <Card
               key        = { props.project.id_project }
               pad        = "medium"
               gap        = "medium"
               round      = "xsmall"
               background = "baseBackground"
               onClick    = { () => false }
               hoverIndicator = { "backgroundCardHover" }
            >
               <CardHeader
                  align   = "center"
                  justify = "start"
               >
                  <Text
                     size   = "medium"
                     weight = "bold"
                  >
                     { props.project.name }
                  </Text>
               </CardHeader>

               <CardBody
                  align   = "start"
                  justify = "start"
               >
                  <Text
                     size   = "small"
                     weight = "normal"
                  >
                     { props.project.remark }
                  </Text>
               </CardBody>

               <CardFooter
                  align   = "center"
                  justify = "start"
               >
                  <Text
                     size   = "small"
                     weight = "normal"
                  >
                     { new Date(props.project.dset).toLocaleString() }
                  </Text>
               </CardFooter>
                  
            </Card>
         </LinkButton>
      </>
   );
}
