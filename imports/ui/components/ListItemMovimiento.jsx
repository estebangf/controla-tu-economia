import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { withStyles, MenuItem, Typography, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, ListItem, Menu } from '@material-ui/core';

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
  gastoFont: {
    paddingRight: 7.5,
    color: "#de6c6c"
  },
  ingresoFont: {
    paddingRight: 7.5,
    color: "#4385d6"
  },
  gastoIcono: {background: '#de6c6c' },
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
    if (movimiento.tipo == "gasto") {
      if(movimiento.esInsumo) {
        return <WorkIcon />
      } else {
        return <HomeIcon />
      }
    } else if (movimiento.tipo == "ingreso") {
      if(movimiento.esPrestamo) {
        return <AccountBalanceIcon />
      } else {
        return <AttachMoneyIcon />
      }
    }
  }


  editar = (movimiento) => {
    alert(movimiento.detalle)
    this.handleClose(this)
  }
  eliminar = (movimiento) => {
    Meteor.call(movimiento.tipo+'.eliminar',
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
  es = (movimiento) => {
    Meteor.call(movimiento.tipo+'.editar',
      movimiento._id,
      movimiento.detalle,
      movimiento.descripcion,
      movimiento.importe,
      !(movimiento.esInsumo || !!movimiento.esPrestamo) || !(!!movimiento.esInsumo || movimiento.esPrestamo),
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
      movimiento
    } = this.props;
    const {
      anchorEl
    } = this.state;

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
                for(let i=0; i<=9-movimiento.importe.toFixed(2).toString().length; i++){
                  importe += '\u00A0\u00A0';
                }
                return importe+movimiento.importe.toFixed(2)
              }()}</Typography>
            </ListItemSecondaryAction>
          </ListItem>
        </Link>
        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => this.handleClose(this)}>
          <MenuItem
            key={"option"}
            disabled={true}
            onClick={() => this.handleClose(this)}
          >{movimiento.detalle + ' x ' + movimiento.importe.toFixed(2)}</MenuItem>
          <MenuItem onClick={() => this.editar(movimiento)}>Editar</MenuItem>
          <MenuItem onClick={() => this.eliminar(movimiento)}>Eliminar</MenuItem>
          <MenuItem onClick={() => this.es(movimiento)}>
            {
              movimiento.tipo == "gasto" ? (movimiento.esInsumo ? "No es insumo" : "Es insumo")
              :
              movimiento.tipo == "ingreso" && (movimiento.esPrestamo ? "No es prestamo" : "Es prestamo")
            }
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

ListItemMovimiento.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItemMovimiento);