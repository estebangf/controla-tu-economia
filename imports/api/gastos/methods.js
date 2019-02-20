import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Gastos } from './gastos.js'

Meteor.methods({
  'gasto.nuevo'(detalle, descripcion, importe, esInsumo) {
    check(detalle, String);
    check(descripcion, String);
    check(importe, Number);
    check(esInsumo, Boolean);

    if (!!this.userId) {
      return Gastos.insert({
        detalle,
        descripcion,
        importe,
        esInsumo,
        userId: this.userId,
        creado: new Date()
      });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  'gasto.editar'(id, detalle, descripcion, importe, esInsumo) {
    check(id, String);
    check(detalle, String);
    check(descripcion, String);
    check(importe, Number);
    check(esInsumo, Boolean);

    if (!!this.userId) {
      return Gastos.update(id, {
        $set: {
          detalle,
          descripcion,
          importe,
          esInsumo,
        }
      });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  'gasto.eliminar'(id) {
    check(id, String);

    if (!!this.userId) {
      return Gastos.remove(id);
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  // borrarVista(idVista) {
  //   check(idVista, String);
  //
  //   const vistaBorrar = Gastos.findOne({_id: idVista});
  //   // Make sure the user is logged in before inserting a task
  //   if (!!this.userId) {
  //     Gastos.update({orden: { $gt: vistaBorrar.orden }},
  //       { $inc: { orden: -1 }},
  //       { multi: true }
  //     )
  //     return Gastos.remove({_id: idVista});
  //   } else {
  //     throw new Meteor.Error('not-authorized');
  //   }
  // },
/*
  'gastos.remove'(taskId) {
    check(taskId, String);

    const task = Gastos.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw articulo Meteor.Error('not-authorized');
    }

    Gastos.remove(taskId);
  },
  'gastos.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Gastos.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can check it off
      throw articulo Meteor.Error('not-authorized');
    }

    Gastos.update(taskId, { $set: { checked: setChecked } });
  },
  'gastos.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Gastos.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== this.userId) {
      throw articulo Meteor.Error('not-authorized');
    }

    Gastos.update(taskId, { $set: { private: setToPrivate } });
  },
  */
});