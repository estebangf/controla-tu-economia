import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, List, Typography } from '@material-ui/core';
import ListItemCuenta from '../components/ListItemCuenta';

const drawerWidth = 240;

const styles = theme => ({
  root: {
  },
});


class CuentasList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
      drawerOpen: false
    };
  }
  
  renderCuentas() {
    const { cuentas, cuentaSeleccionada, seleccionarCuenta } = this.props;
    
    return cuentas.map(cuenta => {
      return (
        <ListItemCuenta cuenta={cuenta} seleccionada={cuenta._id == cuentaSeleccionada._id} seleccionarCuenta={seleccionarCuenta} />
      )
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h4" className={classes.titulo}>Cuentas</Typography>
        <Link to={'/'}>Inicio</Link>
        <Link className={classes.link} to={'/cuentas/nueva'}>
          Nueva Cuenta
        </Link>

        <List className={classes.root}>
          {this.renderCuentas()}
        </List>
      </div>
    )
  }
};

CuentasList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CuentasList);