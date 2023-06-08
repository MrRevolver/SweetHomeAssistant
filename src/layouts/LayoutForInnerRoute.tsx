import React, { FC } from "react";
import { NavigationList } from "components/Navigation/NavigationList";
import { Outlet } from "react-router-dom";

export const LayoutForInnerRoute: FC = () => {
   return (
      // @ts-ignore
      <NavigationList>
         <Outlet />
      </NavigationList>
   );
};
