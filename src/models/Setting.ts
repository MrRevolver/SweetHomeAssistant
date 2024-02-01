export type TDeviceSetting = {
   error_text?       : string,
   id_device         : number,
   dsettings         : string,
   ddeliveredsettings: string,
   settings          : {
      Schedule: TTask[]
   }
}


export type TTask = {
   Id           : number,
   IsEnable     : boolean, // Признак, разрешен или запрещен элемент расписания
   DStart       : string,
   Interval     : number
   EveryDay?    : number,
   EveryWeek?   : number,
   WeekDays?    : number[],
   Action       : number, 
   Command?     : number,
   FunctionName?: string,
   EventName?   : string,
   Value?       : number
}

//Interval:
//0 - однократно;
//1 - ежедневно;
//2 - еженедельно;
//3 - ежемесячно;

// Action:
//0 - команда;
//1 - функция;
//2 - событие;