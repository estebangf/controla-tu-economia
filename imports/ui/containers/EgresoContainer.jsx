import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Movimientos } from '/imports/api/movimientos/movimientos'
import Movimiento from '../pages/Movimiento.jsx';

export default withTracker(({match, cuentaSeleccionada, cambiarTitulo}) => {
  const cuentaId = !!cuentaSeleccionada ?
    (!!cuentaSeleccionada.cuentaVinculada ? cuentaSeleccionada.cuentaVinculada : cuentaSeleccionada._id) : undefined;
  
  const movimientoId = match.params.id
  const publicHandle = Meteor.subscribe('movimientos.egreso', movimientoId);
  const loading = !publicHandle.ready();
//  const movimiento = Movimientos.find({}, { sort: { createdAt: -1 } }).fetch();
  const movimiento = Movimientos.findOne({_id: movimientoId});
  const movimientoExists = !loading && !!movimiento;

  if(movimientoExists){
    cambiarTitulo("Editar Egreso");
  } else {
    cambiarTitulo("Nuevo Egreso");
  }
  return {
    cuentaId,
    loading,
    movimientoExists,
    movimiento: movimientoExists ? movimiento : {},
    esIngreso: false
  };
})(Movimiento);
