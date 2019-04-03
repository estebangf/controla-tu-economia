import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, Typography, TextField, InputAdornment, Checkbox, FormControlLabel, Button } from '@material-ui/core';

import Autocomplete from '../components/Autocomplete'
import { Meteor } from 'meteor/meteor';

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
  }
});


class Gasto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      detalle: '',
      descripcion: '',
      importe: 0.00,
      esInsumo: false,
      clear: undefined
    };
  }

  static getDerivedStateFromProps(props, state){
    const {
      loading,
      gastoExists,
      gasto
    } = props;

    console.log("props y state");
    console.log(props);
    console.log(state);

    if (!loading && gastoExists) {
      if (state.id == '' || state.id != gasto._id) {
        return {
          id: gasto._id,
          detalle: gasto.detalle,
          descripcion: gasto.descripcion,
          importe: gasto.importe,
          esInsumo: gasto.esInsumo
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
      gastoExists,
      gasto,
      cuentaId
    } = this.props
    const { 
      detalle,
      descripcion,
      esInsumo
    } = this.state;
    const importe = parseFloat(this.state.importe);
    const id = gasto._id;

    console.log("cuentaId")
    console.log(cuentaId)
    if(gastoExists) {
      Meteor.call('gasto.editar',
        id,
        detalle,
        descripcion,
        importe,
        esInsumo,
        (error, result) => {
          if (error){
            alert(error);
          } else {
            alert(result)
          }
        }
      )
    } else {
      Meteor.call('gasto.nuevo',
        detalle,
        descripcion,
        importe,
        esInsumo,
        cuentaId,
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
      gastoExists,
      gasto
    } = this.props

    if(gastoExists) {
      this.setState({
        detalle: gasto.detalle,
        descripcion: gasto.descripcion,
        importe: gasto.importe,
        esInsumo: gasto.esInsumo
      });
    } else {
      this.setState({
        detalle: '',
        descripcion: '',
        importe: 0.00,
        esInsumo: false
      });
      !!this.state.clear ? this.state.clear() : undefined;
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
      gastoExists
    } = this.props;
    const { 
      detalle,
      descripcion,
      importe,
      esInsumo
    } = this.state;

    return (
      <div className={classes.root}>
        <Autocomplete
          id="detalleAutocomplete"
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
            checked={esInsumo}
            onChange={this.handleChangeChecked('esInsumo')}
            color="primary"
          />
          }
          label={"¿Es insumo de trabajo? " + (esInsumo ? "Si" : "No")}
        />
        <div className={classes.actions}>
          <Button fullWidth={true} variant="contained" onClick={() => this.guardar()} color="primary" className={classes.button}>
            Guardar
          </Button>
          <Button fullWidth={true} color="secondary" onClick={() => this.limpiar()} className={classes.button}>
            {gastoExists ? "Volver a cargar" : "Limpiar"}
          </Button>
        </div>
      </div>
    )
  }
};

Gasto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Gasto);