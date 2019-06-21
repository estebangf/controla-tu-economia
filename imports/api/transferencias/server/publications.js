import { Meteor } from 'meteor/meteor';
import { Transferencias } from '../transferencias.js'

Meteor.publish('transferencias', function transferencias(cuadernoId, desde, hasta) {
//  return Transferencias.find({userId: Meteor.userId(), cuadernoId: cuadernoId})
  return Transferencias.find({cuadernoId: cuadernoId,
    "$and": [
      { creado: { "$gte": new Date(desde) }},
      { creado: { "$lte": new Date(hasta) }}
    ] })
});

Meteor.publish('transferencias.ingresos', function transferencias(cuadernoId, desde, hasta) {
//  return Transferencias.find({userId: Meteor.userId(), cuadernoId: cuadernoId})
  return Transferencias.find({cuadernoId: cuadernoId,
    "$and": [
      { creado: { "$gte": new Date(desde) }},
      { creado: { "$lte": new Date(hasta) }}
    ],
    importe: { "$gte": 0 }
  })
});

Meteor.publish('transferencias.egresos', function transferencias(cuadernoId, desde, hasta) {
//  return Transferencias.find({userId: Meteor.userId(), cuadernoId: cuadernoId})
  return Transferencias.find({cuadernoId: cuadernoId,
    "$and": [
      { creado: { "$gte": new Date(desde) }},
      { creado: { "$lte": new Date(hasta) }}
    ],
    importe: { "$lt": 0 }
  })
});

Meteor.publish('transferencias.ingreso', function transferencia(id) {
//  return Transferencias.find({_id: id, userId: Meteor.userId()})
  return Transferencias.find({
    _id: id,
    importe: { "$gte": 0 }
  })
});

Meteor.publish('transferencias.egreso', function transferencia(id) {
//  return Transferencias.find({_id: id, userId: Meteor.userId()})
  return Transferencias.find({
    _id: id,
    importe: { "$lt": 0 }
  })
});