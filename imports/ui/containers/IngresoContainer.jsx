import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Movimientos } from '/imports/api/movimientos/movimientos'
import Movimiento from '../pages/Movimiento.jsx';

export default withTracker(({match, cuadernoSeleccionada, cambiarTitulo}) => {
  const cuadernoId = !!cuadernoSeleccionada ?
    (!!cuadernoSeleccionada.cuadernoVinculado ? cuadernoSeleccionada.cuadernoVinculado : cuadernoSeleccionada._id) : undefined;
  
  const movimientoId = match.params.id
  const publicHandle = Meteor.subscribe('movimientos.ingreso',movimientoId);
  const loading = !publicHandle.ready();
//  const movimiento = Movimientos.find({}, { sort: { createdAt: -1 } }).fetch();
  const movimiento = Movimientos.findOne({_id: movimientoId});
  const movimientoExists = !loading && !!movimiento;

  if(movimientoExists){
    cambiarTitulo("Editar Ingreso");
  } else {
    cambiarTitulo("Nuevo Ingreso");
  }
  return {
    cuadernoId,
    loading,
    movimientoExists,
    movimiento: movimientoExists ? movimiento : {},
    esIngreso: true
  };
})(Movimiento);
