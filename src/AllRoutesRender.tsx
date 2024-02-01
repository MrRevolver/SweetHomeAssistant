import React, { FC } from 'react';

import { Route, Routes, Outlet } from 'react-router-dom';
import { LayoutForInnerRoute } from 'layouts/LayoutForInnerRoute';

import { ProjectsTable } from 'components/Main/ProjectsTable';
import { SettingComponent } from 'components/User/Setting';
import { Page404 } from 'components/Common/Page404';
import { ControlPanel } from 'components/ControlPanel';

export const AllRoutesRender: FC = () => {

   return (

      <Routes>

         <Route
            path    = ''
            element = { <LayoutForInnerRoute /> }
         >
            <Route
               path    = '/'
               element = { <ProjectsTable /> } 
            />

            <Route
               path    = '/projects'
               element = { <Outlet /> }
            >
               <Route
                  path    = ':idProject'
                  element = { <Outlet /> }
               >
                  <Route
                     index
                     element = { <ControlPanel /> } 
                  />
               </Route>
            </Route>

            <Route
               path = '/setting'
               element = { <SettingComponent /> } 
            />

         </Route>
         
         <Route
            path    = '*'
            element = { <Page404 /> } 
         />

      </Routes>
   );
};
