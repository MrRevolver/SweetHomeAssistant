import { removeLocalStorageItem } from "utils/localStorage";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "constants/globalConstants";
import { routes } from "routes";
import { TError } from "models/Error";

import { toast } from "react-toastify";

class ApiClient 
{
   url: string

   constructor (url = "") {
      this.url = url
   }

   public async send<T> (
      path: string,
   ): Promise<T> 
   {
      try {
         const response = await fetch ('/data/' + path + '.json')
         const result   = await response.json ()

         if  ([401, 402, 403, 404].includes (response.status)) {

            const message = result?.error_text || "Что-то пошло не так..."
            toast.error (message)

            if (response.status === 401) {
               
               removeLocalStorageItem (ACCESS_TOKEN_LOCAL_STORAGE_KEY)

               const isOuterRoute = routes
               .filter    ((route) => route.isOuter)
               .findIndex ((route) => route.path === window.location.pathname)

               if (isOuterRoute === -1) window.location.replace ("/login")
            }

            return Promise.reject (result)
         }

         return result;

      } catch (error: unknown) {
         this.handleError(error)
      }
   }

   private handleError = (error: TError | string | unknown) => {
      const message = (typeof error === "string" ? error : (error as TError)?.error_text) || "Что-то пошло не так..."
      toast.error (message)
   };
}

export const api = new ApiClient ();
