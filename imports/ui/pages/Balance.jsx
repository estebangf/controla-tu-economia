import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, List, Typography, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, ListItem, Divider, ListSubheader, Paper } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import ListItemMovimiento from '../components/ListItemMovimiento';

const drawerWidth = 240;

const styles = theme => ({
  rootList: {
    paddingTop: 0,
    paddingBottom: 55
  },
  titulo: {
    textAlign: 'center',
    paddingTop: 15
  },
  listaGrafico:{
    background: '#fff',
    padding: 0,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 0,
    top: 50,
    position: "sticky",
    paddingTop: 14
//    background: "#FFF"
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
  fab: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: theme.spacing.unit * 1,
    right: theme.spacing.unit * 1,
  },
});


class Balance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
      drawerOpen: false,
      saldoInicial: 0
    };

  }

  renderItems(movimientos) {
    const {saldoInicial} = this.state
    const movimientosToRender = [
      {
        detalle: "Saldo Inicial",
        descripcion: "Saldo anterior a hoy",
        importe: saldoInicial
      },
      ...movimientos
    ]
    return movimientosToRender.map(mov => {
      const movimiento = {...mov, tipo: mov.importe < 0 ? "egreso" : "ingreso"}
      return (
        <ListItemMovimiento movimiento={movimiento} />
      )
    })
  }

  componentDidMount(){
    const {
      cuentaId,
      desde
    } = this.props;

    const self = this
    Meteor.call('movimiento.saldoInicial',
      cuentaId,
      desde,
      (error, result) => {
        if (error){
          console.log(error);
        } else {
          console.log(result)
          self.setState({
            saldoInicial: result
          })
        }
      }
    )
  }

  componentDidUpdate(prevProps) {
    const {
      cuentaId,
      desde
    } = this.props;

    const self = this
    
    if ((desde !== prevProps.desde) || (cuentaId !== prevProps.cuentaId)) {
      Meteor.call('movimiento.saldoInicial',
        cuentaId,
        desde,
        (error, result) => {
          if (error){
            console.log(error);
          } else {
            console.log(result)
            self.setState({
              saldoInicial: result
            })
          }
        }
      )
    }
  }

  render() {
    const {
      classes,
      movimientos,
    } = this.props;

    let totales = {
      ingresos: 0,
      egresos: 0,
      saldo: 0
    }
    movimientos.forEach(movimiento => {
      if (movimiento.importe >= 0) {
        totales.ingresos += movimiento.importe
      } else {
        totales.egresos += Math.abs(movimiento.importe)
      }
      totales.saldo += movimiento.importe
    });
    let mayorIngreso = totales.ingresos > totales.egresos
    let porcentajes= {
      egresos: !mayorIngreso && totales.egresos !=0 ? 1 : totales.egresos/totales.ingresos,
      ingresos: mayorIngreso && totales.ingresos !=0 ? 1 : totales.ingresos/totales.egresos,
      saldo: mayorIngreso !=0 ? totales.saldo/totales.ingresos : totales.saldo/totales.egresos
    }

    return (
      <div className={classes.root}>
        <List dense={true} className={classes.rootList}>
          <ListSubheader className={classes.listaGrafico}>
            <ListItem>
              <ListItemText
                primaryTypographyProps={{
                  style: { color: "#de6c6c" }
                }}
                secondaryTypographyProps={{
                  style: { color: "#de6c6c" }
                }}
                primary={totales.egresos.toFixed(2)}
                secondary="Egresos"
              />
              <ListItemSecondaryAction>
                <span className={classes.barraGrafico} style={{background: '#de6c6c', width: 200*porcentajes.egresos}} />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                primaryTypographyProps={{
                  style: { color: "#4385d6" }
                }}
                secondaryTypographyProps={{
                  style: { color: "#4385d6" }
                }}
                primary={totales.ingresos.toFixed(2)}
                secondary="Ingresos"
              />
              <ListItemSecondaryAction>
                <span className={classes.barraGrafico} style={{ background: '#4385d6', width: 200*porcentajes.ingresos}} />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                primaryTypographyProps={{
                  style: { color: porcentajes.saldo < 0 ? '#b94d4d' : "#3ab33a" }
                }}
                secondaryTypographyProps={{
                  style: { color: porcentajes.saldo < 0 ? '#b94d4d' : "#3ab33a" }
                }}
                primary={totales.saldo.toFixed(2)}
                secondary={porcentajes.saldo < 0 ? 'Deuda' : "Saldo"}
              />
              <ListItemSecondaryAction>
                <span className={classes.barraGrafico} style={{background: porcentajes.saldo < 0 ? '#b94d4d' : '#77c677', width:  porcentajes.saldo < 0 ? 200*porcentajes.saldo*-1 : 200*porcentajes.saldo}} />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </ListSubheader>
          <List dense={false} className={classes.listaItems}>
            {this.renderItems(movimientos)}
          </List>
        </List>
        <Fab color="primary" aria-label="Add" className={classes.fab}>
          <AddIcon />
        </Fab>
      </div>
    )
  }
};

Balance.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Balance);
