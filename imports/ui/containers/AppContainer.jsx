import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import App from '../layouts/App.jsx';

export default withTracker(() => {
  return {
    user: Meteor.user(),
    loggued: !!Meteor.userId(),
    connected: Meteor.status().connected,
  };
})(App);
