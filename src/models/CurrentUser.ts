export type TCurrentUser = {
   error_text?  : string;
   id_state     : number;
   email        : string;
   phone        : string;
   name         : string;
   dset         : string;
   isadmin      : number;
   id_workspace : number;
   workspacename: string;
};

export type TFormEditCurrentUserData = {
   email: string;
   phone: string;
   name : string;
};
