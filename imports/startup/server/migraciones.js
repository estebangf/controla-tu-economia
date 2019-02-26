import { Meteor } from 'meteor/meteor';

import { Ingresos } from '../../api/ingresos/ingresos.js'
import { Gastos } from '../../api/gastos/gastos.js'
import { Cuentas } from '../../api/cuentas/cuentas.js'


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