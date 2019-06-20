import { Meteor } from 'meteor/meteor';
import { Cuadernos } from '../cuadernos.js'

Meteor.publish('cuadernos', function cuadernos() {
  return Cuadernos.find({userId: Meteor.userId()})
});
Meteor.publish('cuaderno', function cuaderno(id) {
  return Cuadernos.find({_id: id, userId: Meteor.userId()})
});