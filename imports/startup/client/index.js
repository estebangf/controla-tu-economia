import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, red, orange, green } from '@material-ui/core/colors';

import AppContainer from '/imports/ui/containers/AppContainer'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: '#262f3d',
      dark: '#19212b',
      contrastText: '#ffffffb3',
    },
    gastos: {
      buttonText: '#FFF',
      backgroundColor: red[300],
      buttonHover: red[700],
    },
    ingresos: {
      buttonText: '#FFF',
      backgroundColor: blue[400],
      buttonHover: blue[700],
    },
    metas: {
      buttonText: '#FFF',
      backgroundColor: orange[400],
      buttonHover: orange[700],
    },
    balance: {
      buttonText: '#FFF',
      backgroundColor: green[400],
      buttonHover: green[700],
    }
//    transparent: '#00000000'
  },
  typography: { 
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    useNextVariants: true,
    fontSize: 12,
  },
});

function DarkTheme() {
  Meteor.startup(() => {
    navigator.serviceWorker.register('/sw.js')
    .then()
    .catch(error => console.log('ServiceWorker registration failed: ', err));
  });
  
  return (
    <MuiThemeProvider theme={theme}>
      <AppContainer />
    </MuiThemeProvider>
  );
}

Meteor.startup(() => {
  render(DarkTheme(), document.getElementById('react-target'));
});
