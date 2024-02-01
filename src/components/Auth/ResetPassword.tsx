import React, { useState } from 'react';

import {
   Box,
   Button,
   Form,
   FormField,
   Heading,
   MaskedInput,
   Text,
} from 'grommet';

import { Close } from 'grommet-icons';
import { maskPhone, phoneValidation } from './utils/FormValidation';

export const ResetPassword = (props: { 
   onClose: () => void, 
   phone     : string 
}) => {

   const [formValues, setFormValues] = useState ({ resetPhone: props.phone });

   const onSubmit = () => {

      // Логика здесь. TODO: Декомпозировать в hook

      props.onClose();
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
               icon      = { <Close /> }
               onClick   = { props.onClose }
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
               onSubmit = { onSubmit }
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
                 
                  <Text size = "small">
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