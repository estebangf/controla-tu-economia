import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

import { Seguimientos } from './seguimientos.js'

Meteor.methods({
  'seguimiento.nuevo'( detalle, tipo, valor, aplicaA, desde, hasta ) {
    /*
    detalle: Nombre del movimiento.
    tipo: porcentaje o montofijo.
    valor: numero a aplicar segun tipo.
    aplicaA: ganancia o balance.
    desde: fecha o siempre.
    hasta: fecha o siempre.
    */
   
    if (!!this.userId) {
      check(detalle, String);
      check(tipo, String);
      check(valor, Number);
      check(aplicaA, String);
      check(desde, Match.Maybe(Date));
      check(hasta, Match.Maybe(Date));
  
      return Seguimientos.insert({
        detalle,
        tipo,
        valor,
        aplicaA,
        desde,
        hasta,
        userId: this.userId,
        creado: new Date()
      });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  /*
  'seguimiento.editar'(id, seguimientoVinculada, nombre, descripcion) {
    if (!!this.userId) {
      if (!!seguimientoVinculada) {
        check(seguimientoVinculada, String);

        const seguimientoAVincular = Seguimientos.findOne(seguimientoVinculada);

        if (!!!seguimientoAVincular) {
          throw new Meteor.Error('not-found');
        }
      }
      check(id, String);
      check(nombre, String);
      check(descripcion, String);
      
      return Seguimientos.update(id, {
        $set: {
          seguimientoVinculada,
          nombre,
          descripcion,
        }
      });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  'seguimiento.eliminar'(id) {
    check(id, String);

    if (!!this.userId) {
      return Seguimientos.remove(id);
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  // borrarVista(idVista) {
  //   check(idVista, String);
  //
  //   const vistaBorrar = Seguimientos.findOne({_id: idVista});
  //   // Make sure the user is logged in before inserting a task
  //   if (!!this.userId) {
  //     Seguimientos.update({orden: { $gt: vistaBorrar.orden }},
  //       { $inc: { orden: -1 }},
  //       { multi: true }
  //     )
  //     return Seguimientos.remove({_id: idVista});
  //   } else {
  //     throw new Meteor.Error('not-authorized');
  //   }
  // },
/*
  'seguimientos.remove'(taskId) {
    check(taskId, String);

    const task = Seguimientos.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw articulo Meteor.Error('not-authorized');
    }

    Seguimientos.remove(taskId);
  },
  'seguimientos.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Seguimientos.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can check it off
      throw articulo Meteor.Error('not-authorized');
    }

    Seguimientos.update(taskId, { $set: { checked: setChecked } });
  },
  'seguimientos.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Seguimientos.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== this.userId) {
      throw articulo Meteor.Error('not-authorized');
    }

    Seguimientos.update(taskId, { $set: { private: setToPrivate } });
  },
  */
});