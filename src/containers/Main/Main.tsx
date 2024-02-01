import React, { FC } from "react";
import { observer } from "mobx-react";
import { ProjectsTable } from "components/Main/ProjectsTable";

export const Main: FC = observer (() => {
   return <ProjectsTable />;
});
