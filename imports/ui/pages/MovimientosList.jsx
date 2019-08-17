import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, Typography, ListItemAvatar, Avatar, List, ListItemText, ListItemSecondaryAction, ListItem } from '@material-ui/core';

import ListItemMovimiento from '../components/ListItemMovimiento';

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

class MovimientosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
      drawerOpen: false
    };
  }

  renderMovimientos() {
    const { movimientos, categorias } = this.props;

    return movimientos.map(mov => {
      const categoria = categorias.filter((c) => {
        return c._id == mov.categoria
      })
      const movimiento = {
        ...mov,
        tipo: mov.importe < 0 ? "egreso" : "ingreso",
        categoriaNombre: !!categoria.length ? categoria[0].nombre : "Sin Categoria"
      }

      return (
        <ListItemMovimiento movimiento={movimiento} />
      )
    })
  }

  render() {
    const { classes, pagina } = this.props;
    return (
      <div className={classes.root}>
        <List className={classes.rootList}>
          {this.renderMovimientos()}
        </List>

        <Link className={classes.link} to={'/movimientos/'+pagina+'/nuevo'}>
          <Fab
            className={[classes.fab, classes[pagina+"Fab"]].join(' ')}
            onClick={this.handleClick}>
            <AddIcon />
          </Fab>
        </Link>
      </div>
    )
  }
};

MovimientosList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MovimientosList);