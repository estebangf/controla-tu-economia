import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
const LinkGo = require('react-router-dom').Link

import { Link, withStyles, Typography, TextField, InputAdornment, Checkbox, FormControlLabel, Button } from '@material-ui/core';

import Autocomplete from '../components/Autocomplete'

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


class NuevoIngreso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detalle: undefined,
      descripcion: undefined,
      importe: 0.00,
      esPrestamo: false
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }
  handleChangeAutocomplete = name => item => {
    this.setState({
      [name]: item
    })
  }
  handleChangeChecked = name => event => {
    this.setState({
      [name]: event.target.checked
    })
  }

  guardar(){
    const { 
      descripcion,
      esPrestamo
    } = this.state;
    const detalle = this.state.detalle.value;
    const importe = parseFloat(this.state.importe);
    
    Meteor.call('nuevoIngreso',
      detalle,
      descripcion,
      importe,
      esPrestamo,
      (error, result) => {
        if (error){
          alert(error);
        } else {
          alert(result)
        }
      }
    )
  }
  limpiar(){
    this.setState({
      detalle: undefined,
      descripcion: '',
      importe: 0.00,
      esPrestamo: false
    });
  }

  render() {
    const { classes } = this.props;
    const { 
      detalle,
      descripcion,
      importe,
      esPrestamo
    } = this.state;

    return (
      <div className={classes.root}>
        <Typography>Nuevo Ingreso</Typography>
        <Autocomplete
          fullWidth={true}
          selected={detalle}
          label="Detalle" 
          handleChange={this.handleChangeAutocomplete("detalle")}
          stylesRoot={{}}
          stylesInput={{}} />
        <TextField
          id=""
          fullWidth={true}
          label="Descripcion"
          multiline
          rowsMax="4"
          value={descripcion}
          onChange={this.handleChange('descripcion')}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id=""
          fullWidth={true}
          type="number"
          label="Importe"
          value={importe}
          onChange={this.handleChange('importe')}
          className={classes.textField}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
            checked={esPrestamo}
            onChange={this.handleChangeChecked('esPrestamo')}
            color="primary"
          />
          }
          label={"¿Es un prestamo? " + (esPrestamo ? "Si" : "No")}
        />
        <div className={classes.actions}>
          <Button fullWidth={true} variant="contained" onClick={() => this.guardar()} color="primary" className={classes.button}>
            Guardar
          </Button>
          <Button fullWidth={true} color="secondary" onClick={() => this.limpiar()} className={classes.button}>
            Limpiar
          </Button>
        </div>
      </div>
    )
  }
};

NuevoIngreso.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NuevoIngreso);