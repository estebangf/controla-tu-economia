import { Meteor } from 'meteor/meteor';
import { Movimientos } from '../movimientos.js'

Meteor.publish('movimientos', function movimientos(cuentaId, desde, hasta) {
//  return Movimientos.find({userId: Meteor.userId(), cuentaId: cuentaId})
  return Movimientos.find({cuentaId: cuentaId,
    "$and": [
      { creado: { "$gte": new Date(desde) }},
      { creado: { "$lte": new Date(hasta) }}
    ] })
});

Meteor.publish('movimientos.ingresos', function movimientos(cuentaId, desde, hasta) {
//  return Movimientos.find({userId: Meteor.userId(), cuentaId: cuentaId})
  return Movimientos.find({cuentaId: cuentaId,
    "$and": [
      { creado: { "$gte": new Date(desde) }},
      { creado: { "$lte": new Date(hasta) }}
    ],
    importe: { "$gte": 0 }
  })
});

Meteor.publish('movimientos.egresos', function movimientos(cuentaId, desde, hasta) {
//  return Movimientos.find({userId: Meteor.userId(), cuentaId: cuentaId})
  return Movimientos.find({cuentaId: cuentaId,
    "$and": [
      { creado: { "$gte": new Date(desde) }},
      { creado: { "$lte": new Date(hasta) }}
    ],
    importe: { "$lt": 0 }
  })
});

Meteor.publish('movimientos.ingreso', function movimiento(id) {
//  return Movimientos.find({_id: id, userId: Meteor.userId()})
  return Movimientos.find({
    _id: id,
    importe: { "$gte": 0 }
  })
});

Meteor.publish('movimientos.egreso', function movimiento(id) {
//  return Movimientos.find({_id: id, userId: Meteor.userId()})
  return Movimientos.find({
    _id: id,
    importe: { "$lt": 0 }
  })
});