import { Meteor } from 'meteor/meteor';
import { Transferencias } from '../transferencias.js'

Meteor.publish('transferencias', function transferencias(desde, hasta) {
//  return Transferencias.find({userId: Meteor.userId(), cuadernoId: cuadernoId})
  return Transferencias.find({
    "$and": [
      { fecha: { "$gte": new Date(desde) }},
      { fecha: { "$lte": new Date(hasta) }}
    ] })
});

Meteor.publish('transferencias.exacta', function transferencia(id) {
//  return Transferencias.find({_id: id, userId: Meteor.userId()})
  return Transferencias.find({
    _id: id,
  })
});