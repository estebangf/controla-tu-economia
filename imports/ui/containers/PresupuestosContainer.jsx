import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import PresupuestosList from '../pages/PresupuestosList.jsx';
import { Presupuestos } from '/imports/api/presupuestos/presupuestos';

import { Movimientos } from '/imports/api/movimientos/movimientos';
import { Categorias } from '/imports/api/categorias/categorias';

export default withTracker(({cuadernoSeleccionada, cambiarTitulo, desde, hasta}) => {
  cambiarTitulo("Presupuestos");
  const cuadernoId = !!cuadernoSeleccionada ?
    (!!cuadernoSeleccionada.cuadernoVinculado ?
      cuadernoSeleccionada.cuadernoVinculado : cuadernoSeleccionada._id) : undefined;
  
  const publicHandle = Meteor.subscribe(
    'presupuestos', cuadernoId, (new Date(desde)).getTime(), (new Date(hasta)).getTime());
  const loading = !publicHandle.ready();
  const presupuestos = Presupuestos.find({}, { sort: { fecha: 1 } }).fetch();
  const presupuestosExists = !loading && !!presupuestos;
  
  const publicHandleMovimientos = Meteor.subscribe(
    'movimientos', cuadernoId, (new Date(desde)).getTime(), (new Date(hasta)).getTime());
  const loadingMovimientos = !publicHandleMovimientos.ready();
  const movimientos = Movimientos.find({}, { sort: { fecha: 1 } }).fetch();
  const movimientosExists = !loadingMovimientos && !!movimientos;

  const publicHandleCategorias = Meteor.subscribe('categorias');
  const loadingCategorias = !publicHandleCategorias.ready();
  const categoriasColeccion = Categorias.find({}).fetch();
  const categorias = {}
  categoriasColeccion.forEach(c => {
    categorias[c._id] = c.nombre
  });
  const categoriasExists = !loadingCategorias && !!categorias;

  return {
    cuadernoId,
    loadingMovimientos,
    movimientosExists,
    movimientos: movimientosExists ? movimientos : [],
    loadingCategorias,
    categoriasExists,
    categorias: categoriasExists ? categorias : [],


    loading,
    presupuestosExists,
    presupuestos: presupuestosExists ? presupuestos : [],
  };
})(PresupuestosList);
