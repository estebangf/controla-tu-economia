import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import AppContainer from '/imports/ui/containers/AppContainer'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: '#262f3d',
      dark: '#19212b',
      contrastText: '#ffffffb3',
    },
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
  return (
    <MuiThemeProvider theme={theme}>
      <AppContainer />
    </MuiThemeProvider>
  );
}

Meteor.startup(() => {
  render(DarkTheme(), document.getElementById('react-target'));
});
