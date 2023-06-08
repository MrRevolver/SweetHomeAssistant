export type TAuthResponse = {
   error_text?: string,
   token: string,
};

export type TAuthRequest = {
   phone   : string,
   password: string,
};
