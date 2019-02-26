import { Meteor } from 'meteor/meteor';
import { Cuentas } from '../cuentas.js'

Meteor.publish('cuentas', function cuentas() {
  return Cuentas.find({userId: Meteor.userId()})
});
Meteor.publish('cuenta', function cuenta(id) {
  return Cuentas.find({_id: id, userId: Meteor.userId()})
});