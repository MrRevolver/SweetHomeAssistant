import React, { useEffect, useState } from "react"

import { observer } from "mobx-react"
import { Box, Heading, Text } from "grommet"
import { deviceStore } from "store/DeviceStore"
import { useParams } from "react-router-dom"
import { Loader } from "components/Common/Loader"
import { projectStore } from "store/ProjectsStore"
import { TProjectItem } from "models/Project"

export const PageTitle = observer (() => {

   const { idProject }         = useParams ()
   const [project, setProject] = useState <TProjectItem> ()

   useEffect(() => {
      if (projectStore.projects?.length > 0) {
         setProject (projectStore.projects?.find ((project) => project.id_project == Number(idProject)))
      }
   }, [projectStore.projects])

   if (deviceStore.loading || !project) return <Loader size = "small"/>
   else {
      return (
         <>
            <Box 
               direction = "column" 
               align     = "start" 
               alignSelf = "center"
               style = { {
                  textOverflow: "ellipsis",
                  whiteSpace  : "nowrap",
                  overflow    : "hidden",
                  maxWidth    : 360
               } }
            >
               <Heading
                  margin    = "none"
                  level     = { 3 } 
                  textAlign = 'start'
               >
                  { project ? project?.name : 'Контрольная панель' }
               </Heading>

               { project.remark &&

               <Text size = "small">
                  <b>Описание: </b> { project?.remark }<br />
               </Text>
               }
            </Box>
         </>
      )
   }
})