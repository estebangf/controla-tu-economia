import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import App from '../layouts/App.jsx';

import { Perfiles } from '/imports/api/perfiles/perfiles';
import { Cuadernos } from '/imports/api/cuadernos/cuadernos';

export default withTracker(() => {
  const publicHandle = Meteor.subscribe('cuadernos');
  const loading = !publicHandle.ready();
  const cuadernos = Cuadernos.find({}).fetch();
  const cuadernosExists = !loading && !!cuadernos.length;
  
  const publicHandlePerfil = Meteor.subscribe('perfil');
  const loadingPerfil = !publicHandlePerfil.ready();
  const perfil = Perfiles.findOne();
  const perfilExists = !loadingPerfil && !!perfil;


  return {
    loading,
    cuadernosExists,
    cuadernoSeleccionada: JSON.parse(sessionStorage.getItem('cuadernoSeleccionada')),
    cuadernos: cuadernosExists ? cuadernos : [],
    user: Meteor.user(),
    loggued: !!Meteor.userId(),
    connected: Meteor.status().connected,
    publicHandlePerfil,
    loadingPerfil,
    perfil,
    perfilExists
  };
})(App);
