import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Perfiles } from './perfiles.js'

Meteor.methods({
  'perfil.nuevo'() {
    if (!!this.userId) {
      return Perfiles.insert({
        userId: this.userId,
        creado: new Date()
      });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  'perfil.cambiar.tema'(tema) {
    check(tema, String);
    if (!!this.userId) {
      const perfil = Perfiles.findOne({userId: this.userId})
      if (!!perfil) {
        return Perfiles.update({userId: this.userId}, {
          $set: {
            tema,
          }
        });
      } else {
        return Perfiles.insert({
          userId: this.userId,
          tema: tema,
          creado: new Date()
        });
      }
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
});