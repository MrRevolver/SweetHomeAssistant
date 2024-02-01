import React from "react";

import { TDevice } from "models/Device";

import { Card, CardFooter, CardHeader, CardBody, Text } from "grommet";
import { LinkButton } from "components/Library/components/LinkButton";

export function DeviceCard (props: { device: TDevice }) {

   const { device } = props

   return (
      <>
         <LinkButton to = { `/projects/${device.id_project}/device/${device.id_device}/${device.alias}` }>

            <Card
               key            = { device.id_device }
               pad            = "medium"
               gap            = "medium"
               round          = "xsmall"
               background     = "baseBackground"
               hoverIndicator = { "backgroundCardHover" }
               onClick        = { () => false }
            >
               <CardHeader
                  align   = "center"
                  justify = "start"
               >
                  <Text
                     size   = "medium"
                     weight = "bold"
                  >
                     { device.name }
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
                     { device.remark }
                  </Text>
               </CardBody>

               <CardFooter
                  align   = "center"
                  justify = "start">
                  <Text
                     size   = "small"
                     weight = "normal"
                  >
                     { new Date (device.dset).toLocaleString() }
                  </Text>
               </CardFooter>
            </Card>
         </LinkButton>
      </>
   );
}
