import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Transferencias } from './transferencias.js'
import { Movimientos } from '../movimientos/movimientos.js'

Meteor.methods({
  'transferencia.nueva'(cuadernoId, fecha, egreso, ingreso) {
    check(cuadernoId, String);
    check(fecha, Date);
    check(egreso, Object);
    check(ingreso, Object);

    if (!!this.userId) {

      const transferenciaId = Transferencias.insert({
        egresoId: "",
        ingresoId: "",
        userId: this.userId,
        creada: new Date(),
        fecha
      });

      const egresoId = Movimientos.insert({
        detalle: egreso.detalle,
        descripcion: egreso.descripcion,
        importe: egreso.importe,
        variaLaGanancia: egreso.variaLaGanancia,
        cuadernoId: egreso.cuadernoId,
        transferenciaId,
        userId: this.userId,
        creado: egreso.creado,
        fecha: egreso.fecha
      });
      const ingresoId = Movimientos.insert({
        detalle: ingreso.detalle,
        descripcion: ingreso.descripcion,
        importe: ingreso.importe,
        variaLaGanancia: ingreso.variaLaGanancia,
        cuadernoId: ingreso.cuadernoId,
        transferenciaId,
        userId: this.userId,
        creado: ingreso.creado,
        fecha: ingreso.fecha
      });

      Transferencias.update(transferenciaId, {
        $set: {
          egresoId,
          ingresoId
        }
      });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  'transferencia.editar'(id, detalle, descripcion, importe, variaLaGanancia, fecha) {
    check(id, String);
    check(detalle, String);
    check(descripcion, String);
    check(importe, Number);
    check(variaLaGanancia, Boolean);
    check(fecha, Date);

    if (!!this.userId) {
      return Transferencias.update(id, {
        $set: {
          detalle,
          descripcion,
          importe,
          variaLaGanancia,
          fecha
        }
      });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  'transferencia.eliminar'(id) {
    check(id, String);

    if (!!this.userId) {
      return Transferencias.remove(id);
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  'transferencia.saldoInicial'(cuadernoId, hasta){
    check(cuadernoId, String);
    check(hasta, Date);
    const transferencias = Transferencias.find({cuadernoId: cuadernoId,
      "$and": [
        { creada: { "$lt": new Date(hasta) }}
      ]
    }).fetch()
    var saldoInicial = 0;
    transferencias.forEach(transferencia => {
      saldoInicial += transferencia.importe
    })

    return saldoInicial;
  },
  // borrarVista(idVista) {
  //   check(idVista, String);
  //
  //   const vistaBorrar = Transferencias.findOne({_id: idVista});
  //   // Make sure the user is logged in before inserting a task
  //   if (!!this.userId) {
  //     Transferencias.update({orden: { $gt: vistaBorrar.orden }},
  //       { $inc: { orden: -1 }},
  //       { multi: true }
  //     )
  //     return Transferencias.remove({_id: idVista});
  //   } else {
  //     throw new Meteor.Error('not-authorized');
  //   }
  // },
/*
  'transferencias.remove'(taskId) {
    check(taskId, String);

    const task = Transferencias.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw articulo Meteor.Error('not-authorized');
    }

    Transferencias.remove(taskId);
  },
  'transferencias.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Transferencias.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can check it off
      throw articulo Meteor.Error('not-authorized');
    }

    Transferencias.update(taskId, { $set: { checked: setChecked } });
  },
  'transferencias.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Transferencias.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== this.userId) {
      throw articulo Meteor.Error('not-authorized');
    }

    Transferencias.update(taskId, { $set: { private: setToPrivate } });
  },
  */
});
