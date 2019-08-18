import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import CategoriasList from '../pages/CategoriasList.jsx';
import { Categorias } from '/imports/api/categorias/categorias';

export default withTracker(({cambiarTitulo}) => {
  cambiarTitulo("Categorias");
  const publicHandle = Meteor.subscribe('categorias');
  const loading = !publicHandle.ready();
//  const categorias = Categorias.find({}, { sort: { createdAt: -1 } }).fetch();
  const categorias = Categorias.find({}).fetch();
  const categoriasExists = !loading && !!categorias;

  return {
    loading,
    categoriasExists,
    categorias: categoriasExists ? categorias : [],
  };
})(CategoriasList);
