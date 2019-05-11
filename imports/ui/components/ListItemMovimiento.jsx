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
    Meteor.call('movimiento.eliminar',
      movimiento._id,
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

    if (movimiento.esSaldoInicial) {
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
            secondary={!!movimiento.descripcion ? movimiento.descripcion : null}
          />
          <ListItemSecondaryAction>
            <Typography className={classes[movimiento.tipo+"Font"]} >
            {function(){
              let importe = '$\u00A0'
              for(let i=0; i<=9-Math.abs(movimiento.importe.toFixed(2)).toString().length; i++){
                importe += '\u00A0\u00A0';
              }
              return importe+Math.abs(movimiento.importe.toFixed(2))
            }()}</Typography>
          </ListItemSecondaryAction>
        </ListItem>
      );
    } else {
      return (
        <div>
          <Link onContextMenu={this.handleClick} to={"/movimientos/"+movimiento.tipo+"s/"+movimiento._id} className={classes.link}>
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
                secondary={!!movimiento.descripcion ? movimiento.descripcion : null}
              />
              <ListItemSecondaryAction>
                <Typography className={classes[movimiento.tipo+"Font"]} >
                {function(){
                  let importe = '$\u00A0'
                  for(let i=0; i<=9-Math.abs(movimiento.importe.toFixed(2)).toString().length; i++){
                    importe += '\u00A0\u00A0';
                  }
                  return importe+Math.abs(movimiento.importe.toFixed(2))
                }()}</Typography>
              </ListItemSecondaryAction>
            </ListItem>
          </Link>
          <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => this.handleClose(this)}>
            <MenuItem
              key={"option"}
              disabled={true}
              onClick={() => this.handleClose(this)}
            >{movimiento.detalle + ' x ' + Math.abs(movimiento.importe.toFixed(2))}</MenuItem>
            <Link to={"/movimientos/"+movimiento.tipo+"s/"+movimiento._id} className={classes.link}>
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
