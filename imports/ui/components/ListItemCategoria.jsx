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
  divEditor: {
    marginRight: 15,
  },
  textField: {
    maxWidth: "calc(100% - 32px)"
  },
  inputColor: {
    border: 0,
    background: "#FFFFFF",
    width: 32,
    height: 30,
    borderRadius: '100%',
    ["&::-webkit-color-swatch-wrapper"]: {
      padding: 2
    },
    ["&::-webkit-color-swatch"]: {
      border: "solid 1px #dcdcdc",
      borderRadius: "100%"
    }
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
      nombreEditado,
      colorEditado
    } = this.state
    
    const self = this
    
    if(!!_id){
      Meteor.call('categoria.editar',
        _id,
        nombreEditado,
        colorEditado,
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
        colorEditado,
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
      nombreEditado: this.props.nombre,
      colorEditado: !!this.props.color ? this.props.color : "#FFFFFF"
    })
  }

  handleChange = (field) => (event) => {
    this.setState({
      [field]: event.target.value
    })
  }

  render() {
    const { 
      classes,
      nombre,
      _id,
      color
    } = this.props;
    const {
      editando,
      nombreEditado,
      colorEditado
    } = this.state;

    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar
            size="8" className={classes.avatar}
            imgProps={{
              onError: "this.src='/imagenes/notFound.png';"
            }}
            style={{
              backgroundColor: !editando ? color : colorEditado
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
            <div className={classes.divEditor}>
              <TextField 
                onChange={this.handleChange("nombreEditado")}
                className={classes.textField}
                value={nombreEditado}
              />
              <input
                className={classes.inputColor}
                type="color"
                onChange={this.handleChange("colorEditado")}
                value={!!colorEditado ? colorEditado : "#FFFFFF"}
              />
            </div>
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