import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, List, Typography, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, ListItem, Divider, ListSubheader } from '@material-ui/core';

import ListItemMovimiento from '../components/ListItemMovimiento';

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
    padding: 30,
    paddingTop: 15,
    paddingBottom: 0,
    background: "#FFF"
  },
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
    width: 200,
    height: 200,
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
    width: 100,
    height: 100,
    margin: 'auto',
    borderRadius: '50%',
    lineHeight: 35,
    padding: 0,
  },
  recorte: {
    borderRadius: '50%',
    clip: 'rect(0px, 200px, 200px, 100px)',
    height: '100%',
    position: 'absolute',
    width: '100%',
    transition: 'transform 1s'
  },
  quesito: {
    borderRadius: '50%',
    clip: 'rect(0px, 200px, 200px, 0px)',
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
  porcionGanancias: {
    transform: 'rotate(0deg)',
  },
  porcionGananciasQuesito: {
    backgroundColor: theme.palette.ganancias.backgroundColor,
    transform: 'rotate(0deg)',
  },
  porcionGastos: {
    transform: 'rotate(0deg)',
  },
  porcionGastosQuesito: {
    backgroundColor: theme.palette.gastos.backgroundColor,
    transform: 'rotate(0deg)',
  },
  listaDePorcentajes: {
    width: 'max-content',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    paddingLeft: 0,
    listStyleType: 'none',
    height: 84,
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    marginBottom: 20
  },
  itemListaDePorcentajes:{
    float: 'left',
    width: 75,
    borderLeft: '1px solid #e2e2e2',
    textAlign: 'center',
    background: '#f4f4f4',
  },
  indicadorIngresos: {
    padding: 0,
    margin: 0,
    lineHeight: 3,
    borderTop: '4px solid '+theme.palette.ingresos.backgroundColor,
  },
  indicadorGastos: {
    padding: 0,
    margin: 0,
    lineHeight: 3,
    borderTop: '4px solid '+theme.palette.gastos.backgroundColor,
  },
  indicadorGanancias: {
    padding: 0,
    margin: 0,
    lineHeight: 3,
    borderTop: '4px solid '+theme.palette.ganancias.backgroundColor,
  },
  osPercentage: {
    margin: 0,
    lineHeight: 1,
    padding: '0 0 15px 10px',
    fontSize: 25
  }
});


class Ganancias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
      drawerOpen: false
    };
  }

  renderItems(items) {
    return items.map(item => {
      const styleFont = {color: item.tipo == 'ingresos' ? "#4385d6" : "#de6c6c" };
      const styleIcon = {background: item.tipo == 'ingresos' ? '#4385d6' : '#de6c6c'}
      return (
        <ListItemMovimiento movimiento={item} />
      )
    })
  }

  renderGrafico(valores) {
    const { classes } = this.props;
    
    return (
      <div>
        <div className={classes.donutChart}>
          <div className={classes.contenedorGrafico}>
            <div 
              className={[classes.porcionGastos, classes.recorte].join(' ')}
              style={{transform: 'rotate('+ 0 * 360 + 'deg)'}}
              >
              <div
                className={[classes.porcionGastosQuesito, classes.quesito].join(' ')}
                style={{transform: 'rotate('+ (valores.gastos) * 360 + 'deg)',}}
              />
            </div>
            <div 
              className={[classes.porcionGanancias, classes.recorte].join(' ')}
              style={{transform: 'rotate('+ (valores.gastos) * 360 + 'deg)'}}
              >
              <div
                className={[classes.porcionGananciasQuesito, classes.quesito].join(' ')}
                style={{background: valores.ganancias < 0 && '#b25858',
                  transform: 'rotate('+ (valores.gastos+valores.ganancias) * 360 + 'deg)'}}
              />
            </div>
            <div 
              className={[classes.porcionIngresos, classes.recorte].join(' ')}
              style={{transform: 'rotate('+ (valores.gastos+valores.ganancias) * 360 + 'deg)'}}
              >
              <div
                className={[classes.porcionIngresosQuesito, classes.quesito].join(' ')}
                style={{transform: 'rotate('+ (valores.gastos+valores.ganancias+valores.ingresos) * 360 + 'deg)'}}
              />
            </div>
            <p className={classes.centerDate}></p>
          </div>
        </div>
        <ul className={classes.listaDePorcentajes}>
          <li className={classes.itemListaDePorcentajes}>
            <p className={classes.indicadorIngresos}>Ingresos</p>
            <p className={classes.osPercentage}>{!!valores.ingresos ? (valores.ingresos*100).toFixed(0) : 0}%</p>
          </li>
          <li className={classes.itemListaDePorcentajes}>
            <p className={classes.indicadorGanancias}>Ganancia</p>
            <p className={classes.osPercentage}>{!!valores.ganancias ? (valores.ganancias*100).toFixed(0) : 0}%</p>
          </li>
          <li className={classes.itemListaDePorcentajes}>
            <p className={classes.indicadorGastos}>Gastos</p>
            <p className={classes.osPercentage}>{!!valores.gastos ? (valores.gastos*100).toFixed(0) : 0}%</p>
          </li>
        </ul>
      </div>
    )
  }
  render() {
    const {
      classes,
      ingresos,
      gastos
    } = this.props;

    let items = [];
    let i = 0;
    let g = 0;

    let totales = {
      ingresos: 0,
      gastos: 0,
      ganancias: 0
    }
    while (i < ingresos.length && g < gastos.length) {
      console.log("COMPARACION")
      console.log(ingresos[i].creado)
      console.log(gastos[g].creado)
      if (ingresos[i].creado.getTime() < gastos[g].creado.getTime()) {
        items.push({...ingresos[i], tipo: "ingreso"})
        totales.ingresos += ingresos[i].importe
        totales.ganancias += ingresos[i].importe
        i++
      } else {
        items.push({...gastos[g], tipo: "gasto"})
        totales.gastos += gastos[g].importe
        totales.ganancias -= gastos[g].importe
        g++
      }
    }
    while (i < ingresos.length) {
      items.push({...ingresos[i], tipo: "ingreso"})
      totales.ingresos += ingresos[i].importe
      totales.ganancias += ingresos[i].importe
      i++
    }
    while ( g < gastos.length) {
      items.push({...gastos[g], tipo: "gasto"})
      totales.gastos += gastos[g].importe
      totales.ganancias -= gastos[g].importe
      g++
    }
    let total = totales.ingresos + totales.gastos + totales.ganancias
    let porcentajes= {
      gastos: totales.gastos/total,
      ingresos: totales.ingresos/total,
      ganancias: totales.ganancias/total
    }

    return (
      <div className={classes.root}>
        <List dense={true} className={classes.rootList}>
          <ListSubheader className={classes.listaGrafico}>
            <Typography variant="h4" className={classes.titulo}>Ganancias</Typography>
            <Link to={'/'}>Inicio</Link>
            {this.renderGrafico(porcentajes)}
            <Divider />
          </ListSubheader>
          <List dense={false} className={classes.listaItems}>
            {this.renderItems(items)}
          </List>
        </List>
      </div>
    )
  }
};

Ganancias.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Ganancias);