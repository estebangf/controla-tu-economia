import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Movimientos } from './movimientos.js'

Meteor.methods({
  'movimiento.nuevo'(detalle, descripcion, importe, variaLaGanancia, cuentaId) {
    check(detalle, String);
    check(descripcion, String);
    check(importe, Number);
    check(variaLaGanancia, Boolean);
    check(cuentaId, String);

    if (!!this.userId) {
      return Movimientos.insert({
        detalle,
        descripcion,
        importe,
        variaLaGanancia,
        cuentaId,
        userId: this.userId,
        creado: new Date(),
        fecha: new Date()
      });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  'movimiento.editar'(id, detalle, descripcion, importe, variaLaGanancia) {
    check(id, String);
    check(detalle, String);
    check(descripcion, String);
    check(importe, Number);
    check(variaLaGanancia, Boolean);

    if (!!this.userId) {
      return Movimientos.update(id, {
        $set: {
          detalle,
          descripcion,
          importe,
          variaLaGanancia
        }
      });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  'movimiento.eliminar'(id) {
    check(id, String);

    if (!!this.userId) {
      return Movimientos.remove(id);
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  'movimiento.saldoInicial'(cuentaId, hasta){
    check(cuentaId, String);
    check(hasta, Date);
    const movimientos = Movimientos.find({cuentaId: cuentaId,
      "$and": [
        { creado: { "$lt": new Date(hasta) }}
      ]
    }).fetch()
    var saldoInicial = 0;
    movimientos.forEach(movimiento => {
      saldoInicial += movimiento.importe
    })

    return saldoInicial;
  },
  // borrarVista(idVista) {
  //   check(idVista, String);
  //
  //   const vistaBorrar = Movimientos.findOne({_id: idVista});
  //   // Make sure the user is logged in before inserting a task
  //   if (!!this.userId) {
  //     Movimientos.update({orden: { $gt: vistaBorrar.orden }},
  //       { $inc: { orden: -1 }},
  //       { multi: true }
  //     )
  //     return Movimientos.remove({_id: idVista});
  //   } else {
  //     throw new Meteor.Error('not-authorized');
  //   }
  // },
/*
  'movimientos.remove'(taskId) {
    check(taskId, String);

    const task = Movimientos.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw articulo Meteor.Error('not-authorized');
    }

    Movimientos.remove(taskId);
  },
  'movimientos.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Movimientos.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can check it off
      throw articulo Meteor.Error('not-authorized');
    }

    Movimientos.update(taskId, { $set: { checked: setChecked } });
  },
  'movimientos.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Movimientos.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== this.userId) {
      throw articulo Meteor.Error('not-authorized');
    }

    Movimientos.update(taskId, { $set: { private: setToPrivate } });
  },
  */
});
