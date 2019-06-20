import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import App from '../layouts/App.jsx';

import { Cuadernos } from '/imports/api/cuadernos/cuadernos';

export default withTracker(() => {
  const publicHandle = Meteor.subscribe('cuadernos');
  const loading = !publicHandle.ready();
  const cuadernos = Cuadernos.find({}).fetch();
  const cuadernosExists = !loading && !!cuadernos.length;
  
  return {
    loading,
    cuadernosExists,
    cuadernoSeleccionada: JSON.parse(sessionStorage.getItem('cuadernoSeleccionada')),
    cuadernos: cuadernosExists ? cuadernos : [],
    user: Meteor.user(),
    loggued: !!Meteor.userId(),
    connected: Meteor.status().connected,
  };
})(App);
