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
  iconoSeccionPrincipal: {
    width: 75,
    height: 75,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  },
  iconoSeccion: {
    width: 50,
    height: 50,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  },
  divIconoSeccion:{
    background: "#00000099",
    padding: 20,
    paddingBottom: 15,
    borderRadius: "100%",
    width: "fit-content",
    margin: "auto",
    marginBottom: 5,
    marginTop: 5,
    boxShadow: "0 5px 5px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)"
  },
  divSeccion: {
    display: 'flex'
  },
  link:{
    textDecoration: 'none'
  },
  linkSeccion:{
    textDecoration: 'none',
    margin: "auto",
  },
  btnCuadernos: {
    color: theme.palette.cuadernos.buttonText,
    backgroundColor: theme.palette.cuadernos.backgroundColor,
    '&:hover': {
      backgroundColor: theme.palette.cuadernos.buttonHover,
    },
    marginBottom: 15,
    fontSize: 15,
    padding: 15
  },
  btnGastos: {
    color: theme.palette.egresos.buttonText,
    backgroundColor: theme.palette.egresos.backgroundColor,
    '&:hover': {
      backgroundColor: theme.palette.egresos.buttonHover,
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
  btnSeguimientos: {
    color: theme.palette.seguimientos.buttonText,
    backgroundColor: theme.palette.seguimientos.backgroundColor,
    '&:hover': {
      backgroundColor: theme.palette.seguimientos.buttonHover,
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

  renderLinksMovimientos() {
    const {
      classes,
      cuadernosExists
    } = this.props;

    if(cuadernosExists) {
      return ([
        <div className={classes.divSeccion}>
          <Link className={classes.linkSeccion} to={'/movimientos/balance'}>
            <div className={classes.divIconoSeccion}>
              <div className={classes.iconoSeccionPrincipal} style={{backgroundImage: "url(/balanza_c.png)"}} />
            </div>
          </Link>
          <Link className={classes.linkSeccion} to={'/movimientos/ganancia'}>
            <div className={classes.divIconoSeccion}>
              <div className={classes.iconoSeccionPrincipal} style={{backgroundImage: "url(/ganancia_c.png)"}} />
            </div>
          </Link>
        </div>,
        <div className={classes.divSeccion}>
          <Link className={classes.linkSeccion} to={'/movimientos/ingresos'}>
          <div className={classes.divIconoSeccion}>
            <div className={classes.iconoSeccion} style={{backgroundImage: "url(/ingreso_c.png)"}} />
          </div>
          </Link>
          <Link className={classes.linkSeccion} to={'/movimientos/egresos'}>
          <div className={classes.divIconoSeccion}>
            <div className={classes.iconoSeccion} style={{backgroundImage: "url(/egreso_c.png)"}} />
          </div>
          </Link>
          <Link className={classes.linkSeccion} to={'/movimientos/transferencias'}>
          <div className={classes.divIconoSeccion}>
            <div className={classes.iconoSeccion} style={{backgroundImage: "url(/transferencia_c.png)"}} />
          </div>
          </Link>
        </div>,
        <Link className={classes.link} to={'/movimientos/seguimientos'}>
          <Button fullWidth={true} variant="contained" className={classes.btnSeguimientos}>Seguimientos</Button>
        </Link>,
      ])
    }
  }

  render() {
    const { 
      classes,
    } = this.props;
    return (
      <div className={classes.root}>
        <img className={classes.logoImgaen} src="/icono196x196.png" />
        
        <Link className={classes.link} to={'/cuadernos/'}>
          <Button fullWidth={true} variant="contained" className={classes.btnCuadernos}>Lista de Cuadernos</Button>
        </Link>

        {this.renderLinksMovimientos()}
      </div>
    )
  }
};

Inicio.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inicio);