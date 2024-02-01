import React from "react";
import { observer } from "mobx-react";

import { deviceStore } from "store/DeviceStore";

import { Box, Text, Grid, Heading } from "grommet";
import { Loader } from "../Common/Loader";
import { DeviceCard } from "./components/DeviceCard";

import { Package } from "grommet-icons";

export const DevicesTable = observer(() => {

   if (deviceStore.loading) return <Loader />
   else {

      return deviceStore.devices ? (

         <Box pad = "large">
            <Box
               direction = "row"
               align     = "start"
               gap       = "small"
               className = "product-table-nav"
            >
               <Heading style = { { margin: "0" } }>
                  Контроллеры
               </Heading>
            </Box>

            <Grid
               columns   = "medium"
               gap       = "small"
               className = { "main" }
            >

               { deviceStore.devices.map((device) => (

                  <DeviceCard
                     device = { device }
                     key    = { device.id_device }
                  />

               )) }

            </Grid>
         </Box>

      ) : (

         <Box
            align   = "center"
            justify = "center"
            margin  = "xlarge"
         >
            <Package />
            <Text>Нет контроллеров</Text>
         </Box>
      );
   }
});
