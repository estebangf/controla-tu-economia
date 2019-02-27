import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import App from '../layouts/App.jsx';

import { Cuentas } from '/imports/api/cuentas/cuentas';

export default withTracker(() => {
  const publicHandle = Meteor.subscribe('cuentas');
  const loading = !publicHandle.ready();
  const cuentas = Cuentas.find({}).fetch();
  const cuentasExists = !loading && !!cuentas.length;

  return {
    loading,
    cuentasExists,
    cuentas: cuentasExists ? cuentas : [],
    user: Meteor.user(),
    loggued: !!Meteor.userId(),
    connected: Meteor.status().connected,
  };
})(App);
