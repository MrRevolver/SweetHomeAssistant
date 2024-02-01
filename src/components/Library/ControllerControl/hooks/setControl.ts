import { toast } from "react-toastify";
import { controlPanelStore } from "store/ControlPanelStore";
import { controllerStateStore } from "store/ControllerStateStore";

type TControlValue = {
   name   : string,
   command: number,
   value  : number
}

export const setControl = (control: TControlValue, setDisabled) => {

   if (control) {

      const value = control?.value ?? 
      controlPanelStore.getControlBlockOption    (control?.command)?.state ?? 
      controlPanelStore.getIndicationBlockOption (control?.command)?.state
      let timer   = true
      setDisabled (true)

      setTimeout (() => timer = false, 10000)

      const toastId    = toast.loading ('Ждём ответа контроллера')
      const intervalId = setInterval (() => {

         if (controllerStateStore.state.find (state => state.name == control?.name)?.value == value) {

            toast.update (toastId, { render: "Значение изменено", type: "success", isLoading: false,autoClose: 1000 })
            setDisabled (false)
            return clearInterval (intervalId)
         }
         else if (timer === false) {

            setDisabled (false)
            toast.update (toastId, { render: "Контроллер не изменил значение", type: "error", isLoading: false, autoClose: 1000 })
            return clearInterval (intervalId)
         }
      }, 1000)
   }
}