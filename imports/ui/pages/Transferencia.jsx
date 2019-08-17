import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, Typography, TextField, InputAdornment, Checkbox, FormControlLabel, Button, FormControl, InputLabel, Select, Input, FormHelperText, MenuItem } from '@material-ui/core';

import Autocomplete from '../components/Autocomplete'
import { Meteor } from 'meteor/meteor';
import Fechas from '../components/Fechas';
import SelectDialog from '../components/SelectDialog';

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
  },
  textFieldFirst: {
    marginTop: 1
  }
});

class Transferencia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      categoria: '',
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
          categoria: ingreso.categoria,
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
      categoria,
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
        categoria,
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
            self.props.handleAlerta(error.toString(), "error")
          } else {
            self.props.handleAlerta("Transferencia editada", "success")
          }
        }
      )
    } else {
      Meteor.call('transferencia.nueva',
        categoria,
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
            self.props.handleAlerta(error.toString(), "error")
          } else {
            self.props.handleAlerta("Transferencia creada", "success")
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
        categoria: transferencia.categoria,
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
        categoria: '',
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
      cuadernoSeleccionada,
      categorias
    } = this.props;
    const {
      categoria,
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
        <SelectDialog
          title={"Categorias"}
          imgFolder={"categorias"}
          items={categorias}
          id={"_id"}
          text={"nombre"}
          avatar={"nombre"}
          value={categoria}
          openAutomatic={!loading && !!!categoria}
          onChange={this.handleChange("categoria")}
        />

        <TextField
          InputLabelProps={{ shrink: !!detalle && detalle != '' }}
          id="detalle"
          fullWidth={true}
          label="Detalle"
          value={detalle}
          onChange={this.handleChange('detalle')}
          className={classes.textFieldFirst}
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
        <SelectDialog
          title={"Cuaderno Egreso"}
          items={cuadernos}
          id={"_id"}
          text={"nombre"}
          avatar={"nombre"}
          value={cuadernoEgreso}
          openAutomatic={!loading && !!categoria && !!!cuadernoEgreso}
          onChange={this.handleChange("cuadernoEgreso")}
        />
        <SelectDialog
          title={"Cuaderno Ingreso"}
          items={cuadernos}
          id={"_id"}
          text={"nombre"}
          avatar={"nombre"}
          value={cuadernoIngreso}
          openAutomatic={!loading && !!cuadernoEgreso && !!!cuadernoIngreso}
          onChange={this.handleChange("cuadernoIngreso")}
        />

        <TextField
          InputLabelProps={{ shrink: !!descripcion && descripcion != '' }}
          id="descripcion"
          fullWidth={true}
          label="Descripcion"
          value={descripcion}
          onChange={this.handleChange('descripcion')}
          className={classes.textFieldFirst}
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
