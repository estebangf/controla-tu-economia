import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Ingresos } from '/imports/api/ingresos/ingresos'
import Ingreso from '../pages/Ingreso.jsx';

export default withTracker(({match, cuentaSeleccionada, cambiarTitulo}) => {
  cambiarTitulo("Editar Ingreso");
  const cuentaId = !!cuentaSeleccionada ?
    (!!cuentaSeleccionada.cuentaVinculada ? cuentaSeleccionada.cuentaVinculada : cuentaSeleccionada._id) : undefined;
  
  const ingresoId = match.params.id
  const publicHandle = Meteor.subscribe('ingreso',ingresoId);
  const loading = !publicHandle.ready();
//  const ingreso = Ingresos.find({}, { sort: { createdAt: -1 } }).fetch();
  const ingreso = Ingresos.findOne({_id: ingresoId});
  const ingresoExists = !loading && !!ingreso;

  return {
    cuentaId,
    loading,
    ingresoExists,
    ingreso: ingresoExists ? ingreso : {},
  };
})(Ingreso);
