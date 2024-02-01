export const generateUID = (array): number => {
   //return (((1 + Math.random ()) * 0x10000) | 0).toString (16).substring (1);   // for String

   const n  = (((1 + Math.random ()) * 0x10000) | 0).toString ()
   const id = parseInt (n.slice (n.length - 4))
   
   if (array?.includes (schedule => schedule.Id_Schedule == id)) generateUID (array)
   else return id
}