import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import GastosList from '../pages/GastosList.jsx';
import { Gastos } from '/imports/api/gastos/gastos';

export default withTracker(({cuentaSeleccionada, cambiarTitulo, desde, hasta}) => {
  cambiarTitulo("Gastos");
  const cuentaId = !!cuentaSeleccionada ?
    (!!cuentaSeleccionada.cuentaVinculada ? cuentaSeleccionada.cuentaVinculada : cuentaSeleccionada._id) : undefined;
  
  const publicHandle = Meteor.subscribe('gastos', cuentaId, (new Date(desde)).getTime(), (new Date(hasta)).getTime());
  const loading = !publicHandle.ready();
//  const gastos = Gastos.find({}, { sort: { createdAt: -1 } }).fetch();
  const gastos = Gastos.find({}).fetch();
  const gastosExists = !loading && !!gastos;

  return {
    loading,
    gastosExists,
    gastos: gastosExists ? gastos : [],
  };
})(GastosList);
