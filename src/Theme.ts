export const theme = {
   global: {
      size: {
         xxsmall: '48px',
         xsmall: '192px',
         small: '240px',
         medium: '384px',
         large: '768px',
         xlarge: '1152px',
         xxlarge: '1536px',
         full: '100%',
      },
      colors: {
         brand: {
            dark: '#005d8f', //"#4f1b77",
            light: '#005d8f',
         },
         baseBackground: {
            dark: '#005d8f', //"#7700cc",
            light: '#005d8f', //"#50a1e3",
         },
         buttonDelete: {
            dark: '#F08080',
            light: '#F08080',
         },
         background: {
            dark: '#111111',
            light: '#FFFFFF',
         },
         backgroundRevers: {
            dark: '#FFFFFF',
            light: '#111111',
         },
         backgroundSideBar: {
            dark: '#2d2d2d',
            light: '#005d8f', //"#efefef",
         },
         backgroundCardHover: {
            dark: '#005d8f', //"#6FFFB0",
            light: '#005d8f',
         },
         'background-back': {
            dark: '#222222',
            light: '#EEEEEE',
         },
         'background-front': {
            dark: '#222222',
            light: '#FFFFFF',
         },
         'background-contrast': {
            //dark: "#FFFFFF11",
            //light: "#11111111",
         },

         light: '#fff',
         dark: '#121212',
         info: '#3498db',
         success: '#07bc0c',
         warning: '#f1c40f',
         error: '#e74c3c',

         text: {
            dark: '#EEEEEE',
            light: '#333333',
         },
         'text-strong': {
            dark: '#FFFFFF',
            light: '#000000',
         },
         'text-weak': {
            dark: '#CCCCCC',
            light: '#444444',
         },
         'text-xweak': {
            dark: '#999999',
            light: '#666666',
         },
         border: {
            dark: '#444444',
            light: '#CCCCCC',
         },
      },
      font: {
         family: `-apple-system,
         BlinkMacSystemFont, 
         "Segoe UI", 
         Roboto, 
         Oxygen, 
         Ubuntu, 
         Cantarell, 
         "Fira Sans", 
         "Droid Sans",  
         "Helvetica Neue", 
         Arial, sans-serif,  
         "Apple Color Emoji", 
         "Segoe UI Emoji", 
         "Segoe UI Symbol"`,
      },
      layer: {
         background: {
            dark: '#111111',
            light: '#FFFFFF',
         },
      },
      elevation: {
         dark: {
            none: 'none',
            // You can override the values for box-shadow here.
            /*
            xsmall: '0px 2px 2px rgba(255, 255, 255, 0.40)',
            small: '0px 4px 4px rgba(255, 255, 255, 0.40)',
            medium: '0px 6px 8px rgba(255, 255, 255, 0.40)',
            large: '0px 8px 16px rgba(255, 255, 255, 0.40)',
            xlarge: '0px 12px 24px rgba(255, 255, 255, 0.40)',
            */
            small: 'none',
         },
      },
   },
   text: {
      inter: {
         size: '15px',
         height: '20px',
      },
   },
   tip: {
      content: {
         background: 'black',
      },
   },
   button: {
      padding: {
         horizontal: '12px',
         vertical: '4px',
      },
      border: {
         radius: '4px',
      },
   },
};
