import { Mongo } from 'meteor/mongo';

export const Seguimientos = new Mongo.Collection('seguimientos');

import './methods'