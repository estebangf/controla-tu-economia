import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, List, Typography, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, ListItem, Divider, ListSubheader, Paper } from '@material-ui/core';

import ListItemMovimiento from '../components/ListItemMovimiento';
import Autocomplete from '../components/Autocomplete';

const drawerWidth = 240;

const styles = theme => ({
  rootList: {
    paddingTop: 0,
  },
  titulo: {
    textAlign: 'center',
    paddingTop: 15
  },

  listaGrafico:{
    background: '#FFF',
    padding: 0,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 0,
    top: 47,
    position: "sticky",
    paddingTop: 5,
    [theme.breakpoints.up('lg')]: {
      top: 0,
    }
//    background: "#FFF"
  },
  /*
  listaGrafico:{
    padding: 30,
    paddingTop: 15,
    paddingBottom: 0,
//    background: "#FFF"
  },*/

  barraGrafico:{
    transition: 'width 0.5s',
    display: '-webkit-box',
    height: 25,
    width: 0
  },
  listaItems:{
    paddingRight: 10
  },
  donutChart: {
    position: 'relative',
    width: 100,
    height: 100,
    margin: 'auto',
    borderRadius: '100%',
    transform: "rotateY(180deg)"
  },
  contenedorGrafico:{
    height: '100%',
    width: '100%',
    transform: "rotate(-90deg)"
  },
  centerDate: {
    background: '#FFF',
    position: 'absolute',
    textAlign: 'center',
    fontSize: 28,
    top:0,
    left:0,
    bottom:0,
    right:0,
    width: 50,
    height: 50,
    margin: 'auto',
    borderRadius: '50%',
    lineHeight: 35,
    padding: 0,
  },
  recorte: {
    borderRadius: '50%',
    clip: 'rect(0px, 100px, 100px, 50px)',
    height: '100%',
    position: 'absolute',
    width: '100%',
    transition: 'transform 1s'
  },
  quesito: {
    borderRadius: '50%',
    clip: 'rect(0px, 100px, 100px, 0px)',
    height: '100%',
    position: 'absolute',
    width: '100%',
    fontFamily: 'monospace',
    fontSize: '1.5rem',
    transition: 'transform 1s'
  },
  porcionIngresos: {
    transform: 'rotate(0deg)',
  },
  porcionIngresosQuesito: {
    backgroundColor: theme.palette.ingresos.backgroundColor,
    transform: 'rotate(0deg)',
  },
  porcionSeguimientos: {
    transform: 'rotate(0deg)',
  },
  porcionSeguimientosQuesito: {
    backgroundColor: theme.palette.seguimientos.backgroundColor,
    transform: 'rotate(0deg)',
  },
  porcionGastos: {
    transform: 'rotate(0deg)',
  },
  porcionGastosQuesito: {
    backgroundColor: theme.palette.egresos.backgroundColor,
    transform: 'rotate(0deg)',
  },
  listaDePorcentajes: {
    width: 'max-content',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    paddingLeft: 0,
    listStyleType: 'none',
    height: 90,
    marginBottom: 20
  },
  itemListaDePorcentajes:{
    width: 85,
    height: 75,
    margin: 10,
    float: 'left',
    border: 'none',
    textAlign: 'center',
    background: '#00000000',
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
  },
  indicador: {
    padding: 0,
    paddingTop: 5,
    margin: 0,
    lineHeight: 3,
  },
  backgroundIngresos: {
    fontSize: 12.5,
    backgroundImage: 'radial-gradient(#FFF, '+theme.palette.ingresos.backgroundColor+')',
  },
  backgroundGastos: {
    fontSize: 12.5,
    backgroundImage: 'radial-gradient(#FFF, '+theme.palette.egresos.backgroundColor+')',
  },
  backgroundSeguimientos: {
    width: 105,
    height: 95,
    margin: 0,
    fontSize: 18,
    paddingTop: 0,
    backgroundImage: 'radial-gradient(#FFF, '+theme.palette.seguimientos.backgroundColor+')',
  },
  osPercentage: {
    margin: 0,
    lineHeight: 1,
    fontSize: 10,
    display: 'none'
  },
  osValores: {
    margin: 0,
    lineHeight: 1,
    paddingBottom: 10,
    fontSize: 20
  },
  filtro: {
    padding: 10,
    margin: '30px 15px 10px 15px'
  }
});


