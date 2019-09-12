import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';

import { Paper } from '@material-ui/core';

import Chart from 'react-google-charts';
import { Categorias } from '/imports/api/categorias/categorias';

const styles = theme => ({
  root: {
    paddingTop: 10,
    textAlign: 'center',
    // bottom: 0,
    // position: "absolute",
    width: "100%"
  },
  grafico: {
    margin: 15,
    padding: 10,
  },
  graficoSP: {
    margin: 15,
  }
});

class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
      drawerOpen: false,
      expanded: false,
      saldoCuaderno: 0
    };
  }

  render() {
    const { classes, categorias, movimientos } = this.props;

    const nombresCategorias = []
    const idsCategorias = []

    categorias.forEach((element, index) => {
      if (index < 4){
        nombresCategorias.push(element.nombre)
        idsCategorias.push(element._id)
      }
    });

    console.log(idsCategorias);

    const totales = []
    for (let index = 0; index < nombresCategorias.length; index++) {
      let total = 0;
      movimientos.forEach(m => {
        console.log(m.categoria);
        console.log(m.importe);
        console.log(idsCategorias[index]);
        if(m.categoria == idsCategorias[index]){
          total -= m.importe
        }
      })
      totales.push(total)
    }
    console.log(totales);


    return (
      <div className={classes.root}>
        <Paper container elevation={3} className={classes.grafico}>
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
              chart: {
                title: 'Egresos por Categoria',
                subtitle: '',
              },
              axes: {
                y: {
                  0: { side: 'right' },
                },
              },
            }}
          />
        </Paper>
        <Paper container elevation={3} className={classes.graficoSP}>
          <Chart
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["Categoria", "Monto"],
              ...nombresCategorias.map((nc, i) => {
                return [nc, totales[i]]
              })
            ]}
            options={{
              chart: {
                title: 'Egresos por Categoria',
                subtitle: '',
              },
              pieHole: 0.2,
              is3D: true
            }}
          />
        </Paper>
        <Paper container elevation={3} className={classes.grafico}>
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
              chart: {
                title: 'Egresos por Categoria',
                subtitle: '',
              },
            }}
          />
        </Paper>
        <Paper container elevation={3} className={classes.graficoSP}>
          <Chart
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["Categoria", "Monto"],
              ...nombresCategorias.map((nc, i) => {
                return [nc, totales[i]]
              })
            ]}
            options={{
              chart: {
                title: 'Egresos por Categoria',
                subtitle: '',
              },
              pieHole: 0.2,
            }}
          />
        </Paper>
      </div>
    )
  }
};

Inicio.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inicio);
