import React, { useState } from "react";
import { observer } from "mobx-react";
import { rootStore } from "store/RootStore";

import {
   Form,
   FormField,
   Button,
   Box,
   TextInput,
   CheckBox,
   Anchor,
   Text,
   Heading,
   Layer
} from "grommet";
import { CircleAlert, Key } from "grommet-icons";

import { HeaderComponent } from "../Common/Header";
import { InputPhone } from "./components/InputPhone";

import { ResetPassword } from "./ResetPassword";

//import { maskPhone, phoneValidation } from './utils/FormValidation';

type TLoginFormData = {
   phone   : string;
   password: string;
};

export const LoginComponent = observer(() => {

   const [formValues, setFormValues] = useState({
      phone   : '',
      password: '',
   });

   const [showForgotPassword, setShowForgotPassword] = useState(false);
   //const [password, setPassword] = useState ('');
   const [credentialError/* , setCredentialError */] = useState (false);

   const onClose          = () => setShowForgotPassword (false)
   const onForgotPassword = () => setShowForgotPassword (true)
   const submitLoginForm  = (formData: TLoginFormData) => {
      rootStore.authStore.login (formData);
   }
   /*    const setPhone = e => {
      setFormValues ({ ...formValues, phone: e.target.value })
   } */

   return (

      <div className = "main-layout">

         <HeaderComponent />
         <>
            <Box
               fill
               align   = "center"
               justify = "center"
               margin  = { { top: "large" } }
            >

               <Heading
                  level  = { 2 }
                  margin = "none"
               >
                  Авторизация
               </Heading>

               <Box
                  width  = "medium"
                  margin = "large"
                  pad    = "small"
               >
                  <Form
                     validate  = "blur"
                     value     = { formValues }
                     name      = "basic"
                     className = "form"
                     messages  = { {
                        required: 'Это поле должно быть заполнено',
                     } }
                     onChange  = { setFormValues }
                     onSubmit  = { (event) => {
                        submitLoginForm (event.value as TLoginFormData);
                     } }
                  >
                     
                     <InputPhone
                        formValues    = { formValues }
                        setFormValues = { setFormValues }
                     />

                     <FormField
                        label     = "Пароль"
                        name      = "password"
                        className = "form__input"
                        required  = { { indicator: false } }
                        htmlFor   = "password-sign-in"
                     >
                        <TextInput
                           reverse
                           id   = "password-sign-in"
                           name = "password"
                           type = "password"
                           placeholder = "Введите пароль"
                           icon = { <Key /> }
                        />
                     </FormField>

                     <Box
                        direction = "row"
                        justify   = "between"
                        margin    = { { top: "small", left: "small" } }
                     >
                        <CheckBox
                           id    = "remember-me"
                           name  = "rememberMe"
                           label = "Запомните меня" 
                        />
                     </Box>

                     { credentialError && (

                        <Box
                           animation  = "fadeIn"
                           align      = "center"
                           background = "validation-critical"
                           direction  = "row"
                           gap        = "xsmall"
                           margin     = { { top: 'medium', bottom: 'medium' } }
                           pad        = "small"
                           round      = "4px"
                        >
                           <CircleAlert size = "small" />
                           <Text size = "xsmall">Недействительные учетные данные</Text>
                        </Box>

                     ) }

                     <Box
                        direction = "row"
                        justify   = "between"
                        margin    = { { top: "large" } }
                     >
                        <Button
                           primary
                           fill
                           label   = "Войти"
                           type    = "submit"
                           justify = "center"
                        />
                     </Box>

                  </Form>

                  <Box
                     align  = "center"
                     margin = { { top: 'small' } }
                  >
                     <Anchor
                        label   = "Восстановление пароля"
                        onClick = { onForgotPassword } 
                     />

                     { showForgotPassword && (

                        <Layer
                           modal
                           onClickOutside = { onClose }
                           onEsc          = { onClose }
                        >
                           <ResetPassword
                              onClose = { onClose }
                              phone   = { formValues.phone }
                           />
                        </Layer>

                     ) }
                  </Box>
               </Box>
            </Box>
         </>
      </div>
   );
});
