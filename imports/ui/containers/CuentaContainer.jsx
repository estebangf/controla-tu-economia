import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Cuentas } from '/imports/api/cuentas/cuentas'
import Cuenta from '../pages/Cuenta.jsx';

export default withTracker(({ match }) => {
  const cuentaId = match.params.id
  const publicHandle = Meteor.subscribe('cuenta',cuentaId);
  const loading = !publicHandle.ready();
//  const cuenta = Cuentas.find({}, { sort: { createdAt: -1 } }).fetch();
  const cuenta = Cuentas.findOne({_id: cuentaId});
  const cuentaExists = !loading && !!cuenta;

  console.log("cuentaExists");
  console.log(cuenta);
  console.log(cuentaExists);
  

  return {
    loading,
    cuentaExists,
    cuenta: cuentaExists ? cuenta : {},
  };
})(Cuenta);
