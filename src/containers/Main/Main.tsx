import React, { FC } from "react";
import { observer } from "mobx-react";
import { MainComponent } from "components/Main/Main";

export const Main: FC = observer(() => {
   return <MainComponent />;
});
