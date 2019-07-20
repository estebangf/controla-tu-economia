import { Mongo } from 'meteor/mongo';

export const Categorias = new Mongo.Collection('categorias');

import './methods'