import React from 'react';

import { Box, FormField } from 'grommet';
import { Phone } from 'grommet-icons';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'

export const InputPhone = (props: {formValues, setFormValues}) => {

   const {
      formValues,
      setFormValues
   } = props

   return (
      <FormField
         label     = "Номер телефона"
         name      = "phone"
         className = "form__input"
         htmlFor   = "phone-sign-in"
         style = { {
            position: 'relative',
            display : 'block'
         } }
      >
         <Box
            style = { {
               position: 'absolute',
               display : 'flex',
               top     : '50%',
               pointerEvents: 'none',
               right   : '12px'
            } }
         >
            <Phone />
         </Box>
                        
         <PhoneInput
            buttonStyle = { {
               top       : '-3px',
               background: 'none',
               border    : 'none',
            } }
            inputStyle = { {
               background: 'none',
               border    : 'none',
               height    : 'inherit',
               width     : 'inherit',
               padding   : '11px 48px',
               fontFamily: 'inherit',
               fontSize  : 'inherit',
            } }
            searchStyle = { {
               fontSize  : 'inherit',
               lineHeight: 'inherit',
               margin    : '0',
               padding   : '11px',
               width     : '98%'
            } }
            enableSearch
            disableSearchIcon
            searchPlaceholder = 'Поиск'
            searchNotFound    = 'Ничего не найдено'
            placeholder       = '0 (000) 000-0000'
            country           = { 'ru' }
            value             = { formValues.phone }
            onChange          = { phone => setFormValues ({ ...formValues, phone: phone }) }
            inputProps = { {
               id       : 'phone-sign-in',
               name     : 'phone',
               required : true,
               autoFocus: true
            } }
         />
      </FormField>
   )
}