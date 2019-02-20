import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, Typography, ListItemAvatar, Avatar, List, ListItemText, ListItemSecondaryAction, ListItem } from '@material-ui/core';

import ListItemMovimiento from '../components/ListItemMovimiento';

const drawerWidth = 240;

const styles = theme => ({
  root: {
  },
});


class IngresosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
      drawerOpen: false
    };
  }

  renderIngresos() {
    const { ingresos } = this.props;

    return ingresos.map(ingreso => {

      return (
        <ListItemMovimiento movimiento={{...ingreso, tipo: "ingreso"}} />
      )
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h4" className={classes.titulo}>Ingresos</Typography>
        <Link to={'/'}>Inicio</Link>
        <Link className={classes.link} to={'/movimientos/ingresos/nuevo'}>
          Nuevo Ingreso
        </Link>
        
        <List className={classes.root}>
          {this.renderIngresos()}
        </List>
      </div>
    )
  }
};

IngresosList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IngresosList);