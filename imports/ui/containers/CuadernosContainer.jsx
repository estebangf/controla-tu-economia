import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import CuadernosList from '../pages/CuadernosList.jsx';
import { Cuadernos } from '/imports/api/cuadernos/cuadernos';

export default withTracker(({cambiarTitulo}) => {
  cambiarTitulo("Cuadernos");
  const publicHandle = Meteor.subscribe('cuadernos');
  const loading = !publicHandle.ready();
//  const cuadernos = Cuadernos.find({}, { sort: { createdAt: -1 } }).fetch();
  const cuadernos = Cuadernos.find({}).fetch();
  const cuadernosExists = !loading && !!cuadernos.length;

  return {
    loading,
    cuadernosExists,
    cuadernos: cuadernosExists ? cuadernos : [],
  };
})(CuadernosList);
