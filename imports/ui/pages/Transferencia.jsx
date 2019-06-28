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
      descripcion: '',
      importe: 0.00,
      variaLaGanancia: props.esIngreso,
      fecha: new Date(),
      clear: undefined
    };

    this.handleDateChange = this.handleDateChange.bind(this)
  }

  static getDerivedStateFromProps(props, state){
    const {
      loading,
      transferenciaExists,
      transferencia
    } = props;

    if (!loading && transferenciaExists) {
      if (state.id == '' || state.id != transferencia._id) {
        return {
          id: transferencia._id,
          detalle: transferencia.detalle,
          descripcion: transferencia.descripcion,
          importe: Math.abs(transferencia.importe),
          variaLaGanancia: transferencia.variaLaGanancia,
          fecha: transferencia.fecha
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
    const { esIngreso, variaLaGanancia } = this.props
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
      transferenciaExists,
      transferencia,
      cuadernoId,
      esIngreso
    } = this.props
    const {
      detalle,
      descripcion,
      variaLaGanancia,
      fecha
    } = this.state;
    const imp = Math.abs(parseFloat(this.state.importe));
    const importe = esIngreso ? imp : 0-imp;
    const id = transferencia._id;

    const self = this;

    if(transferenciaExists) {
      Meteor.call('transferencia.editar',
        id,
        detalle,
        descripcion,
        importe,
        variaLaGanancia,
        fecha,
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
      Meteor.call('transferencia.nuevo',
        detalle,
        descripcion,
        importe,
        variaLaGanancia,
        cuadernoId,
        fecha,
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
      esIngreso
    } = this.props

    if(transferenciaExists) {
      this.setState({
        detalle: transferencia.detalle,
        descripcion: transferencia.descripcion,
        importe: Math.abs(transferencia.importe),
        variaLaGanancia: transferencia.variaLaGanancia,
        fecha: transferencia.fecha
      });
    } else {
      this.setState({
        detalle: '',
        descripcion: '',
        importe: 0.00,
        variaLaGanancia: esIngreso,
        fecha: new Date()
      });
    }
  }

  clearSelection = () => {
    this.state.clear();
  };

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
      descripcion,
      importe,
      fecha
    } = this.state;

    const transferencia = {
      origen: {
        id: cuadernoSeleccionada._id,
        variaLaGanancia: false
      },
      destino: {
        id: 0,
        variaLaGanancia: false
      }
    }
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
          <InputLabel htmlFor="age-helper">Cuaderno de origen</InputLabel>
          <Select
            value={transferencia.origen.id}
            onChange={"handleChange"}
          >
            <MenuItem value={0}>
              <em>No seleccionado</em>
            </MenuItem>
            {
              cuadernos.map((cuaderno) => {
                return (
                  <MenuItem value={cuaderno._id}>{cuaderno.nombre}</MenuItem>
                )
              })
            }
          </Select>
          <FormHelperText>Cuaderno donde se realize el EGRESO</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-helper">Destino</InputLabel>
          <Select
            value={transferencia.destino.id}
            onChange={"handleChange"}
          >
            <MenuItem value={0}>
              <em>No seleccionado</em>
            </MenuItem>
            {
              cuadernos.map((cuaderno) => {
                return (
                  <MenuItem value={cuaderno._id}>{cuaderno.nombre}</MenuItem>
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
            checked={transferencia.origen.variaLaGanancia}
            onChange={this.handleChangeChecked('variaLaGanancia')}
            color="primary"
          />
          }
          label={ transferencia.origen.variaLaGanancia ? "Es un insumo" : "No es insumo" }
        /><em> - Origen</em>
        <br />
        <FormControlLabel
          control={
            <Checkbox
            checked={!transferencia.destino.variaLaGanancia}
            onChange={this.handleChangeChecked('variaLaGanancia')}
            color="primary"
          />
          }
          label={ !transferencia.destino.variaLaGanancia ? "Es un prestamo" : "No es un prestamo" }
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
