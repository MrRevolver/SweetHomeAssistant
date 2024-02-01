import React from "react"

import { observer } from "mobx-react"
import { projectStore } from "store/ProjectsStore"

import { Box, Text, Grid, Heading } from "grommet"

import { Loader } from "../Common/Loader"
import { ProjectCard } from "./components/ProjectCard"

import { Package } from "grommet-icons"

export const ProjectsTable = observer(() => {

   if (projectStore.loading) return <Loader />
   else {

      return projectStore.projects ? (

         <Box pad = "large">
            
            <Box
               direction = "row"
               align     = "start"
               gap       = "small"
               className = "product-table-nav"
            >
               <Heading style = { { margin: "0" } }>
                  Проекты
               </Heading>
            </Box>

            <Grid
               columns   = "medium"
               gap       = "small"
               className = { "main" }
            >
               { projectStore.projects.map((project) => (

                  <ProjectCard
                     project = { project }
                     key     = { project.id_project }
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
            <Text>Нет проектов</Text>
         </Box>
      );
   }
});
