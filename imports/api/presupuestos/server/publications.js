import { Meteor } from 'meteor/meteor';
import { Presupuestos } from '../presupuestos.js'

Meteor.publish('presupuestos', function presupuestos(cuadernoId, desde, hasta) {
  return Presupuestos.find({cuadernoId: cuadernoId,
    "$and": [
      { desde: { "$gte": new Date(desde) }},
      { hasta: { "$lte": new Date(hasta) }}
    ]
  })
});
Meteor.publish('presupuestos.uno', function presupuesto(id) {
  return Presupuestos.find({_id: id})
});