import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Transferencias } from './transferencias.js'
import { Movimientos } from '../movimientos/movimientos.js'

Meteor.methods({
  'transferencia.nueva'(detalle, fecha, descripcion, importe, cuadernoEgreso, egresoVariaLaGanancia, ingresoVariaLaGanancia, cuadernoIngreso) {
    check(detalle, String);
    check(fecha, Date);
    check(descripcion, String);
    check(importe, Number);
    check(cuadernoEgreso, String);
    check(egresoVariaLaGanancia, Boolean);
    check(cuadernoIngreso, String);
    check(ingresoVariaLaGanancia, Boolean);

    if (!!this.userId) {

      const transferenciaId = Transferencias.insert({
        egresoId: "",
        ingresoId: "",
        userId: this.userId,
        creada: new Date(),
        fecha
      });

      const egresoId = Movimientos.insert({
        detalle,
        descripcion,
        importe: 0 - importe,
        variaLaGanancia: egresoVariaLaGanancia,
        cuadernoId: cuadernoEgreso,
        transferenciaId,
        userId: this.userId,
        creado: new Date(),
        fecha: fecha
      });
      const ingresoId = Movimientos.insert({
        detalle,
        descripcion,
        importe,
        variaLaGanancia: ingresoVariaLaGanancia,
        cuadernoId: cuadernoIngreso,
        transferenciaId,
        userId: this.userId,
        creado: new Date(),
        fecha: fecha
      });

      return Transferencias.update(transferenciaId, {
        $set: {
          egresoId,
          ingresoId
        }
      });
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
  'transferencia.editar'(id, detalle, fecha, descripcion, importe, cuadernoEgreso, egresoVariaLaGanancia, ingresoVariaLaGanancia, cuadernoIngreso) {
    check(id, String);
    check(detalle, String);
    check(fecha, Date);
    check(descripcion, String);
    check(importe, Number);
    check(cuadernoEgreso, String);
    check(egresoVariaLaGanancia, Boolean);
    check(cuadernoIngreso, String);
    check(ingresoVariaLaGanancia, Boolean);

    if (!!this.userId) {

      const transferencia = Transferencias.findOne({
        _id: id
      });

      Movimientos.update(transferencia.egresoId, {
        $set: {
          detalle,
          descripcion,
          importe: 0 - importe,
          variaLaGanancia: egresoVariaLaGanancia,
          cuadernoId: cuadernoEgreso,
          fecha: fecha
        }
      });

      Movimientos.update(transferencia.ingresoId, {
        $set: {
          detalle,
          descripcion,
          importe: importe,
          variaLaGanancia: ingresoVariaLaGanancia,
          cuadernoId: cuadernoIngreso,
          fecha: fecha
        }
      });

      return Transferencias.update(id, {
        $set: {
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
      const transferencia = Transferencias.findOne({_id: id})
      if (!!transferencia) {        
        Movimientos.remove(transferencia.egresoId);
        Movimientos.remove(transferencia.ingresoId);
        return Transferencias.remove(id);
      } else {
        // throw new Meteor.Error('transferencia-not-found');
      }
    } else {
      throw new Meteor.Error('not-authorized');
    }
  },
});
