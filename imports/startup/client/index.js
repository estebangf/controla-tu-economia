import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, red, orange, green, teal, indigo, grey, deepOrange, lightBlue } from '@material-ui/core/colors';

import AppContainer from '/imports/ui/containers/AppContainer'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red,
    appBar:{
      backgroundColor: "#337dbf",
      color: "#FFF"
    },
    cuadernos:{

    },
    saldo:{
      negativo:{
        color: red[300]
      },
      positivo:{
        color: blue[300]
      },
      peligroso: {
        color: orange[300]
      }
    },
    egresos: {
      buttonText: '#FFF',
      backgroundColor: red[300],
      buttonHover: red[700],
    },
    ingresos: {
      buttonText: '#FFF',
      backgroundColor: blue[300],
      buttonHover: blue[700],
    },
    seguimientos: {
      buttonText: '#FFF',
      backgroundColor: orange[300],
      buttonHover: orange[700],
    },
    balance: {
      buttonText: '#FFF',
      backgroundColor: green[300],
      buttonHover: green[700],
    },
    ganancias: {
      buttonText: '#FFF',
      backgroundColor: teal[300],
      buttonHover: teal[700],
    },
    fondoCombinado: "#1263ab",
    fondoIntermedio: blue[900],
    fondo: grey[50],
    fondoGraficos: grey[50],
    colorTexto: grey[900],
    text: {
      primary: grey[900],
      disabled: grey[900],
      hint: grey[900],
      secondary: grey[800],
    },
    background: {
      paper: grey[50],
      default: grey[50],
      level2: "#f5f5f5",
      level1: "#fff",
    },
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

const themeDark = createMuiTheme({
  palette: {
    primary: grey,
    secondary: deepOrange,
    appBar:{
      backgroundColor: grey[900],
      color: grey[300]
    },
    cuadernos:{

    },
    saldo:{
      negativo:{
        color: red[300]
      },
      positivo:{
        color: blue[300]
      },
      peligroso: {
        color: orange[300]
      }
    },
    egresos: {
      buttonText: grey[300],
      backgroundColor: red[300],
      buttonHover: red[700],
    },
    ingresos: {
      buttonText: grey[300],
      backgroundColor: blue[300],
      buttonHover: blue[700],
    },
    seguimientos: {
      buttonText: grey[300],
      backgroundColor: orange[300],
      buttonHover: orange[700],
    },
    balance: {
      buttonText: grey[300],
      backgroundColor: green[300],
      buttonHover: green[700],
    },
    ganancias: {
      buttonText: grey[300],
      backgroundColor: teal[300],
      buttonHover: teal[700],
    },
    fondoCombinado: grey[900],
    fondoIntermedio: grey[600],
    fondo: grey[800],
    fondoGraficos: grey[900],
    colorTexto: grey[300],
    text: {
      primary: grey[300],
      disabled: grey[300],
      hint: grey[300],
      secondary: grey[100],
    },
    background: {
      paper: grey[800],
      default: grey[800],
      level2: "#f5f5f5",
      level1: "#fff",
    },
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

function Theme() {
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
  render(Theme(), document.getElementById('react-target'));
});
