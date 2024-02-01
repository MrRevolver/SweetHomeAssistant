import { makeAutoObservable } from "mobx";

class ThemeStore {
   themeMode?: "dark" | "light";

   constructor () {
      makeAutoObservable(this);
      const theme = window.localStorage.getItem("theme");
    theme !== null
      ? (this.themeMode = theme as "light" | "dark")
      : this.browserThemeSelect();
   }

   setLight () {
      localStorage.setItem("theme", "light");
      this.themeMode = "light";
   }

   setDark () {
      localStorage.setItem("theme", "dark");
      this.themeMode = "dark";
   }

   browserThemeSelect () {
      this.themeMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
   }
}

export const themeStore = new ThemeStore();
