import { Meteor } from 'meteor/meteor';

import { Ingresos } from '../../api/ingresos/ingresos.js'
import { Gastos } from '../../api/gastos/gastos.js'
import { Cuentas } from '../../api/cuentas/cuentas.js'
import { Cuadernos } from '../../api/cuadernos/cuadernos.js'
import { Movimientos } from '../../api/movimientos/movimientos.js'
import { Categorias } from '../../api/categorias/categorias.js'


/*
// INICIO DE SISTEMA DE CUENTAS:
const users = Meteor.users.find({}).fetch()
users.forEach(user => {
  var cuentas = Cuentas.find({userId: user._id}).fetch()
  if(cuentas.length === 0){
    var cuentaNuevaId = Cuentas.insert({
      cuentaVinculada: '',
      nombre: "Cuenta 1",
      descripcio: "Creada por sistema",
      userId: user._id,
      creada: new Date()
    })
    Ingresos.update({ userId: user._id }, {
      $set: {
        cuentaId: cuentaNuevaId
      }
    }, { multi: true });
    Gastos.update({ userId: user._id }, {
      $set: {
        cuentaId: cuentaNuevaId
      }
    }, { multi: true });
  }
});
*/

/*
// INGRESOS Y GASTOS A MOVIMIENTOS POSITIVOS Y NEGATIVOS
const ingresos = Ingresos.find({}).fetch();
ingresos.forEach(ingreso => {
  Movimientos.insert({
    detalle: ingreso.detalle,
    descripcion: ingreso.descripcion,
    importe: ingreso.importe,
    variaLaGanancia: !ingreso.esPrestamo,
    cuentaId: ingreso.cuentaId,
    userId: ingreso.userId,
    creado: ingreso.creado,
    fecha: ingreso.creado
  });
})

const gastos = Gastos.find({}).fetch();
gastos.forEach(gasto => {
  Movimientos.insert({
    detalle: gasto.detalle,
    descripcion: gasto.descripcion,
    importe: 0 - gasto.importe,
    variaLaGanancia: gasto.esInsumo,
    cuentaId: gasto.cuentaId,
    userId: gasto.userId,
    creado: gasto.creado,
    fecha: gasto.creado
  });
})
*/

/*
// PASE DE CUENTAS A CUADERNOS
const cuentasNoVinculadas = Cuentas.find({cuentaVinculada: ""}).fetch();
cuentasNoVinculadas.forEach(cuenta => {
  var cuadernoNuevoId = Cuadernos.insert({
    cuadernoVinculado: cuenta.cuentaVinculada,
    nombre: cuenta.nombre,
    descripcion: cuenta.descripcion,
    userId: cuenta.userId,
    creado: cuenta.creada
  })
  Movimientos.update({ cuentaId: cuenta._id }, {
    $set: {
      cuadernoId: cuadernoNuevoId
    },
//    $unset: {
//      cuentaVinculada: true
//    }
  }, { multi: true });

  var cuentasVinculadas = Cuentas.find({cuentaVinculada: cuenta._id}).fetch();
  cuentasVinculadas.forEach(cuentaV => {
    Cuadernos.insert({
      cuadernoVinculado: cuadernoNuevoId,
      nombre: cuentaV.nombre,
      descripcion: cuentaV.descripcion,
      userId: cuentaV.userId,
      creado: cuentaV.creada
    })
  })
})
*/

/*
// CREACION DE CATEGORIAS:

const nombresCategorias = [
  "Alimentacion",
  "Casa",
  "Transporte",
  "Vestimenta",
  "Juguetes",
  "Salud",
  "Higiene",
  "Educacion",
  "Diversion",
  "Viajes",
  "Ahorros",
  "Impuestos",
  "Iglesia",
  "Diezmos",
  "Oferndas de Ayuno",
  "Servicios",
  "Compras",
  "Seguros",
  "Deudas",
  "Creditos",
  "Prestamos",
  "Inversiones",
  "Reparaciones",
  "Trabajo",
  "Varios",
  "Sin Categoria",
]


const nombresCategoriasInclude = {
  Alimentacion: "Alimentacioncomidacomidaspan",
  Casa: "Casa",
  Transporte: "Transportesubecole",
  Vestimenta: "Vestimentaropacalsadozapatillasmedias",
  Juguetes: "Juguetes",
  Salud: "Salud",
  Higiene: "Higiene",
  Educacion: "Educacion",
  Diversion: "Diversion",
  Viajes: "Viajes",
  Ahorros: "Ahorros",
  Impuestos: "Impuestos",
  Iglesia: "Iglesia",
  Diezmos: "Diezmos",
  "Oferndas de Ayuno": "Oferndas de Ayuno",
  Servicios: "Servicios",
  Compras: "Compras",
  Seguros: "Seguros",
  Deudas: "Deudas",
  Creditos: "Creditos",
  Prestamos: "Prestamos",
  Inversiones: "Inversiones",
  Reparaciones: "Reparaciones",
  Trabajo: "Trabajosueldo",
  Varios: "Varios",
  "Sin Categoria": "Sin Categoria",
}

nombresCategorias.forEach(nombre => {
  Categorias.insert({
    nombre: nombre
  })
});

const categorias = Categorias.find({}).fetch()

const movimientos = Movimientos.find({
  // categoria: { "$nin": ['', null, undefined ] },
}).fetch()
var movimientosCategorizados = movimientos.filter(m => {
  return !!m.categoria
}).map(m =>{
  return m._id
})

categorias.forEach(categoria => {
  var categorizarDetalle = movimientos.filter(movimiento => {
    var categorizado = movimientosCategorizados.includes(movimiento._id)
    var categorizar = movimiento.detalle != '' && (
      movimiento.detalle.toLowerCase().includes(categoria.nombre.toLowerCase()) ||
      nombresCategoriasInclude[categoria.nombre].toLowerCase().includes(movimiento.detalle.toLowerCase())
    )
    return (!categorizado && categorizar)
  })

  categorizarDetalle.forEach(m => {
    Movimientos.update({
      _id: m._id,
    },{
      $set: {
        categoria: categoria._id,
        detalle: !!m.descripcion ? m.descripcion : m.detalle,
        descripcion: '',
      }
    })
    movimientosCategorizados.push(m._id)
  })

  var categorizarDescripcion = movimientos.filter(movimiento => {
    var categorizado = movimientosCategorizados.includes(movimiento._id)
    var categorizar =  movimiento.descripcion != '' && (
      movimiento.descripcion.toLowerCase().includes(categoria.nombre.toLowerCase()) ||
      nombresCategoriasInclude[categoria.nombre].toLowerCase().includes(movimiento.descripcion.toLowerCase())
    )
    return (!categorizado && categorizar)
  })

  categorizarDescripcion.forEach(m => {
    Movimientos.update({
      _id: m._id,
    },{
      $set: {
        categoria: categoria._id,
        descripcion: '',
      }
    })
    movimientosCategorizados.push(m._id)
  })
})

const sinCategoria = Categorias.findOne({nombre: "Sin Categoria"})
const movimientosSinCategoria = movimientos.filter(m => {
  return !movimientosCategorizados.includes(m._id)
})
movimientosSinCategoria.forEach(m => {
  Movimientos.update({
    _id: m._id,
    },{
      $set: {
        categoria: sinCategoria._id,
      }
  })
})
*/