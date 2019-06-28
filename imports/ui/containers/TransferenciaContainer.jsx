import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Transferencias } from '/imports/api/transferencias/transferencias'
import Transferencia from '../pages/Transferencia.jsx';

export default withTracker(({match, cuadernoSeleccionada, cambiarTitulo}) => {
  const cuadernoId = !!cuadernoSeleccionada ?
    (!!cuadernoSeleccionada.cuadernoVinculado ? cuadernoSeleccionada.cuadernoVinculado : cuadernoSeleccionada._id) : undefined;
  
  const transferenciaId = match.params.id
  const publicHandle = Meteor.subscribe('transferencias.ingreso',transferenciaId);
  const loading = !publicHandle.ready();
//  const transferencia = Transferencias.find({}, { sort: { createdAt: -1 } }).fetch();
  const transferencia = Transferencias.findOne({_id: transferenciaId});
  const transferenciaExists = !loading && !!transferencia;

  if(transferenciaExists){
    cambiarTitulo("Editar Transferencia");
  } else {
    cambiarTitulo("Nueva Transferencia");
  }
  return {
    cuadernoId,
    loading,
    transferenciaExists,
    transferencia: transferenciaExists ? transferencia : {}
  };
})(Transferencia);
