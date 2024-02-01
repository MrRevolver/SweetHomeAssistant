import React, { useState } from 'react';

import {
   Box,
   Button,
   Form,
   FormField,
   Header,
   Heading,
   TextInput,
} from 'grommet';
import { Close } from 'grommet-icons';

import { changeUserPassword } from 'api/user';
import { toast } from 'react-toastify';
import { passwordRulesStrong } from './utils/FormValidation';

export const ChangePassword = (props: {onClose: () => void}) => {

   const [formValues, setFormValues] = useState ({
      currentPassword: '',
      newPassword    : '',
      confirmPassword: '',
   });

   const onSubmit = async () => {

      const result = await changeUserPassword ({
         currentPassword: formValues.currentPassword,
         newPassword    : formValues.newPassword
      })

      if (!result?.error_text) toast.success ('Ваш пароль успешно обновлён')
      props.onClose()
   };

   const confirmPassword = () => {
      const doesMatch = formValues.newPassword === formValues.confirmPassword;
      return doesMatch
      ? undefined
      : { message: 'Пароли не совпадают', status: 'error' }
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
            gap   = "medium"
            width = "medium"
         >
            <Header
               direction = "column"
               align     = "center"
               gap       = "xxsmall"
               pad       = { { horizontal: 'xxsmall' } }
            >
               <Heading
                  level  = { 2 }
                  margin = "none"
               >
                  Сменить пароль
               </Heading>
            </Header>
            <Box
               pad = { { horizontal: 'xxsmall' } }
            >
               <Form
                  validate = "blur"
                  value    = { formValues }
                  onChange = { setFormValues }
                  onSubmit = { onSubmit }
                  method   = "post"
               >
                  <FormField
                     htmlFor  = "currentPassword"
                     name     = "currentPassword"
                     label    = "Текущий пароль"
                     validate = { {
                        regexp: new RegExp('.{1,}'),
                        message: 'Поле должно быть заполнено',
                     } }
                  >
                     <TextInput
                        id          = "currentPassword"
                        name        = "currentPassword"
                        placeholder = "Введите текущий пароль"
                        type        = "password"
                     />
                  </FormField>
                  <FormField
                     htmlFor  = "newPassword"
                     name     = "newPassword"
                     label    = "Новый пароль"
                     validate = { passwordRulesStrong }
                  >
                     <TextInput
                        id          = "newPassword"
                        name        = "newPassword"
                        placeholder = "Введите новый пароль"
                        type        = "password"
                     />
                  </FormField>
                  <FormField
                     htmlFor  = "confirmPassword"
                     name     = "confirmPassword"
                     label    = "Подтвердите пароль"
                     validate = { confirmPassword }

                  >
                     <TextInput
                        id          = "confirmPassword"
                        name        = "confirmPassword"
                        placeholder = "Подтвердите новый пароль"
                        type        = "password"
                     />
                  </FormField>
                  <Box
                     margin = { { 
                        top   : 'medium',
                        bottom: 'small' 
                     } }
                  >
                     <Button
                        primary
                        fill
                        label = "Обновить пароль"
                        type = "submit" />
                  </Box>
               </Form>
            </Box>
         </Box>
      </>
   );
};