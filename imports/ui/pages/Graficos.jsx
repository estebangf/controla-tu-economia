import React, { Component } from 'react';
import PropTypes from 'prop-types';


import { withStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';

import { Paper, Typography, BottomNavigation, BottomNavigationAction, Box } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views';

import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import Chart from 'react-google-charts';

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
    bottom: 0
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
      index: 0
    };
    
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeIndex = this.handleChangeIndex.bind(this)
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

  render() {
    const { classes, categorias, movimientos } = this.props;
    const {
      value,
      index
    } = this.state

    const nombresCategorias = []
    const idsCategorias = []

    categorias.forEach((element, i) => {
      if (i < 5){
        nombresCategorias.push(element.nombre)
        idsCategorias.push(element._id)
      }
    });
    

    const totales = []
    var maxDate = 1;
    for (let i = 0; i < nombresCategorias.length; i++) {
      let total = 0;
      movimientos.forEach(m => {
        if(maxDate < m.fecha.getDate()){
          maxDate = m.fecha.getDate()
        }
        if(m.categoria == idsCategorias[i]){
          total -= m.importe
        }
      })
      totales.push(total)
    }

    const importesPorFecha = []
    for (let i = 1; i <= maxDate; i++) {
      const importes = []
      var importeVerificacion = 0
      idsCategorias.forEach(idC => {
        var importe = 0
        movimientos.map(m => {
          if(m.categoria == idC && m.fecha.getDate() <= i){
            importe -= m.importe
          }
        })
        importeVerificacion += importe
        importes.push(importe)
      })
      if(importeVerificacion != 0 || i == 1){
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
                  [" ", ...nombresCategorias],
                  ...importesPorFecha
                ]}
              />
            </Paper>
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
        </BottomNavigation>
      </div>
    )
  }
};

Inicio.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inicio);
