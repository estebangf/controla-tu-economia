import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import MovimientosList from '../pages/MovimientosList.jsx';
import { Movimientos } from '/imports/api/movimientos/movimientos';

export default withTracker(({cuentaSeleccionada, cambiarTitulo, desde, hasta}) => {
  cambiarTitulo("Ingresos");
  const cuentaId = !!cuentaSeleccionada ?
    (!!cuentaSeleccionada.cuentaVinculada ?
      cuentaSeleccionada.cuentaVinculada : cuentaSeleccionada._id) : undefined;
  
  const publicHandle = Meteor.subscribe(
    'movimientos.ingresos', cuentaId, (new Date(desde)).getTime(), (new Date(hasta)).getTime());
  const loading = !publicHandle.ready();
//  const movimientos = Movimientos.find({}, { sort: { createdAt: -1 } }).fetch();
  const movimientos = Movimientos.find({}, { sort: { fecha: 1 } }).fetch();
  const movimientosExists = !loading && !!movimientos;

  return {
    loading,
    movimientosExists,
    movimientos: movimientosExists ? movimientos : [],
    pagina: "ingresos"
  };
})(MovimientosList);
