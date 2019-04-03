import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Gastos } from '/imports/api/gastos/gastos'
import Gasto from '../pages/Gasto.jsx';

export default withTracker(({match, cuentaSeleccionada, cambiarTitulo}) => {
  const cuentaId = !!cuentaSeleccionada ?
    (!!cuentaSeleccionada.cuentaVinculada ? cuentaSeleccionada.cuentaVinculada : cuentaSeleccionada._id) : undefined;
  
  const gastoId = match.params.id
  const publicHandle = Meteor.subscribe('gasto',gastoId);
  const loading = !publicHandle.ready();
//  const gasto = Gastos.find({}, { sort: { createdAt: -1 } }).fetch();
  const gasto = Gastos.findOne({_id: gastoId});
  const gastoExists = !loading && !!gasto;


  if(gastoExists){
    cambiarTitulo("Editar Gasto");
  } else {
    cambiarTitulo("Nuevo Gasto");
  }

  return {
    cuentaId,
    loading,
    gastoExists,
    gasto: gastoExists ? gasto : {},
  };
})(Gasto);
