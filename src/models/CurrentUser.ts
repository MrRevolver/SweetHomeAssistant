export type TCurrentUser = {
   error_text?  : string;
   id_state     : number;
   email?       : string;
   phone        : string;
   name         : string;
   dset         : string;
};

export type TFormEditCurrentUserData = {
   email?: string;
   phone : string;
   name  : string;
};
