import React, { createContext, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';

import { Loader } from '../../Common/Loader';
import { Paragraph, Main, Heading } from 'grommet';

type ParamTypes = Partial<Record<'idProject', string>>;

export type TModal = {
   show            : boolean ;
   action?         : string  ;
   link_name?      : string  ;
   id_device?      : number  ;
   id_unitslotpin? : number  ;
   id_pinlink?     : number  ;
};

export type TPinValue = {
   device : number ;
   unit   : number ;
   pin    : number ;
   value  : number ;
};

export const EmulatorContext = createContext(null);
export const ProjectContext  = createContext(null);

export const DeviceDetailCard = observer(() => {
   const { idProject } = useParams<ParamTypes>();


   if (!idProject) {

      return (
         <Main pad = 'large'>
            <Heading>Ошибка при загрузке проекта</Heading>
            <Paragraph>Неверный идентификатор проекта</Paragraph>
         </Main>
      );

      /*    } else if (!deviceState) {

      return <Loader />; */
   } else {

      return (
         <Main>
         </Main>
      );
   }
});
