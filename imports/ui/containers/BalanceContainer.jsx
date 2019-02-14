import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Balance from '../pages/Balance.jsx';

import { Ingresos } from '/imports/api/ingresos/ingresos';
import { Gastos } from '/imports/api/gastos/gastos';

export default withTracker(() => {
  const publicHandleIngresos = Meteor.subscribe('ingresos');
  const loadingIngresos = !publicHandleIngresos.ready();
  const ingresos = Ingresos.find({}, { sort: { creado: 1 } }).fetch();
  const ingresosExists = !loadingIngresos && !!ingresos;

  const publicHandleGastos = Meteor.subscribe('gastos');
  const loadingGastos = !publicHandleGastos.ready();
  const gastos = Gastos.find({}, { sort: { creado: 1 } }).fetch();
  const gastosExists = !loadingGastos && !!gastos;

  return {
    loadingIngresos,
    ingresosExists,
    ingresos: ingresosExists ? ingresos : [],
    loadingGastos,
    gastosExists,
    gastos: gastosExists ? gastos : [],
  };
})(Balance);
