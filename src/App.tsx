import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Grommet } from 'grommet';
import { RouteChecker } from 'RouteChecker';
import { theme } from './Theme';
import { themeStore } from './store/ThemeStore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const GrommetStyled = styled(Grommet)`
   overflow-x: hidden;
`;

const App = observer(() => {
   return (
      <BrowserRouter>
         <ToastContainer
            position = 'top-center'
            autoClose = { 3000 }
            draggable = { false }
            theme = { themeStore.themeMode }
         />
         <GrommetStyled
            full
            theme = { theme }
            themeMode = { themeStore.themeMode }>
            <RouteChecker />
         </GrommetStyled>
      </BrowserRouter>
   );
});

export default App;
