import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Ganancias from '../pages/Ganancias.jsx';

import { Ingresos } from '/imports/api/ingresos/ingresos';
import { Gastos } from '/imports/api/gastos/gastos';

export default withTracker(({cuentaSeleccionada, cambiarTitulo}) => {
  cambiarTitulo("Ganancias");
  const cuentaId = !!cuentaSeleccionada ?
    (!!cuentaSeleccionada.cuentaVinculada ? cuentaSeleccionada.cuentaVinculada : cuentaSeleccionada._id) : undefined;
  
  const publicHandleIngresos = Meteor.subscribe('ingresos', cuentaId);
  const loadingIngresos = !publicHandleIngresos.ready();
  const ingresos = Ingresos.find({ esPrestamo: false }, { sort: { creado: 1 } }).fetch();
  const ingresosExists = !loadingIngresos && !!ingresos;

  const publicHandleGastos = Meteor.subscribe('gastos', cuentaId);
  const loadingGastos = !publicHandleGastos.ready();
  const gastos = Gastos.find({ esInsumo: true }, { sort: { creado: 1 } }).fetch();
  const gastosExists = !loadingGastos && !!gastos;

  return {
    loadingIngresos,
    ingresosExists,
    ingresos: ingresosExists ? ingresos : [],
    loadingGastos,
    gastosExists,
    gastos: gastosExists ? gastos : [],
  };
})(Ganancias);
