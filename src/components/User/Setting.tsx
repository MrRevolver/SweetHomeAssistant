import React, { useState } from "react";


import { Box, Button, Layer, Paragraph } from "grommet";
import { Loader } from "../Common/Loader";
import { rootStore } from "store/RootStore";
import { ChangePassword } from "components/Auth/ChangePassword";

export const SettingComponent = () => {

   const user = rootStore.currentUserStore.currentUserData;

   const [showForgotPassword, setShowForgotPassword] = useState (false);

   const onClose = () => {
      setShowForgotPassword (false);
   }

   const onForgotPassword = () => {
      setShowForgotPassword (true);
   }

   return (

      <Box
         fill
         pad    = "medium"
         margin = "medium"
         style  = { { borderBottom: "1px solid #dfe4ec" } }
      >
         { user 
           ? (<>
              { /*<UserButtons
                  id_device={user.id_state}
               />*/ }
              <Paragraph>

                 { user.name  && <><b>Имя:          </b> { user.name                            }<br /></> }
                 { user.email && <><b>Еmail:        </b> { user.email                           }<br /></> }
                 { user.phone && <><b>Телефон:      </b> { user.phone                           }<br /></> }
                 { user.dset  && <><b>Дата создания:</b> { new Date(user.dset).toLocaleString() }<br /></> }
                 
              </Paragraph>

              <Box
                 width = "300px"
              >
                 <Button
                    label    = "Сменить пароль"
                    onClick = { onForgotPassword }
                 />

                 { showForgotPassword && (

                    <Layer
                       modal
                       onClickOutside = { onClose }
                       onEsc          = { onClose }
                    >
                       <ChangePassword
                          onClose = { onClose }
                       />
                    </Layer>

                 ) }
              </Box>
           </>)
          : <Loader  />
         }
      </Box>
   )
};