class Seguimientos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
      drawerOpen: false,
      detalleFiltro: ''
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }
  onSelectDetalleFiltro(){

  }

  renderItems(movimientos) {
    return movimientos.map(mov => {
      const movimiento = {...mov, tipo: mov.importe < 0 ? "egreso" : "ingreso"}
      return (
        <ListItemMovimiento movimiento={movimiento} />
      )
    })
  }

  renderGrafico(totales, porcentajes) {
    const { classes } = this.props;

    return (
      <ul className={classes.listaDePorcentajes}>
        <li className={[classes.itemListaDePorcentajes, classes.backgroundIngresos].join(' ')}>
          <p className={classes.indicador}>Ingresos</p>
          <p className={classes.osValores}>$ {!!totales.ingresos ? totales.ingresos.toFixed(0) : 0}</p>
          <p className={classes.osPercentage}>{!!porcentajes.ingresos ? (porcentajes.ingresos*100).toFixed(0) : 0}%</p>
        </li>
        <li className={[classes.itemListaDePorcentajes, classes.backgroundSeguimientos].join(' ')}>
          <p className={classes.indicador}>Total</p>
          <p className={classes.osValores}>$ {!!totales.saldo ? totales.saldo.toFixed(0) : 0}</p>
          <p className={classes.osPercentage}>{!!porcentajes.saldo ? (porcentajes.saldo*100).toFixed(0) : 0}%</p>
        </li>
        <li className={[classes.itemListaDePorcentajes, classes.backgroundGastos].join(' ')}>
          <p className={classes.indicador}>Egresos</p>
          <p className={classes.osValores}>$ {!!totales.egresos ? totales.egresos.toFixed(0) : 0}</p>
          <p className={classes.osPercentage}>{!!porcentajes.egresos ? (porcentajes.egresos*100).toFixed(0) : 0}%</p>
        </li>
      </ul>
    )
  }
  render() {
    const {
      classes,
      movimientos,
    } = this.props;

    const {
      detalleFiltro
    } = this.state;

    const movimientosFiltrados = movimientos.filter((movimiento) => {
      return movimiento.detalle.toLowerCase().includes((!!detalleFiltro ? detalleFiltro.toLowerCase() : ''));
    })

    let totales = {
      ingresos: 0,
      egresos: 0,
      saldo: 0
    }
    movimientosFiltrados.forEach(movimiento => {
      if (movimiento.importe >= 0) {
        totales.ingresos += movimiento.importe
      } else {
        totales.egresos += Math.abs(movimiento.importe)
      }
      totales.saldo += movimiento.importe
    })

    let total = totales.ingresos + totales.egresos + totales.saldo
    let porcentajes= {
      egresos: totales.egresos/total,
      ingresos: totales.ingresos/total,
      saldo: totales.saldo/total
    }

    return (
      <div className={classes.root}>
        <List dense={true} className={classes.rootList}>
          <ListSubheader className={classes.listaGrafico}>
            {this.renderGrafico(totales, porcentajes)}
            <div className={classes.filtro}>
              <Autocomplete
                id="filtro-detalle"
                items={[
                  {
                    primary: "Sueldo",
                    secondary: undefined,
                    data: { _id: "1", name: "Sueldo", email: "some@email.com" }
                  },
                  {
                    primary: "Carton",
                    secondary: undefined,
                    data: { _id: "2", name: "Carton", email: "some@email.com" }
                  },
                  {
                    primary: "Tomate",
                    secondary: undefined,
                    data: { _id: "3", name: "Tomate", email: "some@email.com" }
                  },
                ]}
                inputDetails={{
                  id: "detalle",
                  name: "detalle",
                  label: "Detalle",
                  placeholder: "Detalle",
                  fullWidth: true,
                  variant:"outlined"
                  //            avatar: "circle"
                }}
                onSelect={this.onSelectDetalleFiltro}
                onChange={this.handleChange("detalleFiltro")}
                value={detalleFiltro}
                disconect={detalleFiltro !== "new"}
              />
            </div>
            <Divider />
          </ListSubheader>
          <List dense={false} className={classes.listaItems}>
            {this.renderItems(movimientosFiltrados)}
          </List>
        </List>
      </div>
    )
  }
};

Seguimientos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Seguimientos);
