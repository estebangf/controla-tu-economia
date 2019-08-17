import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Transferencias } from '/imports/api/transferencias/transferencias'
import { Movimientos } from '/imports/api/movimientos/movimientos'
import { Categorias } from '/imports/api/categorias/categorias'
import Transferencia from '../pages/Transferencia.jsx';

export default withTracker(({match, cuadernoSeleccionada, cambiarTitulo}) => {
  const cuadernoId = !!cuadernoSeleccionada ?
    (!!cuadernoSeleccionada.cuadernoVinculado ? cuadernoSeleccionada.cuadernoVinculado : cuadernoSeleccionada._id) : undefined;
  
  const transferenciaId = match.params.id
  const publicHandle = Meteor.subscribe('transferencias.exacta',transferenciaId);
  const loading = !publicHandle.ready();
//  const transferencia = Transferencias.find({}, { sort: { createdAt: -1 } }).fetch();
  const transferencia = Transferencias.findOne({_id: transferenciaId});
  const transferenciaExists = !loading && !!transferencia;

  var egreso = {}
  var ingreso = {}
  var loadingMovimientos = true
  var movimientosExists = false

  if(transferenciaExists){
    cambiarTitulo("Editar Transferencia");
    
    const egresoId = transferencia.egresoId
    const ingresoId = transferencia.ingresoId

    const publicHandleMovimientos = Meteor.subscribe('movimientos.transferencia',transferenciaId);
    loadingMovimientos = !publicHandleMovimientos.ready();

    egreso = Movimientos.findOne({_id: egresoId});
    ingreso = Movimientos.findOne({_id: ingresoId});

    movimientosExists = !loadingMovimientos && !!ingreso && !!egreso;
  } else {
    cambiarTitulo("Nueva Transferencia");
  }

  const publicHandleCategorias = Meteor.subscribe('categorias');
  const loadingCategorias = !publicHandleCategorias.ready();
  const categorias = Categorias.find({}).fetch();
  const categoriasExists = !loadingCategorias && !!categorias;

  return {
    cuadernoId,
    loading: loading && loadingMovimientos,
    transferenciaExists,
    transferencia: transferenciaExists ? transferencia : {},
    movimientosExists,
    egreso: movimientosExists ? egreso : {},
    ingreso: movimientosExists ? ingreso : {},
    loadingCategorias,
    categoriasExists,
    categorias: categoriasExists ? categorias : [],
  };
})(Transferencia);