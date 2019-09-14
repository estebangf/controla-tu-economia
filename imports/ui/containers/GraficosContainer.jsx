import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Graficos from '../pages/Graficos.jsx';

import { Movimientos } from '/imports/api/movimientos/movimientos';
import { Categorias } from '/imports/api/categorias/categorias';

export default withTracker(({cuadernoSeleccionada, cambiarTitulo, desde, hasta}) => {
  cambiarTitulo("Graficos");
  const cuadernoId = !!cuadernoSeleccionada ?
    (!!cuadernoSeleccionada.cuadernoVinculado ?
      cuadernoSeleccionada.cuadernoVinculado : cuadernoSeleccionada._id) : undefined;
  
  const publicHandleMovimientos = Meteor.subscribe(
    'movimientos.egresos.sintransferencias', cuadernoId, (new Date(desde)).getTime(), (new Date(hasta)).getTime());
  const loadingMovimientos = !publicHandleMovimientos.ready();
  const movimientos = Movimientos.find({}, { sort: { fecha: 1 } }).fetch();
  const movimientosExists = !loadingMovimientos && !!movimientos;

  const publicHandleCategorias = Meteor.subscribe('categorias');
  const loadingCategorias = !publicHandleCategorias.ready();
  const categorias = Categorias.find({}).fetch();
  const categoriasExists = !loadingCategorias && !!categorias;

  return {
    cuadernoId,
    loadingMovimientos,
    movimientosExists,
    movimientos: movimientosExists ? movimientos : [],
    loadingCategorias,
    categoriasExists,
    categorias: categoriasExists ? categorias : [],
  };
})(Graficos);
