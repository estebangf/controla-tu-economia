import React, { Component } from 'react';
import PropTypes from 'prop-types';
const LinkGo = require('react-router-dom').Link

import { Link, withStyles } from '@material-ui/core';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    display: 'flex',
    ['-webkit-flex-direction']: 'column'
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.secondary.main,
  },
  divider: {
    backgroundColor: '#ffffff1f',
  },
  listaMedia: {
    backgroundColor: theme.palette.secondary.dark,
    position: 'relative',
    display: 'block',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  listItemText:{
    color: theme.palette.secondary.contrastText,
  },
  listaFooter:{
    flex: '0 0 auto'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 6,
    height: window.innerHeight - 64,
    marginTop: 64,
    paddingTop: 0,
    overflowY: 'auto'
  },
});


class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
      drawerOpen: false
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
          <div>
            <h1>Control Económico!</h1>
            <LinkGo to={'/movimientos/gastos'}>
              <Link>Lista de Gastos</Link>
            </LinkGo>
            <LinkGo to={'/movimientos/gastos/nuevo'}>
              <Link>Nuevo Gasto</Link>
            </LinkGo>
            <LinkGo to={'/movimientos/ingresos/nuevo'}>
              <Link>Nuevo Ingreso</Link>
            </LinkGo>
          </div>
      </div>
    )
  }
};

Inicio.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inicio);