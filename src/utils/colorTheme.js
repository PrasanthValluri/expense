import { createMuiTheme } from "@material-ui/core";

export const defaultMaterialTheme = createMuiTheme({
  palette: {
    type:'dark',
    primary: {
      // light: '#bfe3e4',
      light: '#f9813a',
      // main: '#65BCBF',
      main:'#f9813a',
      // dark: '#307274',
      dark:'#f9813a',
      contrastText: '#fff'
    },
    secondary: {
      main: '#fff',
      // contrastText: '#fff'
    },
  },
});

export const datePickerExpense = createMuiTheme({
  palette: {
    type:'dark',
    primary: {
      // main: '#f8777d',
      main:'#f9813a',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff',
      // contrastText: '#fff'
    },
  },
});


export const whiteTheme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgba(255, 255, 255, 1)',
      // contrastText: '#65BCBF'
      contrastText: '#ffffff'
    },
    secondary: {
      main: 'rgba(255, 255, 255, 0.7)',
      contrastText: '#fff'
    },
  },
});