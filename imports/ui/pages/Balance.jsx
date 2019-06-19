import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, List, Typography, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, ListItem, Divider, ListSubheader, Paper, Menu, MenuItem } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

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
    paddingBottom: 0,
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
  listaGraficoItem:{
    paddingTop: 0,
    paddingBottom: 0,
  },
  divider:{
    marginTop: 10,
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
    background: "#FFF",
    position: 'fixed',
    bottom: theme.spacing.unit * 1,
    right: theme.spacing.unit * 1,
    [theme.breakpoints.up('lg')]: {
      bottom: theme.spacing.unit * 1 + 50,
      right: theme.spacing.unit * 1 + 210,
    },
  },
  menu:{
    [theme.breakpoints.up('lg')]: {
      bottom: 70 + 50,
    },
    bottom: 70,
    background: 'transparent',
    boxShadow: 'none',
    top: 'auto !important',
  },
  menuItem: {
    marginLeft: 8,
    marginRight: 8,
    // margin: 0px 8px;
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 0,
    paddingRight: 0,
    boxShadow: 'none',
    height: '100%',
    '&:hover': {
      boxShadow: 'none'
    },
  },
  fabChildEgreso: {
    background: "#de6c6c"
  },
  fabChildIngreso: {
    background: "#4385d6"
  }
});


class Balance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
      drawerOpen: false,
      saldoInicial: 0,
      openAddButton: false,
      anchorEl: null,
    };

  }

  renderItems(movimientos) {
    return movimientos.map(mov => {
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

  handleOpenAdd = () => {
    this.setState(state => ({
      openAddButton: !state.openAddButton
    }))
  }

  handleClick = event => {
    this.setState({
      openAddButton: true,
      anchorEl: event.currentTarget
    });
  };
  handleClose = () => {
    this.setState({
      openAddButton: false,
      anchorEl: null
    });
  };

  render() {
    const {
      classes,
    } = this.props;
    const {
      saldoInicial,
      openAddButton,
      anchorEl
    } = this.state
    const IconMenu = openAddButton ? CloseIcon : AddIcon
    let totales = {
      ingresos: 0,
      egresos: 0,
      saldo: 0
    }
    const movimientos = [
      {
        detalle: "Saldo Inicial",
        descripcion: "Saldo anterior a este periodo",
        importe: saldoInicial,
        variaLaGanancia:  saldoInicial < 0 ? false : true,
        esSaldoInicial: true
      },
      ...this.props.movimientos
    ]

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
            <ListItem className={classes.listaGraficoItem}>
              <ListItemText
                primaryTypographyProps={{
                  style: { color: "#de6c6c",
                  lineHeight: 0 }
                }}
                secondaryTypographyProps={{
                  style: { color: "#de6c6c",
                  lineHeight: 0 }
                }}
                primary={totales.egresos.toFixed(2)}
                secondary="Egresos"
              />
              <ListItemSecondaryAction>
                <span className={classes.barraGrafico} style={{background: '#de6c6c', width: 200*porcentajes.egresos}} />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem className={classes.listaGraficoItem}>
              <ListItemText
                primaryTypographyProps={{
                  style: { color: "#4385d6",
                  lineHeight: 0 }
                }}
                secondaryTypographyProps={{
                  style: { color: "#4385d6",
                  lineHeight: 0 }
                }}
                primary={totales.ingresos.toFixed(2)}
                secondary="Ingresos"
              />
              <ListItemSecondaryAction>
                <span className={classes.barraGrafico} style={{ background: '#4385d6', width: 200*porcentajes.ingresos}} />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem className={classes.listaGraficoItem}>
              <ListItemText
                primaryTypographyProps={{
                  style: { color: porcentajes.saldo < 0 ? '#b94d4d' : "#3ab33a",
                  lineHeight: 0 }
                }}
                secondaryTypographyProps={{
                  style: { color: porcentajes.saldo < 0 ? '#b94d4d' : "#3ab33a",
                  lineHeight: 0 }
                }}
                primary={totales.saldo.toFixed(2)}
                secondary={porcentajes.saldo < 0 ? 'Deuda' : "Saldo"}
              />
              <ListItemSecondaryAction>
                <span className={classes.barraGrafico} style={{background: porcentajes.saldo < 0 ? '#b94d4d' : '#77c677', width:  porcentajes.saldo < 0 ? 200*porcentajes.saldo*-1 : 200*porcentajes.saldo}} />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider className={classes.divider} />
          </ListSubheader>
          <List dense={false} className={classes.listaItems}>
            {this.renderItems(movimientos)}
          </List>
        </List>
        <Fab
          className={classes.fab}
          onClick={this.handleClick}>
          <IconMenu
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true" />
        </Fab>
        <Menu
          PopoverClasses={{
            paper: classes.menu
          }}
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem style={{display: "none"}} className={classes.menuItem}>
          </MenuItem>
          <MenuItem className={classes.menuItem} onClick={this.handleClose}>
            <Link className={classes.link} to={"/movimientos/egresos/nuevo"}>
              <Fab color="secondary" className={classes.fabChildEgreso} size="small">
                <AddIcon />
              </Fab>
            </Link>
          </MenuItem>
          <MenuItem className={classes.menuItem} onClick={this.handleClose}>
            <Link className={classes.link} to={"/movimientos/ingresos/nuevo"}>
              <Fab color="primary" className={classes.fabChildIngreso} size="small">
                <AddIcon />
              </Fab>
            </Link>
          </MenuItem>
        </Menu>
      </div>
    )
  }
};

Balance.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Balance);
