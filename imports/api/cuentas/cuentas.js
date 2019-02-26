import { Mongo } from 'meteor/mongo';

export const Cuentas = new Mongo.Collection('cuentas');

import './methods'