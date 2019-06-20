import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Cuadernos } from './cuadernos.js'

Meteor.methods({
  'cuaderno.nueva'(cuadernoVinculado, nombre, descripcion) {   
    if (!!this.userId) {
      if (!!cuadernoVinculado) {
        check(cuadernoVinculado, String);

        const cuadernoAVincular = Cuadernos.findOne(cuadernoVinculado);

        if (!!!cuadernoAVincular) {
          throw new Meteor.Error('not-found');
        }
      }
      check(nombre, String);
      check(descripcion, String);
  
      return Cuadernos.insert({
        cuadernoVinculado,
        nombre,
        descripcion,
        userId: this.userId,
        creado: new Date()
      });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  'cuaderno.editar'(id, cuadernoVinculado, nombre, descripcion) {
    if (!!this.userId) {
      if (!!cuadernoVinculado) {
        check(cuadernoVinculado, String);

        const cuadernoAVincular = Cuadernos.findOne(cuadernoVinculado);

        if (!!!cuadernoAVincular) {
          throw new Meteor.Error('not-found');
        }
      }
      check(id, String);
      check(nombre, String);
      check(descripcion, String);
      
      return Cuadernos.update(id, {
        $set: {
          cuadernoVinculado,
          nombre,
          descripcion,
        }
      });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  'cuaderno.eliminar'(id) {
    check(id, String);

    if (!!this.userId) {
      return Cuadernos.remove(id);
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  // borrarVista(idVista) {
  //   check(idVista, String);
  //
  //   const vistaBorrar = Cuadernos.findOne({_id: idVista});
  //   // Make sure the user is logged in before inserting a task
  //   if (!!this.userId) {
  //     Cuadernos.update({orden: { $gt: vistaBorrar.orden }},
  //       { $inc: { orden: -1 }},
  //       { multi: true }
  //     )
  //     return Cuadernos.remove({_id: idVista});
  //   } else {
  //     throw new Meteor.Error('not-authorized');
  //   }
  // },
/*
  'cuadernos.remove'(taskId) {
    check(taskId, String);

    const task = Cuadernos.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw articulo Meteor.Error('not-authorized');
    }

    Cuadernos.remove(taskId);
  },
  'cuadernos.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Cuadernos.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can check it off
      throw articulo Meteor.Error('not-authorized');
    }

    Cuadernos.update(taskId, { $set: { checked: setChecked } });
  },
  'cuadernos.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Cuadernos.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== this.userId) {
      throw articulo Meteor.Error('not-authorized');
    }

    Cuadernos.update(taskId, { $set: { private: setToPrivate } });
  },
  */
});