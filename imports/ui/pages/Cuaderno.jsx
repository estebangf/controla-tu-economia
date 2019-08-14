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
  },
  formControl: {
    width: "100%"
  }
});


class Cuaderno extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      nombre: '',
      descripcion: '',
      cuadernoVinculado: '',
      esVinculado: false
    };
  }

  static getDerivedStateFromProps(props, state){
    const {
      loading,
      cuadernoExists,
      cuaderno
    } = props;

    if (!loading && cuadernoExists) {
      if (state.id == '' || state.id != cuaderno._id) {
        return {
          id: cuaderno._id,
          nombre: cuaderno.nombre,
          descripcion: cuaderno.descripcion,
          cuadernoVinculado: cuaderno.cuadernoVinculado,
          esVinculado: !!cuaderno.cuadernoVinculado
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
      cuadernoExists,
      cuaderno
    } = this.props
    const { 
      nombre,
      descripcion,
      cuadernoVinculado
    } = this.state;
    const id = cuaderno._id;

    if(cuadernoExists) {
      Meteor.call('cuaderno.editar',
        id,
        cuadernoVinculado,
        nombre,
        descripcion,
        (error, result) => {
          if (error){
            self.props.handleAlerta(error.toString(), "error")
          } else {
            self.props.handleAlerta("Cuaderno editado", "success")
          }
        }
      )
    } else {
      Meteor.call('cuaderno.nueva',
        cuadernoVinculado,
        nombre,
        descripcion,
        (error, result) => {
          if (error){
            self.props.handleAlerta(error.toString(), "error")
          } else {
            self.props.handleAlerta("Cuaderno creado", "success")
          }
        }
      )
    }
  }
  limpiar(mensaje){
    const {
      cuadernoExists,
      cuaderno
    } = this.props

    if(cuadernoExists) {
      this.setState({
        nombre: cuaderno.nombre,
        descripcion: cuaderno.descripcion,
        cuadernoVinculado: cuaderno.cuadernoVinculado,
        esVinculado: !!cuadernoVinculado
      });
    } else {
      this.setState({
        nombre: '',
        descripcion: '',
        cuadernoVinculado: '',
        esVinculado: false
      });
    }
    alert(mensaje)
  }

  render() {
    const { 
      classes,
      cuadernoExists
    } = this.props;
    const {
      cuadernoVinculado,
      nombre,
      descripcion,
      esVinculado
    } = this.state;

    return (
      <div className={classes.root}>
        <Typography variant="h4" className={classes.titulo}>{cuadernoExists ? "Editar Cuaderno" : "Nueva Cuaderno"}</Typography>
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
          InputLabelProps={{ shrink: !!cuadernoVinculado && cuadernoVinculado != '' }} 
          disabled={!esVinculado}
          id="cuadernoVinculado"
          fullWidth={true}
          label="Cuaderno Vinculado"
          value={cuadernoVinculado}
          onChange={this.handleChange('cuadernoVinculado')}
          className={classes.textField}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
            checked={esVinculado}
            onChange={this.handleChangeChecked('esVinculado')}
            color="primary"
          />
          }
          label={"¿Es una cuaderno vinculado a la de alguien mas? " + (esVinculado ? "Si" : "No")}
        />

        <div className={classes.actions}>
          <Button fullWidth={true} variant="contained" onClick={() => this.guardar()} color="primary" className={classes.button}>
            Guardar
          </Button>
          <Button fullWidth={true} color="secondary" onClick={() => this.limpiar("Todo borrado")} className={classes.button}>
            {cuadernoExists ? "Volver a cargar" : "Limpiar"}
          </Button>
        </div>
      </div>
    )
  }
};

Cuaderno.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cuaderno);