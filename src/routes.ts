import React from 'react';
import { Login } from 'containers/Auth/Login';
import { Main } from 'containers/Main/Main';
import { DeviceTable } from 'components/Devices/DevicesTable';
import { Page404 } from 'components/Common/Page404';
import { DeviceDetailCard } from 'components/Devices/DeviceDetailCard/DeviceDetailCard';

export type TRoute = {
   path: string;
   component: React.ComponentType;
   isOuter?: boolean;
};

export type TRoutes = TRoute[];

export const routes: TRoutes = [
   {
      path: '/',
      component: Main,
   },
   {
      path: '/login',
      component: Login,
      isOuter: true,
   },
   {
      path: '/devices',
      component: DeviceTable,
   },
   {
      path: '/devices/:idDevice',
      component: DeviceDetailCard,
   },
   { path: '*', component: Page404 },
];
