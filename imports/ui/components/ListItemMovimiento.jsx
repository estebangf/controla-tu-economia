import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { withStyles, MenuItem, Typography, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, ListItem, Menu } from '@material-ui/core';

import HelpIcon from '@material-ui/icons/Help';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const drawerWidth = 240;

const styles = theme => ({
  link: {
    color: "#4d4d4d",
    textDecoration: 'none',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      'text-decoration': 'none',
      color: "#4d4d4d"
    },
  },
  linkDefault: {
    color: "#4d4d4d",
    textDecoration: 'none',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      'text-decoration': 'none',
      color: "#4d4d4d"
    },
  },
  egresoFont: {
    paddingRight: 7.5,
    color: "#de6c6c"
  },
  ingresoFont: {
    paddingRight: 7.5,
    color: "#4385d6"
  },
  egresoFontImporte: {
    paddingRight: 7.5,
    textAlign: "end",
    color: "#de6c6c"
  },
  ingresoFontImporte: {
    paddingRight: 7.5,
    textAlign: "end",
    color: "#4385d6"
  },
  egresoIcono: {background: '#de6c6c' },
  ingresoIcono: {background: '#4385d6' }
});

class ListItemMovimiento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: undefined,
      menuVisible: false
    };
  }

  handleClick = event => {
    event.preventDefault();
    this.setState({anchorEl: event.currentTarget});
  }
  handleClose(component) {
    component.setState({anchorEl: null});
  }

  renderIcon(movimiento){
    if (movimiento.esSaldoInicial) {
      return <HelpIcon />
    } else {
      if (movimiento.tipo == "egreso") {
        if(movimiento.variaLaGanancia) {
          return <WorkIcon />
        } else {
          return <HomeIcon />
        }
      } else if (movimiento.tipo == "ingreso") {
        if(movimiento.variaLaGanancia) {
          return <AttachMoneyIcon />
        } else {
          return <AccountBalanceIcon />
        }
      }
    }
  }

  editar = (movimiento) => {
    this.handleClose(this)
  }
  eliminar = (movimiento) => {
    var tipo = 'movimiento'
    var id = movimiento._id
    if(!!movimiento.transferenciaId) {
      tipo = 'transferencia'
      id = movimiento.transferenciaId
    }
    Meteor.call(tipo+'.eliminar',
      id,
      (error, result) => {
        if (error){
          console.log(error);
        } else {
          console.log(result)
        }
      }
    )
    this.handleClose(this)
  }
  variaLaGanancia = (movimiento) => {
    Meteor.call('movimiento.editar',
      movimiento._id,
      movimiento.detalle,
      movimiento.descripcion,
      movimiento.importe,
      !movimiento.variaLaGanancia,
      movimiento.fecha,
      movimiento.categoria,
      (error, result) => {
        if (error){
          console.log(error);
        } else {
          console.log(result)
        }
      }
    )
    this.handleClose(this)
  }

  invertirMonto = (movimiento) => {
    Meteor.call('movimiento.editar',
      movimiento._id,
      movimiento.detalle,
      movimiento.descripcion,
      movimiento.importe * -1,
      !movimiento.variaLaGanancia,
      movimiento.fecha,
      movimiento.categoria,
      (error, result) => {
        if (error){
          console.log(error);
        } else {
          console.log(result)
        }
      }
    )
    this.handleClose(this)
  }

  render() {
    const {
      classes,
      movimiento,
      esSaldoInicial
    } = this.props;
    const {
      anchorEl
    } = this.state;

    const opciones = {
      fecha: {
        corta: {year: 'numeric', month: 'numeric', day: 'numeric' },
        larga: {year: 'numeric', month: 'long', day: 'numeric' }
      },
      tiempo: {
        corto: { hour: 'numeric', minute: 'numeric'},
        corto12: { hour: 'numeric', minute: 'numeric', hour12: true}
      },
      fechaTiempo: {
        corta: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },
        corta12: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true },
      }
    }
    var secondary = ""
    if (movimiento.esSaldoInicial) {
      secondary += movimiento.descripcion
      return (
        <ListItem
          button
        >
          <ListItemAvatar>
            <Avatar className={classes[movimiento.tipo+"Icono"]}>
              {this.renderIcon(movimiento)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primaryTypographyProps={{
              className: classes[movimiento.tipo+"Font"]
            }}
            secondaryTypographyProps={{
              className: classes[movimiento.tipo+"Font"]
            }}
            primary={movimiento.detalle}
            secondary={!!secondary ? secondary : null}
          />
          <ListItemSecondaryAction>
            <Typography className={classes[movimiento.tipo+"FontImporte"]} >$  {Math.abs(movimiento.importe.toFixed(2))}</Typography>
          </ListItemSecondaryAction>
        </ListItem>
      );
    } else {
      secondary += !!movimiento.categoriaNombre ? movimiento.categoriaNombre : ''
      secondary += ' - '
      secondary += !!movimiento.descripcion ? movimiento.descripcion : ''

      const changeImage = (e) => {
        e.target.src = '/imagenes/notFound.png'
      }
      return (
        <div>
          <Link onContextMenu={this.handleClick} to={
              "/movimientos/" + 
              (!!movimiento.transferenciaId ? 
                "transferencia" : movimiento.tipo) +
              "s/" +
              (!!movimiento.transferenciaId ?
                movimiento.transferenciaId : movimiento._id)
              } className={classes.link}>
            <ListItem
              button
            >
              <ListItemAvatar>
                <Avatar
                  size="8" className={classes.avatar}
                  imgProps={{
                    onError: changeImage
                  }}
                  style={{
                    backgroundColor: movimiento.categoriaColor
                  }}
                  src={"/imagenes/categorias/" + movimiento.categoriaNombre.replace(" ","_") + ".png"}
                />
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{
                  className: classes[movimiento.tipo+"Font"]
                }}
                secondaryTypographyProps={{
                  className: classes[movimiento.tipo+"Font"]
                }}
                primary={movimiento.detalle}
                secondary={
                  <div style={{maxWidth: 'calc(100% - 60px)'}}>
                    {!!secondary ? secondary : null}
                  </div>
                }
              />
              <ListItemSecondaryAction>
                <Typography className={classes[movimiento.tipo+"FontImporte"]} >$  {Math.abs(movimiento.importe.toFixed(2))}</Typography>
                <Typography className={classes[movimiento.tipo+"Font"]} style={{textAlign: "right"}}>{movimiento.fecha.toLocaleDateString("es-ES", opciones.fechaTiempo.corta)}</Typography>
              </ListItemSecondaryAction>
            </ListItem>
          </Link>
          <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => this.handleClose(this)}>
            <MenuItem
              key={"option"}
              disabled={true}
              onClick={() => this.handleClose(this)}
            >{movimiento.detalle + ' x ' + Math.abs(movimiento.importe.toFixed(2))}</MenuItem>
            <Link to={
              "/movimientos/" + 
              (!!movimiento.transferenciaId ? 
                "transferencia" : movimiento.tipo) +
              "s/" +
              (!!movimiento.transferenciaId ?
                movimiento.transferenciaId : movimiento._id)
            } className={classes.link}>
              <MenuItem onClick={() => this.editar(movimiento)}>Editar</MenuItem>
            </Link>
            <MenuItem onClick={() => this.eliminar(movimiento)}>Eliminar</MenuItem>
            <MenuItem onClick={() => this.variaLaGanancia(movimiento)}>
              {
                movimiento.tipo == "egreso" ?
                  (movimiento.variaLaGanancia ? "Desmarcar como insumo" : "Marcar como insumo")
                  :
                  (movimiento.variaLaGanancia ? "Marcar como prestamo" : "Desmarcar como prestamo")
              }
            </MenuItem>
            <MenuItem disabled={!!movimiento.transferenciaId} onClick={() => this.invertirMonto(movimiento)}>
              {
                movimiento.tipo == "egreso" ?
                  "Hacer ingreso"
                  :
                  "Hacer egreso"
              }
            </MenuItem>
          </Menu>
        </div>
      );
    }
  }
}

ListItemMovimiento.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItemMovimiento);
