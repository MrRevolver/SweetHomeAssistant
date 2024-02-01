export type TControllerState =  {
   type?: number,
   size?: number,
   data?: string,
   alias: string,
   name : string,
   value: number,
}

export type TStateRequestResult = {
   error_text?: string,
   code       : number,
   message?   : string,
   data?      : TControllerState[],
}