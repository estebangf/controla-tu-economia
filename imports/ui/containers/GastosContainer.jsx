import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import GastosList from '../pages/GastosList.jsx';
import { Gastos } from '/imports/api/gastos/gastos';

export default withTracker(({cuentaSeleccionada}) => {
  const cuentaId = !!cuentaSeleccionada ?
    (!!cuentaSeleccionada.cuentaVinculada ? cuentaSeleccionada.cuentaVinculada : cuentaSeleccionada._id) : undefined;
  
  const publicHandle = Meteor.subscribe('gastos', cuentaId);
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
