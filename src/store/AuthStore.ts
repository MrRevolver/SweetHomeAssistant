import { TAuthRequest } from "models/Auth";
import { makeAutoObservable } from "mobx";
import { postAuth } from "api/auth";
import {
   getLocalStorageItem,
   removeLocalStorageItem,
   setLocalStorageItem,
} from "utils/localStorage";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "constants/globalConstants";
import { rootStore } from "store/RootStore";

export class AuthStore {
   loading = false;

   constructor () {
      makeAutoObservable(this);
   }

   login (formData: TAuthRequest) {
      this.setLoading(true);
      return postAuth(formData)
      .then((result) => {
         setLocalStorageItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, result.token);

         if (getLocalStorageItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, null)) {
            rootStore.currentUserStore.getCurrentUserData();
         }
      })
      .finally(() => {
         this.setLoading(false);
      });
   }

   logout () {
      removeLocalStorageItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
   }

   setLoading = (isLoading: boolean) => {
      this.loading = isLoading;
   };
}
