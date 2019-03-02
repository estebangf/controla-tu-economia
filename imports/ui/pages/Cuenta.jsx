import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, Typography, TextField, Checkbox, FormControlLabel, Button } from '@material-ui/core';

import { Meteor } from 'meteor/meteor';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    padding: 25
  },
  actions:{
    paddingLeft: 15,
    paddingRight: 15
  },
  button: {
    marginBottom: 5
  }
});


class Cuenta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      nombre: '',
      descripcion: '',
      cuentaVinculada: '',
      esVinculada: false
    };
  }

  static getDerivedStateFromProps(props, state){
    const {
      loading,
      cuentaExists,
      cuenta
    } = props;

    if (!loading && cuentaExists) {
      if (state.id == '' || state.id != cuenta._id) {
        return {
          id: cuenta._id,
          nombre: cuenta.nombre,
          descripcion: cuenta.descripcion,
          cuentaVinculada: cuenta.cuentaVinculada,
          esVinculada: !!cuenta.cuentaVinculada
        }
      } else {
        return null
      }
    } else {
      return null
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }
  handleChangeChecked = name => event => {
    this.setState({
      [name]: event.target.checked
    })
  }

  guardar(){
    const {
      cuentaExists,
      cuenta
    } = this.props
    const { 
      nombre,
      descripcion,
      cuentaVinculada
    } = this.state;
    const id = cuenta._id;

    if(cuentaExists) {
      Meteor.call('cuenta.editar',
        id,
        cuentaVinculada,
        nombre,
        descripcion,
        (error, result) => {
          if (error){
            alert(error);
          } else {
            alert(result);
          }
        }
      )
    } else {
      Meteor.call('cuenta.nueva',
        cuentaVinculada,
        nombre,
        descripcion,
        (error, result) => {
          if (error){
            alert(error);
          } else {
            this.limpiar(result);
          }
        }
      )
    }
  }
  limpiar(mensaje){
    const {
      cuentaExists,
      cuenta
    } = this.props

    if(cuentaExists) {
      this.setState({
        nombre: cuenta.nombre,
        descripcion: cuenta.descripcion,
        cuentaVinculada: cuenta.cuentaVinculada,
        esVinculada: !!cuentaVinculada
      });
    } else {
      this.setState({
        nombre: '',
        descripcion: '',
        cuentaVinculada: '',
        esVinculada: false
      });
    }
    alert(mensaje)
  }

  render() {
    const { 
      classes,
      cuentaExists
    } = this.props;
    const {
      cuentaVinculada,
      nombre,
      descripcion,
      esVinculada
    } = this.state;

    return (
      <div className={classes.root}>
        <Typography variant="h4" className={classes.titulo}>{cuentaExists ? "Editar Cuenta" : "Nueva Cuenta"}</Typography>
        <Link to={'/'}>Inicio</Link>

        <TextField
          InputLabelProps={{ shrink: !!nombre && nombre != '' }} 
          id="nombre"
          fullWidth={true}
          label="Nombre"
          value={nombre}
          onChange={this.handleChange('nombre')}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          InputLabelProps={{ shrink: !!descripcion && descripcion != '' }} 
          id="descripcion"
          fullWidth={true}
          label="Descripcion"
          value={descripcion}
          onChange={this.handleChange('descripcion')}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          InputLabelProps={{ shrink: !!cuentaVinculada && cuentaVinculada != '' }} 
          disabled={!esVinculada}
          id="cuentaVinculada"
          fullWidth={true}
          label="Cuenta Vinculada"
          value={cuentaVinculada}
          onChange={this.handleChange('cuentaVinculada')}
          className={classes.textField}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
            checked={esVinculada}
            onChange={this.handleChangeChecked('esVinculada')}
            color="primary"
          />
          }
          label={"¿Es una cuenta vinculada a la de alguien mas? " + (esVinculada ? "Si" : "No")}
        />

        <div className={classes.actions}>
          <Button fullWidth={true} variant="contained" onClick={() => this.guardar()} color="primary" className={classes.button}>
            Guardar
          </Button>
          <Button fullWidth={true} color="secondary" onClick={() => this.limpiar("Todo borrado")} className={classes.button}>
            {cuentaExists ? "Volver a cargar" : "Limpiar"}
          </Button>
        </div>
      </div>
    )
  }
};

Cuenta.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cuenta);