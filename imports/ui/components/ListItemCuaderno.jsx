import React, { Component } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { Link } from 'react-router-dom';
import { withStyles, MenuItem, Typography, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, ListItem, Menu, Radio, IconButton } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';

import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import CheckIcon from '@material-ui/icons/Check';

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
  cuadernoVinculadaFont: {
    paddingRight: 7.5,
    color: "#de6c6c"
  },
  cuadernoNormalFont: {
    paddingRight: 7.5,
    color: "#4385d6"
  },
  cuadernoVinculadaIcono: {background: '#de6c6c' },
  cuadernoNormalIcono: {background: '#4385d6' },
  radioSelect: {
    transition: "color 0.5s"
  },
  noSeleccionada: {
    color: blue[100],
  },
  seleccionada: {
    color: blue[600],
  }
});

class ListItemCuaderno extends Component {
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

  renderIcon(cuaderno){
    if (!!cuaderno.cuadernoVinculado) {
      return <GroupIcon />
    } else {
      return <PersonIcon />
    }
  }


  editar = (cuaderno) => {
    this.handleClose(this)
  }
  eliminar = (cuaderno) => {
    Meteor.call('cuaderno.eliminar',
      cuaderno._id,
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
      cuaderno,
      seleccionada,
      seleccionarCuaderno
    } = this.props;
    const {
      anchorEl
    } = this.state;

    const cuadernoStyle = "Cuaderno"+(!!cuaderno.cuadernoVinculado ? "Vinculada" : "Normal");

    return (
      <div>
        <Link onContextMenu={this.handleClick} to={"/cuadernos/"+cuaderno._id} className={classes.link}>
          <ListItem
            button
          >
            <ListItemAvatar>
              <Avatar className={classes[cuadernoStyle+"Icono"]}>
                {this.renderIcon(cuaderno)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                className: classes[cuadernoStyle+"Font"]
              }}
              secondaryTypographyProps={{
                className: classes[cuadernoStyle+"Font"]
              }}
              primary={cuaderno.nombre}
              secondary={!!cuaderno.descripcion ? cuaderno.descripcion : null}
            />
            <ListItemSecondaryAction>
              <IconButton
                className={clsx(classes.radioSelect, {
                  [classes.noSeleccionada]: !seleccionada,
                  [classes.seleccionada]: seleccionada,
                })}
                color="prymary"
                onClick={(e) => {e.preventDefault();
                  seleccionarCuaderno(cuaderno)}}
                aria-label="Seleccionar">
                <CheckIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Link>
        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => this.handleClose(this)}>
          <MenuItem
            key={"option"}
            disabled={true}
            onClick={() => this.handleClose(this)}
          >{cuaderno.nombre}</MenuItem>
          <Link to={"/cuadernos/"+cuaderno._id} className={classes.link}>
            <MenuItem onClick={() => this.editar(cuaderno)}>Editar</MenuItem>
          </Link>
          <MenuItem onClick={() => this.eliminar(cuaderno)}>Eliminar</MenuItem>
          <MenuItem onClick={() => {seleccionarCuaderno(cuaderno); this.handleClose(this)}}>Seleccionar</MenuItem>
        </Menu>
      </div>
    );
  }
}

ListItemCuaderno.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItemCuaderno);