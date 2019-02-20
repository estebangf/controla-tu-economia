import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Ingresos } from './ingresos.js'

Meteor.methods({
  'ingreso.nuevo'(detalle, descripcion, importe, esPrestamo) {
    check(detalle, String);
    check(descripcion, String);
    check(importe, Number);
    check(esPrestamo, Boolean);

    if (!!this.userId) {
      return Ingresos.insert({
        detalle,
        descripcion,
        importe,
        esPrestamo,
        userId: this.userId,
        creado: new Date()
      });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  'ingreso.editar'(id, detalle, descripcion, importe, esPrestamo) {
    check(id, String);
    check(detalle, String);
    check(descripcion, String);
    check(importe, Number);
    check(esPrestamo, Boolean);

    if (!!this.userId) {
      return Ingresos.update(id, {
        $set: {
          detalle,
          descripcion,
          importe,
          esPrestamo,
        }
      });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  'ingreso.eliminar'(id) {
    check(id, String);

    if (!!this.userId) {
      return Ingresos.remove(id);
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  // borrarVista(idVista) {
  //   check(idVista, String);
  //
  //   const vistaBorrar = Ingresos.findOne({_id: idVista});
  //   // Make sure the user is logged in before inserting a task
  //   if (!!this.userId) {
  //     Ingresos.update({orden: { $gt: vistaBorrar.orden }},
  //       { $inc: { orden: -1 }},
  //       { multi: true }
  //     )
  //     return Ingresos.remove({_id: idVista});
  //   } else {
  //     throw new Meteor.Error('not-authorized');
  //   }
  // },
/*
  'ingresos.remove'(taskId) {
    check(taskId, String);

    const task = Ingresos.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw articulo Meteor.Error('not-authorized');
    }

    Ingresos.remove(taskId);
  },
  'ingresos.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Ingresos.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can check it off
      throw articulo Meteor.Error('not-authorized');
    }

    Ingresos.update(taskId, { $set: { checked: setChecked } });
  },
  'ingresos.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Ingresos.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== this.userId) {
      throw articulo Meteor.Error('not-authorized');
    }

    Ingresos.update(taskId, { $set: { private: setToPrivate } });
  },
  */
});
