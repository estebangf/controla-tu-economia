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

class MovimientosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
      drawerOpen: false
    };
  }

  renderMovimientos() {
    const { movimientos } = this.props;

    return movimientos.map(mov => {
      const movimiento = {...mov, tipo: mov.importe < 0 ? "egreso" : "ingreso"}
      return (
        <ListItemMovimiento movimiento={movimiento} />
      )
    })
  }

  render() {
    const { classes, pagina } = this.props;
    return (
      <div className={classes.root}>
        <Link className={classes.link} to={'/movimientos/'+pagina+'/nuevo'}>
          Nuevo Movimiento
        </Link>
        
        <List className={classes.root}>
          {this.renderMovimientos()}
        </List>
      </div>
    )
  }
};

MovimientosList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MovimientosList);