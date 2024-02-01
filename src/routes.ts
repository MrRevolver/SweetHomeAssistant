import React from 'react';

import { Login } from 'containers/Auth/Login';
import { Main } from 'containers/Main/Main';
import { Page404 } from 'components/Common/Page404';
import { ControlPanel } from 'components/ControlPanel';

export type TRoute = {
   path     : string;
   component: React.ComponentType;
   isOuter? : boolean;
};

export type TRoutes = TRoute[];

export const routes: TRoutes = [
   {
      path     : '/login',
      component: Login,
      isOuter  : true,
   },
   {
      path     : '/',
      component: Main,
   },
   {
      path     : '/projects/:IdProject',
      component: ControlPanel,
   },
   {
      path     : '*',
      component: Page404
   },
];
