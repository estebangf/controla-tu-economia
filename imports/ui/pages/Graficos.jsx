import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';

import { Paper } from '@material-ui/core';

import Chart from 'react-google-charts';
import { Categorias } from '/imports/api/categorias/categorias';

const styles = theme => ({
  root: {
    // padding: 15,
    textAlign: 'center',
    // bottom: 0,
    // position: "absolute",
    width: "100%"
  },
  grafico: {
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
    const { classes, cuadernoSeleccionada } = this.props;
    const user = Meteor.user();

    Meteor.subscribe('categorias');
    const categorias = Categorias.find({}).fetch();
    

    const nombresCategorias = categorias.map((c, index) => {
      if(index<5){
        return c.nombre
      }
    })

    
    const totales = []
    for (let index = 0; index < nombresCategorias.length; index++) {
      totales.push( Math.floor((Math.random(1,100)*10000).toFixed(0)) )
    }


    return (
      <div className={classes.root}>
        <Paper container className={classes.grafico}>
          <Chart
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
      </div>
    )
  }
};

Inicio.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inicio);
