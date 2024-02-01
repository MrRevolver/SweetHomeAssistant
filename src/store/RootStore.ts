import { makeAutoObservable } from "mobx";
import { AuthStore } from "store/AuthStore";
import { CurrentUserStore } from "store/CurrentUserStore";


class RootStore {
   authStore        = new AuthStore ();
   currentUserStore = new CurrentUserStore ()

   constructor () {
      makeAutoObservable(this);
   }
}

export const rootStore = new RootStore();
