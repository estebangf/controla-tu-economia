import { Mongo } from 'meteor/mongo';

export const Presupuestos = new Mongo.Collection('presupuestos');

import './methods'