import { Meteor } from 'meteor/meteor';
import { Gastos } from '../gastos.js'

Meteor.publish('gastos', function gastos(cuentaId) {
  return Gastos.find({userId: Meteor.userId(), cuentaId: cuentaId})
});
Meteor.publish('gasto', function gasto(id) {
  return Gastos.find({_id: id, userId: Meteor.userId()})
});