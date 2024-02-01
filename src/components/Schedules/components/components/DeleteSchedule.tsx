import React from 'react';

import { observer } from 'mobx-react';
import { Box, Button, Form } from 'grommet';
import { deleteSchedule } from '../hooks/useSchedule';

export const DeleteSchedule = observer ((props: { idDevice: number, idTask: number, setModal, }) => {

   return (
      <Form
         onSubmit = { () => {
            deleteSchedule (props.idDevice, props.idTask)
            props.setModal (false) 
         } }
      >
         <Box
            direction = "row"
            margin    = { { bottom: 'medium' } }
         >
            Вы уверены, что хотите удалить задачу?
         </Box>
         <Box
            direction = "row"
            justify   = 'between'
         >
            <Button
               type    = "reset"
               label   = "Отменить"
               onClick = { () => props.setModal (false) }
            />
            <Button
               primary
               type  = "submit"
               label = { 'Удалить' }
            />
         </Box>
      </Form>
   )
})