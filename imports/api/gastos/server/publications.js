import { Meteor } from 'meteor/meteor';
import { Gastos } from '../gastos.js'

Meteor.publish('gastos', function gastos(cuentaId, desde, hasta) {
//  return Gastos.find({userId: Meteor.userId(), cuentaId: cuentaId})
  return Gastos.find({cuentaId: cuentaId,
    "$and": [
      { creado: { "$gte": new Date(desde) }},
      { creado: { "$lte": new Date(hasta) }}
    ] })
});
Meteor.publish('gasto', function gasto(id) {
//  return Gastos.find({_id: id, userId: Meteor.userId()})
  return Gastos.find({_id: id})
});