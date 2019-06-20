import { Mongo } from 'meteor/mongo';

export const Cuadernos = new Mongo.Collection('cuadernos');

import './methods'