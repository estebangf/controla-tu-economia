import React, { Component } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { Link } from 'react-router-dom';
import { withStyles, MenuItem, Typography, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, ListItem, Menu, Radio, IconButton, TextField } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';

import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

const drawerWidth = 240;

const styles = theme => ({
  textField: {
    marginRight: 15
  }
});

class ListItemCategoria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editando: false,
      nombreEditado: ''
    };
  }
  
  eliminar = (id) => {
    Meteor.call('categoria.eliminar',
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

  editar = () => {
    const {
      _id
    } = this.props

    const {
      nombreEditado
    } = this.state
    
    const self = this
    
    if(!!_id){
      Meteor.call('categoria.editar',
        _id,
        nombreEditado,
        (error, result) => {
          if (error){
            console.log(error);
          } else {
            self.setState({
              editando: false,
            })
          }
        }
      )
    } else {
      Meteor.call('categoria.nueva',
        nombreEditado,
        (error, result) => {
          if (error){
            console.log(error);
          } else {
            self.setState({
              editando: false,
            })
          }
        }
      )
    }
  }

  handleEditar = () => {
    this.setState({
      editando: true,
      nombreEditado: this.props.nombre
    })
  }

  cambiarNombre = (event) => {
    this.setState({
      nombreEditado: event.target.value
    })
  }

  render() {
    const { 
      classes,
      nombre,
      _id
    } = this.props;
    const {
      editando,
      nombreEditado
    } = this.state;

    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar
            size="8" className={classes.avatar}
            imgProps={{
              onError: "this.src='/imagenes/notFound.png';"
            }}
            src={"/imagenes/categorias/" + nombre.replace(" ","_") + ".png"}
          />
        </ListItemAvatar>
        <ListItemText
          primaryTypographyProps={{
            className: classes.font
          }}
          secondaryTypographyProps={{
            className: classes.font
          }}
          primary={
            !editando && !!_id ? nombre :
            <TextField 
              onChange={this.cambiarNombre}
              className={classes.textField}
              value={nombreEditado}
            />
          }
        />
        <ListItemSecondaryAction>
          {
            !editando && !!_id ? 
            <IconButton
              color="prymary"
              onClick={this.handleEditar}
            >
              <EditIcon />
            </IconButton>
            :
            <IconButton
              color="prymary"
              onClick={this.editar}
            >
              <SaveIcon />
            </IconButton> 
          }
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

ListItemCategoria.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItemCategoria);