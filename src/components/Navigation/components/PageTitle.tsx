import React, { FC, useEffect, useState } from "react";

import { observer } from "mobx-react";
import { Box, Button, Heading, Paragraph, Text } from "grommet";
import { deviceStore } from "store/DeviceStore";
import { Edit, Trash } from "grommet-icons";
import { useParams } from "react-router-dom";
import { Loader } from "components/Common/Loader";
import { TDeviceFamily } from "models/Device";

function limitStr (str, n, symb) {
   if (!n && !symb) return str;
   symb = symb || '...';
   return str.substr(0, n - symb.length) + symb;
}

export const PageTitle = observer(() => {
   const { idProject, idDevice } = useParams();
   const [project, setProject] = useState<TDeviceFamily>();

   // Modal control
   const [open, setOpen] = React.useState<boolean>();
   const onOpen = () => setOpen(true);
   const onClose = () => setOpen(undefined);

   useEffect(() => {
      setProject(deviceStore.devices.find((project) => project.id_project == Number(idProject)))
   })

   if (deviceStore.loading || !project) {
      return <Loader size = "small"/>
   }
   else {
      return (
         <>
            <Box 
               direction = "column" 
               align = "start" 
               alignSelf = "center"
          
               style = { {
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  maxWidth: 360
               } }
            >
               <Heading
                  margin = "none"
                  level = { 3 } 
                  textAlign = 'start'
               >
                  { project ? project.name : 'Название проекта' }
               </Heading>
               <Text 
                  size = "small">
                  <b>Описание: </b> { project.remark }<br />
               </Text>
            </Box>
            <Box
               direction = "row"
               align = "center" >

               <Button
                  secondary
                  icon = { <Edit /> }
                  color = "brand"
                  //to = { `/projects/edit/${project.id_project}` }
                  //state = { { name: project.name, remark: project.remark } }
               />

               <Button
                  secondary
                  icon = { <Trash color = "buttonDelete" /> }
                  color = "buttonDelete"
                  onClick = { onOpen }
               />
               
            </Box>
         </>
      )
   }
})