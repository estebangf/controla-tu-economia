import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, List, Typography, Grid, Paper, Button } from '@material-ui/core';
import ListItemCuaderno from '../components/ListItemCuaderno';

import Calculadora from '../components/Calculadora.jsx'

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


const styles = theme => ({
  root: {
    flexGrow: 1,
    // paddingTop: 16,
    margin: 20,
    textAlign: 'center'
  },
  paper: {
    margin: 'auto',
    paddingTop: 25,
    maxWidth: 64*4,
  },
});


class CalculadoraPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper elevation={10} className={classes.paper}>
          <Calculadora />
        </Paper>
      </div>
    )
  }
};

CalculadoraPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CalculadoraPage);