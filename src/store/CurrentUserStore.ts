import { makeAutoObservable } from 'mobx';
import { TCurrentUser } from 'models/CurrentUser';
import { getCurrentUser } from 'api/user';

export class CurrentUserStore {
   currentUserData: TCurrentUser | null = null;
   currentUserIsLoading = false;

   constructor () {
      makeAutoObservable (this);
   }

   get currentUserExists () {
      return !!(this.currentUserData?.id_state && !this.currentUserIsLoading);
   }

   getCurrentUserData () {
      
      return getCurrentUser ()
      .then (result => {
         this.currentUserData = result;
      })
      .finally (() => {
         this.setLoading(false);
      });
   }

   clearCurrentUserData () {
      this.currentUserData = null;
   }

   setLoading = (isLoading: boolean) => {
      this.currentUserIsLoading = isLoading;
   };
}
