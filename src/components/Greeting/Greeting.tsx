import React from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

import { rootStore } from "store/RootStore";
import { projectStore } from 'store/ProjectsStore';

import { PageHeader } from 'grommet';

export const Greeting = observer (() => {

   const { idProject } = useParams ()

   return (
      <PageHeader
         title    = { `Здравствуйте, ${ rootStore.currentUserStore.currentUserData?.name ?? "" }!` }
         subtitle = { `Добро пожаловать в контрольную панель управления проектом 
         "${ projectStore.projects.find (project => project.id_project === Number (idProject))?.name }".` }
         pad      = { { bottom: "large" } }
      />
   )
})