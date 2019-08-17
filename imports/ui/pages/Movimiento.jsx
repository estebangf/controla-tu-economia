import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, Typography, TextField, InputAdornment, Checkbox, FormControlLabel, Button } from '@material-ui/core';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import SelectDialog from '../components/SelectDialog.jsx'

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
    width: "100%"
  },
  textFieldFirst: {
    marginTop: 0
  }
});

class Movimiento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      detalle: '',
      descripcion: '',
      importe: 0.00,
      variaLaGanancia: props.esIngreso,
      fecha: new Date(),
      categoria: '',
      clear: undefined
    };

    this.handleDateChange = this.handleDateChange.bind(this)
  }

  static getDerivedStateFromProps(props, state){
    const {
      loading,
      movimientoExists,
      movimiento
    } = props;

    if (!loading && movimientoExists) {
      if (state.id == '' || state.id != movimiento._id) {
        return {
          id: movimiento._id,
          detalle: movimiento.detalle,
          descripcion: movimiento.descripcion,
          importe: Math.abs(movimiento.importe),
          variaLaGanancia: movimiento.variaLaGanancia,
          fecha: movimiento.fecha,
          categoria: movimiento.categoria
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
      movimientoExists,
      movimiento,
      cuadernoId,
      esIngreso,
    } = this.props
    const {
      detalle,
      descripcion,
      variaLaGanancia,
      fecha,
      categoria
    } = this.state;
    const imp = Math.abs(parseFloat(this.state.importe));
    const importe = esIngreso ? imp : 0-imp;
    const id = movimiento._id;

    const self = this;

    if(movimientoExists) {
      Meteor.call('movimiento.editar',
        id,
        detalle,
        descripcion,
        importe,
        variaLaGanancia,
        fecha,
        categoria,
        (error, result) => {
          if (error){
            self.props.handleAlerta(error.toString(), "error")
          } else {
            self.props.handleAlerta("Movimiento editado", "success")
          }
        }
      )
    } else {
      Meteor.call('movimiento.nuevo',
        detalle,
        descripcion,
        importe,
        variaLaGanancia,
        cuadernoId,
        fecha,
        categoria,
        (error, result) => {
          if (error){
            self.props.handleAlerta(error.toString(), "error")
          } else {
            self.props.handleAlerta("Movimiento creado", "success")
          }
        }
      )
    }
  }
  limpiar(){
    const {
      movimientoExists,
      movimiento,
      esIngreso
    } = this.props

    if(movimientoExists) {
      this.setState({
        detalle: movimiento.detalle,
        descripcion: movimiento.descripcion,
        importe: Math.abs(movimiento.importe),
        variaLaGanancia: movimiento.variaLaGanancia,
        fecha: movimiento.fecha,
        categoria: movimiento.categoria
      });
    } else {
      this.setState({
        detalle: '',
        descripcion: '',
        importe: 0.00,
        variaLaGanancia: esIngreso,
        fecha: new Date(),
        categoria: ''
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
      movimientoExists,
      esIngreso,
      categorias
    } = this.props;
    const {
      detalle,
      descripcion,
      importe,
      variaLaGanancia,
      fecha,
      categoria,
      categoriaOpen
    } = this.state;

    return (
      <div className={classes.root}>
        {/*
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
          onChange={this.handleChangeCategoria("detalle")}
          value={detalle}
          disconect={detalle !== "new"}
        />
        */}
        
        <SelectDialog
          title={"Categoria"}
          imgFolder={"categorias"}
          items={categorias}
          id={"_id"}
          text={"nombre"}
          avatar={"nombre"}
          value={categoria}
          openAutomatic={!loading && !!!categoria}
          onChange={this.handleChange("categoria")}
        />

{
        /*
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="categoria">Categoria</InputLabel>
          <Select
            value={categoria}
            fullWidth={true}
            onChange={this.handleChange('categoria')}
            inputProps={{
              name: 'categoria',
              id: 'categoria',
            }}
          >
            <MenuItem disabled value={''}>No seleccionada</MenuItem>
            {categorias.map(c => {
              return (
                <MenuItem value={c._id}>{c.nombre}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
        */
}

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
            checked={esIngreso ? !variaLaGanancia : variaLaGanancia}
            onChange={this.handleChangeChecked('variaLaGanancia')}
            color="primary"
          />
          }
          label=
          {
            esIngreso  ?
              (!variaLaGanancia ? "Es un prestamo" : "No es un prestamo")
              :
              (variaLaGanancia ? "Es un insumo" : "No es insumo")
          }
        />
        <div className={classes.actions}>
          <Button fullWidth={true} variant="contained" onClick={() => this.guardar()} color="primary" className={classes.button}>
            Guardar
          </Button>
          <Button fullWidth={true} color="secondary" onClick={() => this.limpiar()} className={classes.button}>
            {movimientoExists ? "Volver a cargar" : "Limpiar"}
          </Button>
        </div>
      </div>
    )
  }
};

Movimiento.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Movimiento);
