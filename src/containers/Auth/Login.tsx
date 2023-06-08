import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react";
import { LoginComponent } from "components/Auth/Login";
import { rootStore } from "store/RootStore";

export const Login: FC = observer(() => {
   if (rootStore.currentUserStore.currentUserExists) {
      return <Navigate to = "/" />;
   }

   return <LoginComponent />;
});
