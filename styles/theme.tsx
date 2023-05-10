import { createTheme } from '@mui/material';

export const themeBasic = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#26116c',
    },
    secondary: {
      main: '#d80202',
    },
    success: {
      main: '#009688',
    },
    info: {
      main: '#0091ea',
    },
    warning: {
      main: '#ffab40',
    },
    error: {
      main: '#ec407a',
    },
    background: {
      default: '#cccccc',
      paper: '#ffffff',
    },
  },
});
