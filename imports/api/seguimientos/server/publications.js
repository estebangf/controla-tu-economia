import { Meteor } from 'meteor/meteor';
import { Seguimientos } from '../seguimientos.js'

Meteor.publish('seguimientos', function seguimientos() {
  return Seguimientos.find({userId: Meteor.userId()})
});
Meteor.publish('seguimiento', function seguimiento(id) {
  return Seguimientos.find({_id: id, userId: Meteor.userId()})
});