import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import AppContainer from '/imports/ui/containers/AppContainer'

function Theme() {
  Meteor.startup(() => {
    navigator.serviceWorker.register('/sw.js')
    .then()
    .catch(error => console.log('ServiceWorker registration failed: ', err));
  });

  return (
    <AppContainer />
  );
}

Meteor.startup(() => {
  render(Theme(), document.getElementById('react-target'));
});
