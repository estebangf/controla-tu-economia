import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
});

class Alerta extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      classes,
      alerta,
      handleClose
    } = this.props;

    const {
      open,
      mensaje
    } = alerta
    return (
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={<span id="snackbar-fab-message-id">{mensaje}</span>}
        action={
          <Button color="inherit" size="small" onClick={handleClose}>
            Cerrar
          </Button>
        }
      />
    );
  }
}

Alerta.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Alerta);
