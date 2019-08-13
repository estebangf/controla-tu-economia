import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Presupuestos } from '/imports/api/presupuestos/presupuestos'
import { Categorias } from '/imports/api/categorias/categorias'
import Presupuesto from '../pages/Presupuesto.jsx';

export default withTracker(({match, cuadernoSeleccionada, cambiarTitulo}) => {
  const cuadernoId = !!cuadernoSeleccionada ?
    (!!cuadernoSeleccionada.cuadernoVinculado ? cuadernoSeleccionada.cuadernoVinculado : cuadernoSeleccionada._id) : undefined;

  const presupuestoId = match.params.id
  const publicHandle = Meteor.subscribe('presupuestos.uno',presupuestoId);
  const loading = !publicHandle.ready();
//  const presupuesto = Presupuestos.find({}, { sort: { createdAt: -1 } }).fetch();
  const presupuesto = Presupuestos.findOne({_id: presupuestoId});
  const presupuestoExists = !loading && !!presupuesto;


  const publicHandleCategorias = Meteor.subscribe('categorias');
  const loadingCategorias = !publicHandleCategorias.ready();
  const categorias = Categorias.find({}).fetch();
  const categoriasExists = !loadingCategorias && !!categorias;


  if(presupuestoExists){
    cambiarTitulo("Editar Presupuesto");
  } else {
    cambiarTitulo("Nuevo Presupuesto");
  }
  return {
    cuadernoId,
    loading,
    presupuestoExists,
    presupuesto: presupuestoExists ? presupuesto : {},
    loadingCategorias,
    categoriasExists,
    categorias: categoriasExists ? categorias : [],
  };
})(Presupuesto);
