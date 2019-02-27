import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { withStyles, MenuItem, Typography, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, ListItem, Menu, Radio } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';

import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';

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
  cuentaVinculadaFont: {
    paddingRight: 7.5,
    color: "#de6c6c"
  },
  cuentaNormalFont: {
    paddingRight: 7.5,
    color: "#4385d6"
  },
  cuentaVinculadaIcono: {background: '#de6c6c' },
  cuentaNormalIcono: {background: '#4385d6' },
  radioSelect: {
    color: blue[600],
    '&$checked': {
      color: blue[500],
    }, 
  }
});

class ListItemCuenta extends Component {
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

  renderIcon(cuenta){
    if (!!cuenta.cuentaVinculada) {
      return <GroupIcon />
    } else {
      return <PersonIcon />
    }
  }


  editar = (cuenta) => {
    this.handleClose(this)
  }
  eliminar = (cuenta) => {
    Meteor.call('cuenta.eliminar',
      cuenta._id,
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
      cuenta,
      seleccionada,
      seleccionarCuenta
    } = this.props;
    const {
      anchorEl
    } = this.state;

    const cuentaStyle = "Cuenta"+(!!cuenta.cuentaVinculada ? "Vinculada" : "Normal");

    return (
      <div>
        <Link onContextMenu={this.handleClick} to={"/cuentas/"+cuenta._id} className={classes.link}>
          <ListItem
            button
          >
            <ListItemAvatar>
              <Avatar className={classes[cuentaStyle+"Icono"]}>
                {this.renderIcon(cuenta)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                className: classes[cuentaStyle+"Font"]
              }}
              secondaryTypographyProps={{
                className: classes[cuentaStyle+"Font"]
              }}
              primary={cuenta.nombre}
              secondary={!!cuenta.descripcion ? cuenta.descripcion : null}
            />
            <ListItemSecondaryAction>
              <Radio className={classes.radioSelect}
                color="prymary"
                onClick={(e) => {e.preventDefault();
                  seleccionarCuenta(cuenta._id)}}
                checked={seleccionada}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </Link>
        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => this.handleClose(this)}>
          <MenuItem
            key={"option"}
            disabled={true}
            onClick={() => this.handleClose(this)}
          >{cuenta.nombre}</MenuItem>
          <Link to={"/cuentas/"+cuenta._id} className={classes.link}>
            <MenuItem onClick={() => this.editar(cuenta)}>Editar</MenuItem>
          </Link>
          <MenuItem onClick={() => this.eliminar(cuenta)}>Eliminar</MenuItem>
        </Menu>
      </div>
    );
  }
}

ListItemCuenta.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItemCuenta);