import { withTracker } from 'meteor/react-meteor-data';

import Inicio from '../pages/Inicio.jsx';

export default withTracker(({cambiarTitulo, cuadernoSeleccionada}) => {
  cambiarTitulo("Controla tu Economia");

  return {
  };
})(Inicio);
