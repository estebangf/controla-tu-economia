import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import IngresosList from '../pages/IngresosList.jsx';
import { Ingresos } from '/imports/api/ingresos/ingresos';

export default withTracker(({cuentaSeleccionada, cambiarTitulo, desde, hasta}) => {
  cambiarTitulo("Ingresos");
  const cuentaId = !!cuentaSeleccionada ?
    (!!cuentaSeleccionada.cuentaVinculada ? cuentaSeleccionada.cuentaVinculada : cuentaSeleccionada._id) : undefined;
  
  const publicHandle = Meteor.subscribe('ingresos', cuentaId, (new Date(desde)).getTime(), (new Date(hasta)).getTime());
  const loading = !publicHandle.ready();
//  const ingresos = Ingresos.find({}, { sort: { createdAt: -1 } }).fetch();
  const ingresos = Ingresos.find({}).fetch();
  const ingresosExists = !loading && !!ingresos;

  return {
    loading,
    ingresosExists,
    ingresos: ingresosExists ? ingresos : [],
  };
})(IngresosList);
