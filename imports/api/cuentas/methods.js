import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Cuentas } from './cuentas.js'

Meteor.methods({
  'cuenta.nueva'(cuentaVinculada, nombre, descripcion) {
    check(nombre, String);
    check(descripcion, String);
   
    if (!!this.userId) {
      if (!!cuentaVinculada) {
        check(cuentaVinculada, String);

        const cuentaAVincular = Cuentas.findOne(cuentaVinculada);

        if (!!!cuentaAVincular) {
          throw new Meteor.Error('not-found');
        }
      }
      check(nombre, String);
      check(descripcion, String);
  
      return Cuentas.insert({
        cuentaVinculada,
        nombre,
        descripcion,
        userId: this.userId,
        creada: new Date()
      });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  'cuenta.editar'(id, nombre, descripcion) {
    check(id, String);
    check(nombre, String);
    check(descripcion, String);

    if (!!this.userId) {
      return Cuentas.update(id, {
        $set: {
          nombre,
          descripcion,
        }
      });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  'cuenta.eliminar'(id) {
    check(id, String);

    if (!!this.userId) {
      return Cuentas.remove(id);
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  // borrarVista(idVista) {
  //   check(idVista, String);
  //
  //   const vistaBorrar = Cuentas.findOne({_id: idVista});
  //   // Make sure the user is logged in before inserting a task
  //   if (!!this.userId) {
  //     Cuentas.update({orden: { $gt: vistaBorrar.orden }},
  //       { $inc: { orden: -1 }},
  //       { multi: true }
  //     )
  //     return Cuentas.remove({_id: idVista});
  //   } else {
  //     throw new Meteor.Error('not-authorized');
  //   }
  // },
/*
  'cuentas.remove'(taskId) {
    check(taskId, String);

    const task = Cuentas.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw articulo Meteor.Error('not-authorized');
    }

    Cuentas.remove(taskId);
  },
  'cuentas.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Cuentas.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can check it off
      throw articulo Meteor.Error('not-authorized');
    }

    Cuentas.update(taskId, { $set: { checked: setChecked } });
  },
  'cuentas.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Cuentas.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== this.userId) {
      throw articulo Meteor.Error('not-authorized');
    }

    Cuentas.update(taskId, { $set: { private: setToPrivate } });
  },
  */
});