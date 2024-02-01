import React from "react";
import { observer } from "mobx-react";

import { themeStore } from "store/ThemeStore";

import { Button } from "grommet";
import { Moon, Sun } from "grommet-icons";
import "./css/ThemeSwitchButton.css"

export const ThemeSwitchButton = observer(() => {

   return themeStore.themeMode == "light" 
   ? (
      <Button 
         icon = { <Moon
            className = "themeIcon"
            style = { {
               width: 30,
               height: 30
            } }
         /> } 
         onClick = { () => themeStore.setDark() } 
      />
   ) 
   : (
      <Button 
         icon = { <Sun
            className = "themeIcon"
            style = { {
               width: 30,
               height: 30
            } }
         /> } 
         onClick = { () => themeStore.setLight() } 
      />
   )
});
