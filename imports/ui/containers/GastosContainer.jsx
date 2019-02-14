import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import GastosList from '../pages/GastosList.jsx';
import { Gastos } from '/imports/api/gastos/gastos';

export default withTracker(() => {
  const publicHandle = Meteor.subscribe('gastos');
  const loading = !publicHandle.ready();
//  const gastos = Gastos.find({}, { sort: { createdAt: -1 } }).fetch();
  const gastos = Gastos.find({}).fetch();
  const gastosExists = !loading && !!gastos;

  return {
    loading,
    gastosExists,
    gastos: gastosExists ? gastos : [],
  };
})(GastosList);
