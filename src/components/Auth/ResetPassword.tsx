import React, { useState } from 'react';

import {
   Box,
   Button,
   Form,
   FormField,
   Heading,
   MaskedInput,
   Text,
   TextInput,
} from 'grommet';
import { Close } from 'grommet-icons';
import { maskPhone, phoneValidation } from './utils/FormValidation';

export const ResetPassword = ({ closeLayer, phone }) => {

   const [formValues, setFormValues] = useState ({ resetPhone: phone });

   // eslint-disable-next-line no-unused-vars
   const onSubmit = ({ value, touched }) => {

      // Your password reset logic here

      closeLayer();
   };

   return (
      <>
         <Box
            direction = "row"
            justify   = "end"
            pad       = { { horizontal: 'small', top: 'small' } }
         >
            <Button
               a11yTitle = "Закрыть форму"
               icon    = { <Close /> }
               onClick = { closeLayer }
            />
         </Box>

         <Box
            gap    = "small"
            margin = { { bottom: 'large' } }
            width  = "medium"
            pad    = "small"
            align  = "center"
         >
            <Heading
               level = { 2 }
               margin = "none"
            >
               Сбросить пароль
            </Heading>

            <Form
               validate = "blur"
               value    = { formValues }
               onChange = { setFormValues }
               onSubmit = { ({ value, touched }) => onSubmit({ value, touched }) }
               method   = "post"
               messages = { {
                  required: 'Это поле должно быть заполнено',
               } }
            >
               <Box gap = "medium">

                  <FormField
                     label    = "Введите зарегистрированный телефона"
                     name     = "resetPhone"
                     htmlFor  = "resetPhone"
                     required = { { indicator: false } }
                     validate = { phoneValidation }
                     
                  >
                     <MaskedInput
                        id   = "resetPhone"
                        name = "resetPhone"
                        type = "phone"
                        mask = { maskPhone }
                     />
                     
                  </FormField>
                 
                  <Text
                     size = "small"
                  >
                     Новый пароль будет отправлен в SMS 
                  </Text>

                  <Button
                     primary
                     label = "Отправить новый пароль"
                     type  = "submit" />
               </Box>
            </Form>
         </Box>
      </>
   );
}