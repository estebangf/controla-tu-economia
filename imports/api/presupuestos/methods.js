import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Presupuestos } from './presupuestos.js'

Meteor.methods({
  'presupuesto.nuevo'(cuadernoId, nombre, categorias, desde, hasta, importe) {
    check(cuadernoId, String);
    check(nombre, String);
    check(categorias, Array);
    check(desde, Date);
    check(hasta, Date);
    check(importe, Number);

    if (!!this.userId) {
      return Presupuestos.insert({
        cuadernoId,
        nombre,
        categorias,
        desde,
        hasta,
        importe,
        userId: this.userId,
        creada: new Date()
      });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  'presupuesto.editar'(id, cuadernoId, nombre, categorias, desde, hasta, importe) {
    check(id, String);
    check(cuadernoId, String);
    check(nombre, String);
    check(categorias, Array);
    check(desde, Date);
    check(hasta, Date);
    check(importe, Number);

    if (!!this.userId) {
      return Presupuestos.update(id, {
        $set: {
          cuadernoId,
          nombre,
          categorias,
          desde,
          hasta,
          importe
        }
      });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  'presupuesto.eliminar'(id) {
    check(id, String);

    if (!!this.userId) {
      return Presupuestos.remove(id);
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
});