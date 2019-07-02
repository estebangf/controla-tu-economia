import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, Typography, TextField, InputAdornment, Checkbox, FormControlLabel, Button, FormControl, InputLabel, Select, Input, FormHelperText, MenuItem } from '@material-ui/core';

import Autocomplete from '../components/Autocomplete'
import { Meteor } from 'meteor/meteor';
import Fechas from '../components/Fechas';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    padding: 25,
    paddingTop: 15
  },
  actions:{
    paddingLeft: 15,
    paddingRight: 15
  },
  button: {
    marginBottom: 5
  },
  formControl: {
    width: "100%",
    marginTop: 25
  }
});

class Transferencia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      detalle: '',
      fecha: new Date(),
      descripcion: '',
      importe: 0.00,
      cuadernoEgreso: '',
      egresoVariaLaGanancia: false,
      cuadernoIngreso: '',
      ingresoVariaLaGanancia: false
    };

    this.handleDateChange = this.handleDateChange.bind(this)
  }

  static getDerivedStateFromProps(props, state){
    const {
      loading,
      transferenciaExists,
      transferencia,
      movimientosExists,
      egreso,
      ingreso,
    } = props;

    if (!loading && transferenciaExists && movimientosExists) {
      if (
        state.id == '' ||
        state.id != transferencia._id
        ) {
        return {
          id: transferencia._id,
          detalle: ingreso.detalle,
          fecha: transferencia.fecha,
          descripcion: ingreso.descripcion,
          importe: Math.abs(ingreso.importe),
          cuadernoEgreso: egreso.cuadernoId,
          egresoVariaLaGanancia: egreso.variaLaGanancia,
          cuadernoIngreso: ingreso.cuadernoId,
          ingresoVariaLaGanancia: ingreso.variaLaGanancia
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
    const esIngreso = name == "ingresoVariaLaGanancia"
    const checked = esIngreso ? !event.target.checked : event.target.checked
    this.setState({
        [name]: checked
    })
  }
  handleDateChange(name, date){
    const fecha = new Date(date)
    this.setState({ [name]: fecha });
  };

  
  guardar(){
    const {
      loading,
      transferenciaExists,
      transferencia,
      movimientosExists,
      egreso,
      ingreso,
    } = this.props
    const {
      id,
      detalle,
      fecha,
      descripcion,
      cuadernoEgreso,
      egresoVariaLaGanancia,
      ingresoVariaLaGanancia,
      cuadernoIngreso
    } = this.state

    const importe = Math.abs(this.state.importe)
    const self = this;

    if(transferenciaExists) {
      Meteor.call('transferencia.editar',
        id,
        detalle,
        fecha,
        descripcion,
        importe,
        cuadernoEgreso,
        egresoVariaLaGanancia,
        ingresoVariaLaGanancia,
        cuadernoIngreso,
        (error, result) => {
          if (error){
            console.log(error);
          } else {
            console.log(result)
            self.props.handleAlerta("Transferencia editado")
          }
        }
      )
    } else {
      Meteor.call('transferencia.nueva',
        detalle,
        fecha,
        descripcion,
        importe,
        cuadernoEgreso,
        egresoVariaLaGanancia,
        ingresoVariaLaGanancia,
        cuadernoIngreso,
        (error, result) => {
          if (error){
            console.log(error);
          } else {
            console.log(result)
            self.props.handleAlerta("Transferencia creado")
          }
        }
      )
    }
  }
  limpiar(){
    const {
      transferenciaExists,
      transferencia,
      movimientosExists,
      egreso,
      ingreso,
    } = this.props

    if(transferenciaExists && movimientosExists) {
      this.setState({
        detalle: transferencia.detalle,
        fecha: transferencia.fecha,
        descripcion: transferencia.descripcion,
        importe: Math.abs(ingreso.importe),
        cuadernoEgreso: egreso._id,
        egresoVariaLaGanancia: egreso.variaLaGanancia,
        cuadernoIngreso: ingreso._id,
        ingresoVariaLaGanancia: ingreso.variaLaGanancia
      });
    } else {
      this.setState({
        detalle: '',
        fecha: new Date(),
        descripcion: '',
        importe: 0.00,
        cuadernoEgreso: '',
        egresoVariaLaGanancia: false,
        cuadernoIngreso: '',
        ingresoVariaLaGanancia: true
      });
    }
  }

  render() {
    const {
      classes,
      loading,
      transferenciaExists,
      esIngreso,
      cuadernos,
      cuadernoSeleccionada
    } = this.props;
    const {
      detalle,
      fecha,
      descripcion,
      importe,
      cuadernoEgreso,
      egresoVariaLaGanancia,
      cuadernoIngreso,
      ingresoVariaLaGanancia
    } = this.state;
    return (
      <div className={classes.root}>
        <TextField
          InputLabelProps={{ shrink: !!detalle && detalle != '' }}
          id="detalle"
          fullWidth={true}
          label="Detalle"
          value={detalle}
          onChange={this.handleChange('detalle')}
          className={classes.textField}
          margin="normal"
        />
        <Fechas
          id={'fecha'}
          fecha={fecha}
          adornmentPosition="end"
          autoOk={true}
          keyboard={true}
          fullWidth={true}
          disableFuture={true}
          variant="standar"
          label="Fecha"
          tipo="fechaTiempoTeclado"
          maxDate={new Date()}
          maxDateMessage={"Fecha mayor a hoy"}
          invalidDateMessage={"Ej: 01/01/2019"}
          handleDateChange={this.handleDateChange}
          inputRoot={classes.inputFechaRoot}
        />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-helper">Cuaderno de egreso</InputLabel>
          <Select
            value={cuadernoEgreso}
            onChange={this.handleChange("cuadernoEgreso")}
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
          <FormHelperText>Cuaderno donde se realize el EGRESO</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-helper">Destino</InputLabel>
          <Select
            value={cuadernoIngreso}
            onChange={this.handleChange("cuadernoIngreso")}
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
          <FormHelperText>Cuaderno donde se realize el INGRESO</FormHelperText>
        </FormControl>

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
            checked={egresoVariaLaGanancia}
            onChange={this.handleChangeChecked('egresoVariaLaGanancia')}
            color="primary"
          />
          }
          label={ egresoVariaLaGanancia ? "Es un insumo" : "No es insumo" }
        /><em> - Origen</em>
        <br />
        <FormControlLabel
          control={
            <Checkbox
            checked={!ingresoVariaLaGanancia}
            onChange={this.handleChangeChecked('ingresoVariaLaGanancia')}
            color="primary"
          />
          }
          label={ !ingresoVariaLaGanancia ? "Es un prestamo" : "No es un prestamo" }
        /><em> - Destino</em>
        <div className={classes.actions}>
          <Button fullWidth={true} variant="contained" onClick={() => this.guardar()} color="primary" className={classes.button}>
            Guardar
          </Button>
          <Button fullWidth={true} color="secondary" onClick={() => this.limpiar()} className={classes.button}>
            {transferenciaExists ? "Volver a cargar" : "Limpiar"}
          </Button>
        </div>
      </div>
    )
  }
};

Transferencia.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Transferencia);
