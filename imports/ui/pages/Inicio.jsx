import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import red from '@material-ui/core/colors/red';

import { withStyles, Typography, Button } from '@material-ui/core';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    padding: 15,
    textAlign: 'center',
  },
  logoImgaen: {
    height: 150,
    margin: 'auto',
  },
  link:{
    textDecoration: 'none'
  },
  btnGastos: {
    color: theme.palette.gastos.buttonText,
    backgroundColor: theme.palette.gastos.backgroundColor,
    '&:hover': {
      backgroundColor: theme.palette.gastos.buttonHover,
    },
    marginBottom: 15,
    fontSize: 15,
    padding: 15
  },
  btnIngresos: {
    color: theme.palette.ingresos.buttonText,
    backgroundColor: theme.palette.ingresos.backgroundColor,
    '&:hover': {
      backgroundColor: theme.palette.ingresos.buttonHover,
    },
    marginBottom: 15,
    fontSize: 15,
    padding: 15
  },
  btnBalance: {
    color: theme.palette.balance.buttonText,
    backgroundColor: theme.palette.balance.backgroundColor,
    '&:hover': {
      backgroundColor: theme.palette.balance.buttonHover,
    },
    marginBottom: 15,
    fontSize: 15,
    padding: 15
  },
  btnGanancias: {
    color: theme.palette.ganancias.buttonText,
    backgroundColor: theme.palette.ganancias.backgroundColor,
    '&:hover': {
      backgroundColor: theme.palette.ganancias.buttonHover,
    },
    marginBottom: 15,
    fontSize: 15,
    padding: 15
  },
  btnMetas: {
    color: theme.palette.metas.buttonText,
    backgroundColor: theme.palette.metas.backgroundColor,
    '&:hover': {
      backgroundColor: theme.palette.metas.buttonHover,
    },
    marginBottom: 15,
    fontSize: 15,
    padding: 15
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
        <Typography variant="h4" className={classes.titulo}>Control Económico!</Typography>
        <img className={classes.logoImgaen} src="/icono196x196.png" />

        <Link className={classes.link} to={'/movimientos/gastos'}>
          <Button fullWidth="true" variant="contained" className={classes.btnGastos}>Lista de Gastos</Button>
        </Link>
        <Link className={classes.link} to={'/movimientos/ingresos'}>
          <Button fullWidth="true" variant="contained" className={classes.btnIngresos}>Lista de Ingreso</Button>
        </Link>
        <Link className={classes.link} to={'/movimientos/metas'}>
          <Button fullWidth="true" variant="contained" className={classes.btnMetas}>Metas</Button>
        </Link>
        <Link className={classes.link} to={'/movimientos/balance'}>
          <Button fullWidth="true" variant="contained" className={classes.btnBalance}>Balance</Button>
        </Link>
        <Link className={classes.link} to={'/movimientos/ganancias'}>
          <Button fullWidth="true" variant="contained" className={classes.btnGanancias}>Ganancias</Button>
        </Link>
      </div>
    )
  }
};

Inicio.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inicio);