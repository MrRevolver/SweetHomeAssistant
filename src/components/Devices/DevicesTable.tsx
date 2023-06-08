import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { deviceStore } from "store/DeviceStore";
import { Box, Text, Grid, Button, Heading } from "grommet";
import { Package } from "grommet-icons";
import { Loader } from "../Common/Loader";
import { ProjectCard } from "./DeviceCard";
import { toJS } from "mobx";
import { Add } from "grommet-icons";
import { LinkButton } from "./Component/LinkButton";

export const DeviceTable = observer(() => {
   const { idProject, idDevice } = useParams();

   useEffect(() => {
      deviceStore.getDevices(Number (idProject));
   }, [idProject, idDevice]);

   if (deviceStore.loading) {
      return <Loader />;
   } else {
      return deviceStore.devices ? (
      <Box pad = "large">
         <Box
            direction = "row"
            align = "start"
            gap = "small"
            className = "product-table-nav"
         >
            <Heading style = { { margin: "0" } }>
            Проекты
               <LinkButton
                  to = { "/projects/new" }
                  state = { { name: "", remark: "" } }>
                  <Button
                     primary
                     icon = { <Add /> }
                     label = "Создать" />
               </LinkButton>
            </Heading>
         </Box>
         <Grid
            columns = "medium"
            gap = "small"
            className = { "main" }>
            { deviceStore.devices.map((project) => (
               <ProjectCard
                  project = { toJS(project) }
                  key = { project.id_project } />
            )) }
         </Grid>
      </Box>
    ) : (
      <Box
         align = "center"
         justify = "center"
         margin = "xlarge">
         <Package />
         <Text>Нет проектов</Text>
      </Box>
    );
   }
});
