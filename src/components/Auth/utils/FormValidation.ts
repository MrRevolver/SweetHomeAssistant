export const maskPhone = [
   
   { fixed: '+' },
   {
      length: 1,
      regexp: /^[0-9]{1,2}$/,
      placeholder: 'xx',
   },
   { fixed: ' (' },
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
      regexp: new RegExp('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\'^£$%&*()}{@#~?><>,|=_+¬-]).{5,}'),
      message: 'Требования к паролю не соблюдены',
   }

export const passwordRulesStrong = [
   {
      regexp: new RegExp('.{1,}'),
      message: 'Поле должно быть заполнено',
   },
   {
      regexp: new RegExp('.{5,}'),
      message: 'Пароль должен содержать не менее 5 знаков',
   },
   /* {
      regexp: new RegExp('(?=.*?[\'^£$%&*()}{@#~?><>,|=_+¬-])'),
      message: 'Пароль должен содержать специальные символы',
   },
   {
      regexp: new RegExp('(?=.*?[0-9])'),
      message: 'Пароль должен содержать минимум 1 цифру',
   },
   {
      regexp: new RegExp('(?=.*?[a-z])'),
      message: 'Пароль должен содержать символы в нижнем регистре',
   },
   {
      regexp: new RegExp('(?=.*?[A-Z])'),
      message: 'Пароль должен содержать символы в верхнем регистре',
   }, */
]