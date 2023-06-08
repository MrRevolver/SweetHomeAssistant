import React from "react";
import { TDeviceFamily } from "../../models/Device";
import { Card, CardFooter, CardHeader, CardBody, Text } from "grommet";
import { STATUS_DELETED } from "../../constants/globalConstants";
import { LinkButton } from "./Component/LinkButton";
//import { parseISO } from "date-fns";

export function ProjectCard (props: { project: TDeviceFamily }) {
   return (
      <>
         { props.project.id_state !== STATUS_DELETED && (
            <LinkButton to = { `/projects/${props.project.id_project}` }>
               <Card
                  key = { props.project.id_project }
                  pad = "medium"
                  gap = "medium"
                  round = "xsmall"
                  className = { props.project.id_state === STATUS_DELETED
              ? "background-card-deleted"
              : "" }
                  background = { props.project.id_state === STATUS_DELETED
              ? "backgroundSideBar"
              : "baseBackground" }
                  onClick = { () => false }
                  hoverIndicator = { "backgroundCardHover" }
               >
                  <CardHeader
                     align = "center"
                     justify = "start">
                     <Text
                        size = "medium"
                        weight = "bold">
                        { props.project.name }
                     </Text>
                  </CardHeader>
                  <CardBody
                     align = "start"
                     justify = "start">
                     <Text
                        size = "small"
                        weight = "normal">
                        { props.project.remark }
                     </Text>
                  </CardBody>
                  <CardFooter
                     align = "center"
                     justify = "start">
                     <Text
                        size = "small"
                        weight = "normal">
                        { /*{parseISO(props.project.dset).toDateString()}*/ }
                        { new Date(props.project.dset).toLocaleString() }
                     </Text>
                  </CardFooter>
               </Card>
            </LinkButton>
         ) }
      </>
   );
}
