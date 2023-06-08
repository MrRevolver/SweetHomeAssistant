export const maskPhone = [
   
   { fixed: '+7' },
   { fixed: ' ' },
   { fixed: '(' },
   {
      length: 3,
      regexp: /^[0-9]{1,3}$/,
      placeholder: 'xxx',
   },
   { fixed: ')' },
   { fixed: ' ' },
   {
      length: 3,
      regexp: /^[0-9]{1,3}$/,
      placeholder: 'xxx',
   },
   { fixed: '-' },
   {
      length: 4,
      regexp: /^[0-9]{1,4}$/,
      placeholder: 'xxxx',
   },

];

export const phoneValidation =
   {
      regexp: new RegExp('^(\\+7|7|8)?[\\s\\-]?\\(?[489][0-9]{2}\\)?[\\s\\-]?[0-9]{3}[\\s\\-]?[0-9]{2}[\\s\\-]?[0-9]{2}$'),
      message: 'Введите зарегистрированный номер телефона.',
   }

export const passwordRequirements =
   {
      regexp: new RegExp('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$ %^&*-]).{8,}'),
      message: 'Password requirements not met.',
      status: 'error',
   }

export const passwordRulesStrong = [
   {
      regexp: new RegExp('(?=.*?[A-Z])'),
      message: 'One uppercase letter',
      status: 'error',
   },
   {
      regexp: new RegExp('(?=.*?[a-z])'),
      message: 'One lowercase letter',
      status: 'error',
   },
   {
      regexp: new RegExp('(?=.*?[#?!@$ %^&*-])'),
      message: 'One special character',
      status: 'error',
   },
   {
      regexp: new RegExp('.{8,}'),
      message: 'At least 8 characters',
      status: 'error',
   },
];