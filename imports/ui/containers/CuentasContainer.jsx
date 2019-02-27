import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import CuentasList from '../pages/CuentasList.jsx';
import { Cuentas } from '/imports/api/cuentas/cuentas';

export default withTracker(() => {
  const publicHandle = Meteor.subscribe('cuentas');
  const loading = !publicHandle.ready();
//  const cuentas = Cuentas.find({}, { sort: { createdAt: -1 } }).fetch();
  const cuentas = Cuentas.find({}).fetch();
  const cuentasExists = !loading && !!cuentas;

  return {
    loading,
    cuentasExists,
    cuentas: cuentasExists ? cuentas : [],
  };
})(CuentasList);
