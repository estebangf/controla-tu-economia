import { Meteor } from 'meteor/meteor';

import { Ingresos } from '../../api/ingresos/ingresos.js'
import { Gastos } from '../../api/gastos/gastos.js'
import { Cuentas } from '../../api/cuentas/cuentas.js'
import { Movimientos } from '../../api/movimientos/movimientos.js'


/*
// INICIO DE SISTEMA DE CUENTAS:
const users = Meteor.users.find({}).fetch()
users.forEach(user => {
  var cuentas = Cuentas.find({userId: user._id}).fetch()
  if(cuentas.length === 0){
    var cuentaNuevaId = Cuentas.insert({
      cuentaVinculada: '',
      nombre: "Cuenta 1",
      descripcio: "Creada por sistema",
      userId: user._id,
      creada: new Date()
    })
    Ingresos.update({ userId: user._id }, {
      $set: {
        cuentaId: cuentaNuevaId
      }
    }, { multi: true });
    Gastos.update({ userId: user._id }, {
      $set: {
        cuentaId: cuentaNuevaId
      }
    }, { multi: true });
  }
});
*/


// INGRESOS Y GASTOS A MOVIMIENTOS POSITIVOS Y NEGATIVOS

const ingresos = Ingresos.find({}).fetch();
ingresos.forEach(ingreso => {
  Movimientos.insert({
    detalle: ingreso.detalle,
    descripcion: ingreso.descripcion,
    importe: ingreso.importe,
    variaLaGanancia: !ingreso.esPrestamo,
    cuentaId: ingreso.cuentaId,
    userId: ingreso.userId,
    creado: ingreso.creado,
    fecha: ingreso.creado
  });
})

const gastos = Gastos.find({}).fetch();
gastos.forEach(gasto => {
  Movimientos.insert({
    detalle: gasto.detalle,
    descripcion: gasto.descripcion,
    importe: 0 - gasto.importe,
    variaLaGanancia: gasto.esInsumo,
    cuentaId: gasto.cuentaId,
    userId: gasto.userId,
    creado: gasto.creado,
    fecha: gasto.creado
  });
})