import { Meteor } from 'meteor/meteor';
import { Ingresos } from '../ingresos.js'

Meteor.publish('ingresos', function ingresos() {
  return Ingresos.find({userId: Meteor.userId()})
});
Meteor.publish('ingreso', function ingreso(id) {
  return Ingresos.find({_id: id, userId: Meteor.userId()})
});