import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, List, Typography, Grid, Paper, Button } from '@material-ui/core';
import ListItemCuaderno from '../components/ListItemCuaderno';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const drawerWidth = 240;

const operadores = [
  '/',
  '*',
  '-',
  '+',
  '='
]

const acciones = [
  'CE',
  'C',
  '<<'
]

const numeros = [
  '7',
  '8',
  '9',
  '4',
  '5',
  '6',
  '1',
  '2',
  '3',
  '+/-',
  '0',
  '.'
]


const styles = theme => ({
  calculadora: {
    maxWidth: 64*4,
    minWidth: 64*4,
    paddingTop: 16
  },
  historial:{
    minHeight: 25,
    textAlign: 'right',
    paddingRight: 30
  },
  total:{
    float: 'left',
    paddingLeft: 16
  },
  valores:{
    minHeight: 25,
    textAlign: 'right',
    paddingRight: 30
  },
  btn: {
    height: 64,
  },
  error:{
    color: 'red',
    minHeight: 25,
    textAlign: 'right',
    paddingRight: 30
  },
  fab: {
    margin: theme.spacing.unit,
    background: "#FFF",
    position: 'fixed',
    bottom: theme.spacing.unit * 1,
    right: theme.spacing.unit * 1,
    [theme.breakpoints.up('lg')]: {
      bottom: theme.spacing.unit * 1 + 50,
      right: theme.spacing.unit * 1 + 210,
    },
  },
});

class Calculadora extends Component {
  constructor(props) {
    super(props);

    const estadoGuardado = JSON.parse(sessionStorage.getItem('estadoCalculadora'))
    
    this.state = {
      historial: '',
      valor: '0',
      error: '',
      ...estadoGuardado
    };
  }

  presNum = (valor) => {
    const valorPrev = this.state.valor
    var valorNuevo = ''
    var error = ''

    switch (valor) {
      case '.':
        if (valorPrev.includes(valor)) {
          valorNuevo = valorPrev
          error = "Decimal ya usado"
        } else {
          switch (valorPrev) {
            case 'NaN':
            case '-NaN':
            case 'Infinity':
            case '-Infinity':
              valorNuevo = '0.'
              break;
          
            default:
              valorNuevo = valorPrev + valor
              break;
          }
        }
        break;
      case '+/-':
        switch (valorPrev[0]) {
          case '-':
              valorNuevo = valorPrev.slice(1)
            break;
          default:
            valorNuevo = '-'+valorPrev
            break;
        }
        break;

      default:
        switch (valorPrev) {
          case '0':
              valorNuevo = valor
            break;
          case '-0':
            valorNuevo = '-'+valor
          break;
          case 'NaN':
          case '-NaN':
          case 'Infinity':
          case '-Infinity':
              valorNuevo = valor
            break;
        
          default:
            valorNuevo = valorPrev + valor
            break;
        }
        break;
    }

    this.guardarEstado({historial: this.state.historial, valor: valorNuevo, error})
    this.setState((statePrev) => ({
      valor: valorNuevo,
      error: error
    }))
  }

  presOper = (operador) => {
    const statePrev = this.state;

    var historial = '';
    var valor = '0';
    var error = '';

    switch (statePrev.valor) {
      case 'NaN':
      case '-NaN':
      case 'Infinity':
      case '-Infinity':
        break;

      case '0':
        if(operador != '=' && statePrev.historial.length > 0){
          historial = statePrev.historial.slice(0,-1)+operador
          break;
        }

      default:
        switch (operador) {
          case '=':
            valor = (eval(statePrev.historial+' '+statePrev.valor)).toString()
            break;
        
          default:
            historial = statePrev.historial + ' ' + statePrev.valor + ' ' + operador  
            break;
        }
        break;
    }

    this.guardarEstado({historial, valor, error})
    this.setState((statePrev) => ({
      // historial: statePrev.historial + ' ' + statePrev.valor + ' ' + operador,
      historial,
      valor,
      error
    }))
  }

  presAct = (accion) => {
    const statePrev = this.state;

    var historial = '';
    var valor = '0';
    var error = '';

    switch (accion) {
      case 'CE':
        var historial = statePrev.historial;
      break;
      case 'C':
      break;

      case '<<':
        historial = statePrev.historial
        if(statePrev.valor.length > 1){
          valor = statePrev.valor.slice(0, -1);
        } else {
          valor = '0'
        }
      break;
    
      default:
      break;
    }

    this.guardarEstado({historial, valor, error})
    this.setState((statePrev) => ({
      // historial: statePrev.historial + ' ' + statePrev.valor + ' ' + operador,
      historial,
      valor,
      error
    }))
  }

  guardarEstado(estado){
    sessionStorage.setItem('estadoCalculadora', JSON.stringify(estado));
  }

  render() {
    const { classes } = this.props;
    const {
      historial,
      valor,
      error
    } = this.state

    return (
      <Grid xs={12} container className={classes.calculadora}>
        <Grid xs={12}>
          <Typography className={classes.historial} variant="overline" display="block" gutterBottom>
            <span className={classes.total}>Formula</span>{!!historial ? historial+' '+valor : ''}
          </Typography>
          <Typography className={classes.historial} variant="h6" display="block" gutterBottom>
            <span className={classes.total}>Total</span>{!!historial ? eval(historial+' '+valor) : ''}
          </Typography>
          <Typography variant="h5" gutterBottom className={classes.valores}>
            {valor}
          </Typography>
          { !!error && 
            <Typography className={classes.error} variant="overline" display="block" gutterBottom>
              {error}
            </Typography>
          }
        </Grid>
        <Grid item xs={9}>
          <Grid xs={12} container>
            {acciones.map(a => {
                return (
                  <Grid item xs="4">
                    <Button onClick={() => this.presAct(a)} className={classes.btn}>
                      {a}
                    </Button>
                  </Grid>
                )
              })}{numeros.map(n => {
                return (
                  <Grid item xs="4">
                    <Button onClick={() => this.presNum(n)} className={classes.btn}>
                      {n}
                    </Button>
                  </Grid>
                )
              })}
          </Grid>
        </Grid>

        <Grid item xs={3}>
          <Grid>
            {operadores.map(o => {
              return (
                <Grid item xs={12} onClick={() => this.presOper(o)}>
                  <Button className={classes.btn}>
                    {o}
                  </Button>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </Grid>
    )
  }
};

Calculadora.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Calculadora);