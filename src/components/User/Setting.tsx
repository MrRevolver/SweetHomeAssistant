import React from "react";


import { Box, Paragraph } from "grommet";
import { Loader } from "../Common/Loader";
import { Page404 } from "../Common/Page404";
import { rootStore } from "store/RootStore";

export const SettingComponent = () => {

   const user = rootStore.currentUserStore.currentUserData;

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

                 <b>Имя:          </b> { user.name                            }<br />
                 <b>Дата создания:</b> { new Date(user.dset).toLocaleString() }<br />
                 <b>Еmail:        </b> { user.email                           }<br />
                 <b>Телефон:      </b> { user.phone                           }<br />
                 
              </Paragraph>
           </>)
          : <Loader  />
         }
      </Box>
   )
};