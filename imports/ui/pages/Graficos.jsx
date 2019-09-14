import React, { Component } from 'react';
import PropTypes from 'prop-types';


import { withStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';

import { Paper, Typography, BottomNavigation, BottomNavigationAction, Box } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views';

import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import Chart from 'react-google-charts';
import SelectDialog from '../components/SelectDialog';

const styles = theme => ({
  root: {
    paddingTop: 10,
    paddingBottom: 50,
    textAlign: 'center',
    // bottom: 0,
    // position: "absolute",
    width: "100%"
  },
  grafico: {
    margin: 15,
    padding: 10,
    paddingTop: 0,
  },
  graficoSP: {
    margin: 15,
  },
  tituloGrafico: {
    padding: 10,
    color: "#808080",
  },
  bottomNavigation: {
    position: 'fixed',
    width: '100%',
    bottom: 0,
    boxShadow: '0px 1px 8px 0px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 3px 3px -2px rgba(0,0,0,0.12)'
  }
});

class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
      drawerOpen: false,
      expanded: false,
      saldoCuaderno: 0,
      value: 0,
      index: 0,
      categoriasSeleccionadas: []
    };
    
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeIndex = this.handleChangeIndex.bind(this)
    this.handleChangeCategoria = this.handleChangeCategoria.bind(this)
  }

  handleChangeIndex(value){
    this.setState({
      value
    });
  }
  handleChange(event, value){
    this.setState({
      value
    });
  }
  handleChangeCategoria(event){
    this.setState({
      categoriasSeleccionadas: event.target.value
    });
  }

  render() {
    const {
      classes,
      categorias,
      movimientos,
      desde
    } = this.props;

    const {
      value,
      categoriasSeleccionadas
    } = this.state

    console.log("categoriasSeleccionadas");
    console.log(categoriasSeleccionadas);
    
    //Filtro categorias usadas
    const cfiltradas = []
    movimientos.map(m => {
      if (!cfiltradas.includes(m.categoria)){
        cfiltradas.push(m.categoria)
      }
    })
    const categoriasUsadas = categorias.filter(c => {
      return cfiltradas.includes(c._id) 
    })

    //Filtro categorias seleccionadas
    const categoriasFiltradas = categorias.filter(c => {
      if ( !!!categoriasSeleccionadas.length){
        return cfiltradas.includes(c._id) 
      } else if (categoriasSeleccionadas.includes(c._id)) {
        return cfiltradas.includes(c._id) 
      }
    })

    //preparo objetos de graficos
    const idsCategorias = []
    const nombresCategorias = []
    const colors = []
    const totales = new Array(categoriasFiltradas.length)

    //defino primeros 3
    categoriasFiltradas.forEach((c, i) => {
      idsCategorias.push(c._id)
      nombresCategorias.push(c.nombre)
      colors.push(!!c.color ? c.color : "#e5e4e2")
    });
    
    //defino totales y fecha maxima
    var maxDate = new Date(desde);
    movimientos.forEach(m => {
      categoriasFiltradas.forEach((c, i) => {
        if (m.categoria == c._id) {
          if (!!totales[i]) {
            totales[i] -= m.importe
          } else {
            totales[i] = 0-m.importe
          }
        }
      })
      if(maxDate < m.fecha){
        maxDate = m.fecha
      }
    });
    
    //defino importes por fecha para grafico de lineas
    const importesPorFecha = []
    for (let i = new Date(desde); i <= maxDate; i = new Date(i.setDate(i.getDate()+1))) {
      const importes = []
      var importeVerificacion = 0
      idsCategorias.forEach(idC => {
        var importe = 0
        movimientos.map(m => {
          if(m.categoria == idC && m.fecha <= i){
            importe -= m.importe
          }
        })
        importeVerificacion += importe
        importes.push(importe)
      })
      if(importeVerificacion != 0 || i == new Date(desde)){
        importesPorFecha.push([i, ...importes])
      }
    }

    return (
      <div className={classes.root}>
        <SwipeableViews
          index={value}
          onChangeIndex={this.handleChangeIndex}
        >
          <Box index={0} hidden={value !== 0}>
            <Paper container elevation={3} className={classes.grafico}>
              <Typography className={classes.tituloGrafico}>Egresos por categoria</Typography>
              <Chart
                width="calc(100% - 10px)"
                height="calc(100% - 10px)"
                chartType="Bar"
                loader={<div>Loading Chart</div>}
                data={[
                  [' ', ...(!!nombresCategorias ? nombresCategorias : [])],
                  [' ', ...(!!totales ? totales : [])],
                ]}
                options={{
                  colors,
                  // Material design options
                  bars: 'horizontal',
                  axes: {
                    y: {
                      0: { side: 'right' },
                    },
                  },
                }}
              />
            </Paper>
            <Paper container elevation={3} className={classes.grafico}>
              <Typography className={classes.tituloGrafico}>Egresos por categoria</Typography>
              <Chart
                width="calc(100% - 10px)"
                height="calc(100% - 10px)"
                chartType="Bar"
                loader={<div>Loading Chart</div>}
                data={[
                  [' ', ...(!!nombresCategorias ? nombresCategorias : [])],
                  [' ', ...(!!totales ? totales : [])],
                ]}
              />
            </Paper>
            <Paper container elevation={3} className={classes.grafico}>
              <Typography className={classes.tituloGrafico}>Egresos por categoria</Typography>
              <Chart
                width="100%"
                height="100%"
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={[
                  [' ', ...(!!nombresCategorias ? nombresCategorias : [])],
                  [' ', ...(!!totales ? totales : [])],
                ]}
                options={{
                  colors,
                  // Material design options
                  bars: 'horizontal',
                  axes: {
                    y: {
                      0: { side: 'right' },
                    },
                  },
                  legend: { position: 'top', maxLines: 3 },
                }}
              />
            </Paper>
          </Box>
          <Box index={1} hidden={value !== 1}>
            <Paper container elevation={3} className={classes.graficoSP}>
              <Typography className={classes.tituloGrafico}>Egresos por categoria</Typography>
              <Chart
                width="calc(100% - 10px)"
                height="calc(100% - 10px)"
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ["Categoria", "Monto"],
                  ...nombresCategorias.map((nc, i) => {
                    return [nc, totales[i]]
                  })
                ]}
                options={{
                  colors,
                  pieHole: 0.2,
                  is3D: true
                }}
              />
            </Paper>
            <Paper container elevation={3} className={classes.graficoSP}>
              <Typography className={classes.tituloGrafico}>Egresos por categoria</Typography>
              <Chart
                width="calc(100% - 10px)"
                height="calc(100% - 10px)"
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ["Categoria", "Monto"],
                  ...nombresCategorias.map((nc, i) => {
                    return [nc, totales[i]]
                  })
                ]}
                options={{
                  colors,
                  pieHole: 0.3,
                }}
              />
            </Paper>
          </Box>
          <Box index={2} hidden={value !== 2}>
            <Paper container elevation={3} className={classes.grafico}>
              <Typography className={classes.tituloGrafico}>Egresos por categoria</Typography>
              <Chart
                width="calc(100% - 10px)"
                height="calc(100% - 10px)"
                chartType="Line"
                loader={<div>Loading Chart</div>}
                data={[
                  [{ type: 'date', label: " "}, ...nombresCategorias],
                  ...importesPorFecha
                ]}
                options={{
                  colors,
                }}
                />
            </Paper>
            <Paper container elevation={3} className={classes.grafico}>
              <Typography className={classes.tituloGrafico}>Egresos por categoria</Typography>
              <Chart
                width="100%"
                height="100%"
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={[
                  [" ", ...nombresCategorias],
                  ...importesPorFecha
                ]}
                options={{
                  colors,
                  legend: { position: 'top', maxLines: 3 },
                }}
              />
            </Paper>
          </Box>
          <Box index={3} hidden={value !== 3}>
            <Typography className={classes.tituloGrafico}>Seleccione las categorias</Typography>
            <SelectDialog
              color="#337dbf"
              title={"Categorias"}
              imgFolder={"categorias"}
              items={categoriasUsadas}
              id={"_id"}
              text={"nombre"}
              avatar={"nombre"}
              value={categoriasSeleccionadas}
              multiple={true}
              openAutomatic={false}
              onChange={this.handleChangeCategoria}
            />
          </Box>
        </SwipeableViews>


        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          className={classes.bottomNavigation}
        >
          <BottomNavigationAction label="Barras" value={0} icon={<RestoreIcon />} />
          <BottomNavigationAction label="Circulos" value={1} icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Lineas" value={2} icon={<LocationOnIcon />} />
          <BottomNavigationAction label="Opciones" value={3} icon={<SettingsApplicationsIcon />} />
        </BottomNavigation>
      </div>
    )
  }
};

Inicio.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inicio);
