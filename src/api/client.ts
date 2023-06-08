import {
   getLocalStorageItem,
   removeLocalStorageItem,
} from "utils/localStorage";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "constants/globalConstants";
import { routes } from "routes";
import { TError } from "../models/Error";
import { toast } from "react-toastify";

class ApiClient {
   url: string;

   constructor (url = "") {
      this.url = url;
   }

   private static setHeaders (
      options: Record<string, string> = {}
   ): Record<string, string> {
      return {
         "Content-Type": "application/json",
         ...options,
      };
   }

   private static setAuthorizationHeader () {
      const accessToken = getLocalStorageItem(
         ACCESS_TOKEN_LOCAL_STORAGE_KEY,
         null
      );
      if (accessToken) {
         return {
            Authorization: `Bearer ${accessToken}`,
         };
      }
   }

   private static setBody (data?: object) {
      if (data instanceof FormData) {
         return data;
      }
      return typeof data === "object" ? JSON.stringify(data) : undefined;
   }

   public async send<T> (
      method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
      path: string,
      data?: object,
      headers?: Record<string, string>
   ): Promise<T> 
   {
      try {
         const response = await fetch(`${this.url}${path}`, {
            method,
            //credentials: 'include',
            body: ApiClient.setBody(data),
            headers: ApiClient.setHeaders({
               ...headers,
               ...ApiClient.setAuthorizationHeader(),
            }),
         });

         if (response.status == 204) {
            return;
         }

         const result = await response.json();

         if (response.status === 401) {
            removeLocalStorageItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
            const message = result?.error_text || "Что-то пошло не так...";
            toast.error(message);
            const pathname = window.location.pathname;
            const isOuterRoute = routes
            .filter((route) => route.isOuter)
            .findIndex((route) => route.path === pathname);
            if (isOuterRoute === -1) {
               window.location.replace("/login");
            }

            return Promise.reject(result);
         }

         return result;
      } catch (error: unknown) {
         this.handleError(error);
         throw error;
      }
   }

   private handleError = (error: TError | string | unknown) => {
      const message = (typeof error === "string" ? error : (error as TError)?.error_text) || "Что-то пошло не так...";
      toast.error(message);
   };
}

export const api = new ApiClient(process.env.REACT_APP_API_BASE || "");
