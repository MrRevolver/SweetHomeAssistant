import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';

import { rootStore } from 'store/RootStore';

import { AllRoutesRender } from 'AllRoutesRender';
import { routes } from 'routes';

import { Loader } from 'components/Common/Loader';
import { Login } from './containers/Auth/Login';

import { getLocalStorageItem } from 'utils/localStorage';
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from 'constants/globalConstants';

const ACCESS_TOKEN_EXISTS = getLocalStorageItem (
   ACCESS_TOKEN_LOCAL_STORAGE_KEY,
   null
)

const outerRoutes = routes
.filter (route => route.isOuter)
.map    (route => route.path   )

export const RouteChecker = observer (() => {
   
   const { pathname } = useLocation ()

   useEffect(() => {

      if (ACCESS_TOKEN_EXISTS) rootStore.currentUserStore.getCurrentUserData ()
   }, [])

   if (rootStore.currentUserStore.currentUserIsLoading) {
      return <Loader />
   }

   if (!rootStore.currentUserStore.currentUserExists &&
       !outerRoutes.includes (pathname)              &&
       !ACCESS_TOKEN_EXISTS) return <Navigate to = '/login' />

   return (
      <>
      
         { outerRoutes.includes(pathname) 
           ? <Login /> 
           : <AllRoutesRender /> 
         }
        
      </>
   )
})
