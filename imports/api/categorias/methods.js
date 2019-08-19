import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Categorias } from './categorias.js'

Meteor.methods({
  'categoria.nueva'(nombre, color) {
    check(nombre, String);
    if (!!this.userId) {
      return Categorias.insert({
        nombre,
        color,
//        userId: this.userId,
        creada: new Date()
      });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  'categoria.editar'(id, nombre, color) {
    check(id, String);
    check(nombre, String);
    check(color, String);
    if (!!this.userId) {
      return Categorias.update(id, {
        $set: {
          nombre,
          color,
        }
      });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  'categoria.eliminar'(id) {
    check(id, String);

    if (!!this.userId) {
      return Categorias.remove(id);
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
});