import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Gastos } from '/imports/api/gastos/gastos'
import Gasto from '../pages/Gasto.jsx';

export default withTracker(({ match }) => {
  const gastoId = match.params.id
  const publicHandle = Meteor.subscribe('gasto',gastoId);
  const loading = !publicHandle.ready();
//  const gasto = Gastos.find({}, { sort: { createdAt: -1 } }).fetch();
  const gasto = Gastos.findOne({});
  const gastoExists = !loading && !!gasto;

  return {
    loading,
    gastoExists,
    gasto: gastoExists ? gasto : {},
  };
})(Gasto);
