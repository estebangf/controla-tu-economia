import { Meteor } from 'meteor/meteor';
import { Ingresos } from '../ingresos.js'

Meteor.publish('ingresos', function ingresos(cuentaId) {
//  return Ingresos.find({userId: Meteor.userId(), cuentaId: cuentaId})
  return Ingresos.find({cuentaId: cuentaId})
});
Meteor.publish('ingreso', function ingreso(id) {
//  return Ingresos.find({_id: id, userId: Meteor.userId()})
  return Ingresos.find({_id: id})
});