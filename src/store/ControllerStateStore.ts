import { makeAutoObservable } from "mobx";
import { errorHandler       } from "utils/errorHandler";
import { getControllerState, setControllerCommand } from "api/controller";
import { TControllerState, TStateRequestResult } from "models/ControllerState";
import { rootStore } from "./RootStore";
import { toast } from "react-toastify";
import { deviceStore } from "./DeviceStore";

class ControllerStateStore {

   loading = false
   state:  TControllerState[] = []
   intervals = []
   idProject
   params

   constructor () { 
      makeAutoObservable (this) 
   }

   async getState (idProject: number) {

      this.setLoading (true)
      
      try {
         if (this.idProject != idProject) {

            this.idProject = idProject
            this.intervals
            .forEach (interval => {
               clearInterval (interval)
            });
            
            this.state = []
         }

         deviceStore.devices
         .forEach (device => {
            this.getStateCommand (device.alias)
            if (this.state.some (state => state.alias === device.alias)) this.setInterval (device.alias)
         })
      }
      catch (err) {
         if (!err.error_text) errorHandler (err)
         this.setLoading (false)
      }
   }

   setInterval (alias) {
      this.intervals[alias] = setInterval (async () => {
         if (rootStore.currentUserStore.currentUserData && /device/.test (this.params) ) {
            this.getStateCommand (alias)
         } else return clearInterval (this.intervals[alias])
      }, (10000));
   }

   async getStateCommand (alias) {

      try {
         const state = await getControllerState (alias)
         this.setControllerState (state)
      }
      catch {this.setLoading (false)}
   }

   setControllerState (controllerState: TStateRequestResult) {

      if (controllerState?.code == 0) {
         this.state = [...this.state,  ...controllerState.data]
      } else errorHandler (controllerState.message);

      this.setLoading (false)
   }

   async setControllerCommand (alias: string, command: number, value: number) {

      const result = await setControllerCommand (
         alias,
         command, 
         value,
      )
      
      if (result.code == 0) toast.success (result.message)
      else                  toast.error   (result.message)

      await new Promise (resolve => setTimeout (resolve, 600));
      this.getStateCommand (alias)
   }

   setLoading (isLoading: boolean) {
      this.loading = isLoading
   }

   setParams (params) {
      this.params = params
   }
}

export const controllerStateStore = new ControllerStateStore ()