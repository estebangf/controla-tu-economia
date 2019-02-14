import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, Typography, TextField, InputAdornment, Checkbox, FormControlLabel, Button } from '@material-ui/core';

import Autocomplete from '../components/Autocomplete'
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


class Ingreso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      detalle: '',
      descripcion: '',
      importe: 0.00,
      esPrestamo: false,
      clear: undefined
    };
  }

  static getDerivedStateFromProps(props, state){
    const {
      ingresoExists,
      ingreso
    } = props;
    
    if (ingresoExists && (state.id == '' || state.id != ingreso._id)) {
      return {
        id: ingreso._id,
        detalle: ingreso.detalle,
        descripcion: ingreso.descripcion,
        importe: ingreso.importe,
        esPrestamo: ingreso.esPrestamo
      }
    }
    return null
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
      ingresoExists,
      ingreso
    } = this.props
    const { 
      detalle,
      descripcion,
      esPrestamo
    } = this.state;
    const importe = parseFloat(this.state.importe);
    const id = ingreso._id;

    if(ingresoExists) {
      Meteor.call('ingreso.editar',
        id,
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
    } else {
      Meteor.call('ingreso.nuevo',
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
  }
  limpiar(){
    const {
      ingresoExists,
      ingreso
    } = this.props

    if(ingresoExists) {
      this.setState({
        detalle: ingreso.detalle,
        descripcion: ingreso.descripcion,
        importe: ingreso.importe,
        esPrestamo: ingreso.esPrestamo
      });
    } else {
      this.setState({
        detalle: '',
        descripcion: '',
        importe: 0.00,
        esPrestamo: false
      });
    }
  }

  onSelectDetalle = (detalle, functions) => {
/*
  //ESTO ES PARA APROVECHAR EL OBJETO DEL AUTOCOMPLETAR:
    if (detalle) {
      this.setState({
        _id: detalle.data._id,
        name: detalle.data.name,
        email: detalle.data.email,
        clear: functions.clearSelection
      });
    } else {
      this.setState({
        _id: "new",
        name: "",
        email: "",
        clear: undefined
      });
    }
*/
  };
  
  clearSelection = () => {
    this.state.clear();
  };

  render() {
    const { 
      classes,
      loading,
      ingresoExists
    } = this.props;
    const { 
      detalle,
      descripcion,
      importe,
      esPrestamo
    } = this.state;

    return (
      <div className={classes.root}>
        <Typography variant="h4" className={classes.titulo}>{ingresoExists ? "Editar Ingreso" : "Nuevo Ingreso"}</Typography>
        <Link to={'/'}>Inicio</Link>
        
        <Autocomplete
          id="userAutocomplete"
          items={[
            {
              primary: "Alex Mason",
              secondary: undefined,
              data: { _id: "1", name: "Alex Mason", email: "some@email.com" }
            },
            {
              primary: "Boris Fenworth",
              secondary: undefined,
              data: { _id: "2", name: "Boris Fenworth", email: "some@email.com" }
            },
            {
              primary: "Charles Smith",
              secondary: undefined,
              data: { _id: "3", name: "Charles Smith", email: "some@email.com" }
            },
          ]}
          inputDetails={{
            id: "detalle",
            name: "detalle",
            label: "Detalle",
            placeholder: "Detalle",
            fullWidth: true,
//            avatar: "circle"
          }}
          onSelect={this.onSelectDetalle}
          onChange={this.handleChange("detalle")}
          value={detalle}
          disconect={detalle !== "new"}
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
          id="importe"
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
          label={"¿Es un Prestamo? " + (esPrestamo ? "Si" : "No")}
        />
        <div className={classes.actions}>
          <Button fullWidth={true} variant="contained" onClick={() => this.guardar()} color="primary" className={classes.button}>
            Guardar
          </Button>
          <Button fullWidth={true} color="secondary" onClick={() => this.limpiar()} className={classes.button}>
            {ingresoExists ? "Volver a cargar" : "Limpiar"}
          </Button>
        </div>
      </div>
    )
  }
};

Ingreso.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Ingreso);