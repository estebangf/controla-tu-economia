import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, Typography, TextField, InputAdornment, Checkbox, FormControlLabel, Button, FormHelperText } from '@material-ui/core';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import { Meteor } from 'meteor/meteor';
import Fechas from '../components/Fechas';

const HOY_M = new Date()
HOY_M.setHours(0)
HOY_M.setMinutes(0)
HOY_M.setSeconds(0)
HOY_M.setMilliseconds(0)

const HOY_N = new Date()
HOY_N.setHours(23)
HOY_N.setMinutes(59)
HOY_N.setSeconds(59)
HOY_N.setMilliseconds(99)

const INICIO_MES = new Date(HOY_M)
INICIO_MES.setDate(1)

const FINAL_MES = new Date(HOY_N)
FINAL_MES.setMonth(HOY_N.getMonth()+1)
FINAL_MES.setDate(0)

const styles = theme => ({
  root: {
    padding: 25,
    paddingTop: 15
  },
  actions: {
    marginTop: 30,
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

class Presupuesto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      cuadernoId: '',
      nombre: '',
      categorias: [],
      desde: INICIO_MES,
      hasta: FINAL_MES,
      importe: 0
    };

    this.handleDateChange = this.handleDateChange.bind(this)
  }

  static getDerivedStateFromProps(props, state){
    const {
      loading,
      presupuestoExists,
      presupuesto
    } = props;

    if (!loading && presupuestoExists) {
      if (state.id == '' || state.id != presupuesto._id) {
        return {
          id: presupuesto._id,
          cuadernoId: presupuesto.cuadernoId,
          nombre: presupuesto.nombre,
          categorias: presupuesto.categorias,
          desde: presupuesto.desde,
          hasta: presupuesto.hasta,
          importe: presupuesto.importe
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
  handleDateChange(name, date){
    const fecha = new Date(date)
    this.setState({ [name]: fecha });
  };

  
  guardar(){
    const {
      presupuestoExists,
    } = this.props
    const {
      id,
      cuadernoId,
      nombre,
      categorias,
      desde,
      hasta,
      importe
    } = this.state;

    const self = this;

    if(presupuestoExists) {
      Meteor.call('presupuesto.editar',
        id,
        cuadernoId,
        nombre,
        categorias,
        desde,
        hasta,
        Math.abs(importe),
        (error, result) => {
          if (error){
            self.props.handleAlerta(error.toString(), "error")
          } else {
            self.props.handleAlerta("Presupuesto editado", "success")
          }
        }
      )
    } else {
      Meteor.call('presupuesto.nuevo',
        cuadernoId,
        nombre,
        categorias,
        desde,
        hasta,
        Math.abs(importe),
        (error, result) => {
          if (error){
            self.props.handleAlerta(error.toString(), "error")
          } else {
            self.props.handleAlerta("Presupuesto creado", "success")
          }
        }
      )
    }
  }
  limpiar(){
    const {
      presupuestoExists,
      presupuesto,
    } = this.props

    if(presupuestoExists) {
      this.setState({
        id: presupuesto._id,
        cuadernoId: presupuesto.cuadernoId,
        nombre: presupuesto.nombre,
        categorias: presupuesto.categorias,
        desde: presupuesto.desde,
        hasta: presupuesto.hasta,
        importe: presupuesto.importe,
      });
    } else {
      this.setState({
        id: '',
        cuadernoId: '',
        nombre: '',
        categorias: [],
        desde: INICIO_MES,
        hasta: FINAL_MES,
        importe: 0
      });
    }
  }

  render() {
    const {
      classes,
      presupuestoExists,
      cuadernos
    } = this.props;
    const categoriasAll = this.props.categorias;

    const {
      cuadernoId,
      nombre,
      categorias,
      desde,
      hasta,
      importe
    } = this.state;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-helper">Cuaderno del presupuesto</InputLabel>
          <Select
            value={cuadernoId}
            onChange={this.handleChange("cuadernoId")}
          >
            <MenuItem value={0}>
              <em>No seleccionado</em>
            </MenuItem>
            {
              cuadernos.map((cuaderno) => {
                return (
                  <MenuItem value={!!cuaderno.cuadernoVinculado ? cuaderno.cuadernoVinculado : cuaderno._id}>{cuaderno.nombre}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="categorias">Categorias</InputLabel>
          <Select
            multiple
            value={categorias}
            onChange={this.handleChange('categorias')}
            inputProps={{
              name: 'categorias',
              id: 'categorias',
            }}
          >
            {categoriasAll.map(categoria => {
              return (
                <MenuItem key={categoria._id} value={categoria._id}>
                  {categoria.nombre}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>

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
        
        <Fechas
          id={'desde'}
          fecha={desde}
          adornmentPosition="end"
          autoOk={true}
          keyboard={true}
          fullWidth={true}
          variant="standar"
          label="Fecha"
          tipo="fechaTeclado"
          maxDate={hasta}
          maxDateMessage={"Fecha mayor al final del periodo"}
          invalidDateMessage={"Ej: 01/01/2019"}
          handleDateChange={this.handleDateChange}
          inputRoot={classes.inputFechaRoot}
        />
        <Fechas
          id={'hasta'}
          fecha={hasta}
          adornmentPosition="end"
          autoOk={true}
          keyboard={true}
          fullWidth={true}
          variant="standar"
          label="Fecha"
          tipo="fechaTeclado"
          invalidDateMessage={"Ej: 01/01/2019"}
          handleDateChange={this.handleDateChange}
          inputRoot={classes.inputFechaRoot}
        />

        <TextField
          id="importe"
          fullWidth={true}
          type="number"
          label="Importe"
          value={Math.abs(importe)}
          onChange={this.handleChange('importe')}
          className={classes.textField}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          margin="normal"
        />

        <div className={classes.actions}>
          <Button fullWidth={true} variant="contained" onClick={() => this.guardar()} color="primary" className={classes.button}>
            Guardar
          </Button>
          <Button fullWidth={true} color="secondary" onClick={() => this.limpiar()} className={classes.button}>
            {presupuestoExists ? "Volver a cargar" : "Limpiar"}
          </Button>
        </div>
      </div>
    )
  }
};

Presupuesto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Presupuesto);
