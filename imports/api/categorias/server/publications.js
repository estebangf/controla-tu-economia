import { Meteor } from 'meteor/meteor';
import { Categorias } from '../categorias.js'

Meteor.publish('categorias', function categorias() {
  return Categorias.find({})
});
Meteor.publish('categoria', function categoria(id) {
  return Categorias.find({_id: id})
});