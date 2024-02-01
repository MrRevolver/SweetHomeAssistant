import React from 'react';
import { Loader } from 'components/Common/Loader';
import { observer } from 'mobx-react';

type TControlProps = {
   disabled: boolean,
   children: JSX.Element,
};

export const ControlFabric = observer ((props: TControlProps) => {

   if (props.disabled) return <Loader size = 'small' />
   else                return props.children
})