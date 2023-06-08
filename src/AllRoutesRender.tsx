import React, { FC } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import { LayoutForInnerRoute } from 'layouts/LayoutForInnerRoute';
import { MainComponent } from 'components/Main/Main';
import { SettingComponent } from 'components/User/Setting';
import { Page404 } from 'components/Common/Page404';
import { DeviceDetailCard } from 'components/Devices/DeviceDetailCard/DeviceDetailCard';

export const AllRoutesRender: FC = () => {

   return (

      <Routes>

         <Route
            path    = ''
            element = { <LayoutForInnerRoute /> }
         >

            <Route
               path    = '/'
               element = { <MainComponent /> } 
            />

            <Route
               path    = '/device'
               element = { <Outlet /> }
            >
               <Route
                  path    = ':idDevice'
                  element = { <Outlet /> }
               >
                  <Route
                     index
                     element = { <DeviceDetailCard /> } 
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
