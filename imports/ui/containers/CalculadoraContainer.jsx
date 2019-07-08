import { withTracker } from 'meteor/react-meteor-data';

import Calculadora from '../pages/Calculadora.jsx';

export default withTracker(({cambiarTitulo, cuadernoSeleccionada}) => {
  cambiarTitulo("Calculadora");

  return {
  };
})(Calculadora);
