import { Meteor } from 'meteor/meteor';
import { Perfiles } from '../perfiles.js'

/*
Meteor.publish('perfiles', function perfiles() {
  return Perfiles.find({})
});
*/
Meteor.publish('perfil', function() {
  return Perfiles.find({userId: this.userId})
});