import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, Typography, ListItemAvatar, Avatar, List, ListItemText, ListItemSecondaryAction, ListItem } from '@material-ui/core';

import ListItemPresupuesto from '../components/ListItemPresupuesto';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const drawerWidth = 240;

const styles = theme => ({
  rootList: {
    paddingBottom: 64
  },
  fab: {
    margin: theme.spacing.unit,
    background: "#FFF",
    position: 'fixed',
    bottom: theme.spacing.unit * 1,
    right: theme.spacing.unit * 1,
    // [theme.breakpoints.up('lg')]: {
    //   bottom: theme.spacing.unit * 1 + 50,
    //   right: theme.spacing.unit * 1 + 210,
    // },
  },
  egresosFab: {
    color: "#FFF",
    background: theme.palette.egresos.backgroundColor,
    '&:hover': {
      background: theme.palette.egresos.buttonHover
    },
  },
  ingresosFab: {
    color: "#FFF",
    background: theme.palette.ingresos.backgroundColor,
    '&:hover': {
      background: theme.palette.ingresos.buttonHover
    },
  },
  transferenciasFab: {
    color: "#FFF",
    background: theme.palette.seguimientos.backgroundColor,
    '&:hover': {
      background: theme.palette.seguimientos.buttonHover
    },
  }
});

class PresupuestosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
      drawerOpen: false
    };
  }

  renderPresupuestos() {
    const { presupuestos, movimientos } = this.props;

    return presupuestos.map(presupuesto => {
      var total = 0;
      var movimientosF = movimientos.filter((m) => {
        return presupuesto.categorias.includes(m.categoria)
      })
      movimientosF.forEach((m) => {
        total -= m.importe
      })
      return (
        <ListItemPresupuesto presupuesto={presupuesto} sumaGastos={total}/>
      )
    })
  }

  render() {
    const { classes, pagina } = this.props;
    return (
      <div className={classes.root}>
        <List className={classes.rootList}>
          {this.renderPresupuestos()}
        </List>

        <Link className={classes.link} to={'/presupuestos/nuevo'}>
          <Fab
            className={[classes.fab, classes["Fab"]].join(' ')}
            onClick={this.handleClick}>
            <AddIcon />
          </Fab>
        </Link>
      </div>
    )
  }
};

PresupuestosList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PresupuestosList);