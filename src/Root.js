import { useEffect } from "react";
import {ThemeProvider, CssBaseline, createTheme} from "@mui/material";
import App from './App';
import { RecoilRoot } from 'recoil';
import { HashRouter as Router } from "react-router-dom";

const muiThemePaletteKeys = [
  "background",
  "common",
  "error",
  "grey",
  "info",
  "primary",
  "secondary",
  "success",
  "text",
  "warning",
];


export default function Root() {
    
        // Create a theme instance.
        const theme = createTheme({
          typography: {
            fontFamily: ["Pretendard-Regular"]
          },
          palette: {
            primary: {
              main: '#f50057',
              contrastText: "#fff"
            },
          }
        });

        useEffect(() => {
          const r = document.querySelector(':root');
          
          muiThemePaletteKeys.forEach((paletteKey) => {
            const themeColorObj = theme.palette[paletteKey];
            
            for ( const key in themeColorObj ) {
              if (Object.hasOwnProperty.call(themeColorObj, key)) {
                const colorVal = themeColorObj[key];
                r.style.setProperty(`--mui-color-${paletteKey}-${key}`, colorVal);
              }
            }
          });
        }, []);

        return (
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RecoilRoot>
              <Router>
                <App />
              </Router>
            </RecoilRoot>           
          </ThemeProvider>
        );
        

}