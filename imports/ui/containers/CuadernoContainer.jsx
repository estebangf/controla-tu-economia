import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Cuadernos } from '/imports/api/cuadernos/cuadernos'
import Cuaderno from '../pages/Cuaderno.jsx';

export default withTracker(({ match, cambiarTitulo}) => {
  const cuadernoId = match.params.id
  const publicHandle = Meteor.subscribe('cuaderno',cuadernoId);
  const loading = !publicHandle.ready();
//  const cuaderno = Cuadernos.find({}, { sort: { createdAt: -1 } }).fetch();
  const cuaderno = Cuadernos.findOne({_id: cuadernoId});
  const cuadernoExists = !loading && !!cuaderno;

  if(cuadernoExists){
    cambiarTitulo("Editar Cuaderno");
  } else {
    cambiarTitulo("Nuevo Cuaderno");
  }
  return {
    loading,
    cuadernoExists,
    cuaderno: cuadernoExists ? cuaderno : {},
  };
})(Cuaderno);
