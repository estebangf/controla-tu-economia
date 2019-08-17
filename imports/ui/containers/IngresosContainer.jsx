import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import MovimientosList from '../pages/MovimientosList.jsx';
import { Movimientos } from '/imports/api/movimientos/movimientos';
import { Categorias } from '/imports/api/categorias/categorias'

export default withTracker(({cuadernoSeleccionada, cambiarTitulo, desde, hasta}) => {
  cambiarTitulo("Ingresos");
  const cuadernoId = !!cuadernoSeleccionada ?
    (!!cuadernoSeleccionada.cuadernoVinculado ?
      cuadernoSeleccionada.cuadernoVinculado : cuadernoSeleccionada._id) : undefined;
  
  const publicHandle = Meteor.subscribe(
    'movimientos.ingresos', cuadernoId, (new Date(desde)).getTime(), (new Date(hasta)).getTime());
  const loading = !publicHandle.ready();
//  const movimientos = Movimientos.find({}, { sort: { createdAt: -1 } }).fetch();
  const movimientos = Movimientos.find({}, { sort: { fecha: 1 } }).fetch();
  const movimientosExists = !loading && !!movimientos;

  const publicHandleCategorias = Meteor.subscribe('categorias');
  const loadingCategorias = !publicHandleCategorias.ready();
  const categorias = Categorias.find({}).fetch();
  const categoriasExists = !loadingCategorias && !!categorias;

  return {
    loading,
    movimientosExists,
    movimientos: movimientosExists ? movimientos : [],
    loadingCategorias,
    categoriasExists,
    categorias: categoriasExists ? categorias : [],
    pagina: "ingresos"
  };
})(MovimientosList);
