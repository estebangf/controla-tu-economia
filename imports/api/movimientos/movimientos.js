import { Mongo } from 'meteor/mongo';

export const Movimientos = new Mongo.Collection('movimientos');

import './methods'

/*

NOTICIA:
titulo: String, // Título (destaca lo más importante de la noticia).
fecha: Date, // Fecha de la noticia o mas bien de la carga de la misma.
lugar: String, // Lugar referente.
copete: String, // (se encuentra debajo del título y es la síntesis de lo más importante del texto).
cuerpo: String, // Cuerpo de la noticia (se da la información completa, de mayor a menor importancia).
imagen: Img, // Fotografía (de acuerdo al texto; puede ser opcional).
textoImagen: String, // Epígrafe (debe ubicar a la fotografía en la noticia y enunciar de qué trata la fotografía).

*/
