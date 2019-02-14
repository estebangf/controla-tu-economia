import { Meteor } from 'meteor/meteor';
import { Gastos } from '../gastos.js'

Meteor.publish('gastos', function gastos() {
  return Gastos.find({userId: Meteor.userId()})
});
Meteor.publish('gasto', function gasto(id) {
  return Gastos.find({_id: id, userId: Meteor.userId()})
});