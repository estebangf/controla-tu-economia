import { Meteor } from 'meteor/meteor';
import { Ingresos } from '../ingresos.js'

Meteor.publish('ingresos', function ingresos(cuentaId, desde, hasta) {
//  return Ingresos.find({userId: Meteor.userId(), cuentaId: cuentaId})
  return Ingresos.find({cuentaId: cuentaId,
    "$and": [
      { creado: { "$gte": new Date(desde) }},
      { creado: { "$lte": new Date(hasta) }}
    ] })
});
Meteor.publish('ingreso', function ingreso(id) {
//  return Ingresos.find({_id: id, userId: Meteor.userId()})
  return Ingresos.find({_id: id})
});