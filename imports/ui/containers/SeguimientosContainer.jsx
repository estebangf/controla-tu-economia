import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Seguimientos from '../pages/Seguimientos.jsx';

import { Movimientos } from '/imports/api/movimientos/movimientos';

export default withTracker(({cuentaSeleccionada, cambiarTitulo, desde, hasta}) => {
  cambiarTitulo("Seguimientos");
  const cuentaId = !!cuentaSeleccionada ?
    (!!cuentaSeleccionada.cuentaVinculada ?
      cuentaSeleccionada.cuentaVinculada : cuentaSeleccionada._id) : undefined;
  
  const publicHandleMovimientos = Meteor.subscribe(
    'movimientos', cuentaId, (new Date(desde)).getTime(), (new Date(hasta)).getTime());
  const loadingMovimientos = !publicHandleMovimientos.ready();
  const movimientos = Movimientos.find({}, { sort: { fecha: 1 } }).fetch();
  const movimientosExists = !loadingMovimientos && !!movimientos;

  return {
    loadingMovimientos,
    movimientosExists,
    movimientos: movimientosExists ? movimientos : [],
  };
})(Seguimientos);
