import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, List, Typography } from '@material-ui/core';
import ListItemMovimiento from '../components/ListItemMovimiento';

const drawerWidth = 240;

const styles = theme => ({
  root: {
  },
});


class GastosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
      drawerOpen: false
    };
  }
  
  renderGastos() {
    const { gastos } = this.props;

    return gastos.map(gasto => {
      return (
        <ListItemMovimiento movimiento={{...gasto, tipo: "gasto"}} />
      )
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h4" className={classes.titulo}>Gastos</Typography>
        <Link to={'/'}>Inicio</Link>
        <Link className={classes.link} to={'/movimientos/gastos/nuevo'}>
          Nuevo Gasto
        </Link>

        <List className={classes.root}>
          {this.renderGastos()}
        </List>
      </div>
    )
  }
};

GastosList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GastosList);