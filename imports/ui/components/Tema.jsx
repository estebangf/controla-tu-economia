import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, List, Typography, Grid, Paper, Button } from '@material-ui/core';
import ListItemCuaderno from '../components/ListItemCuaderno';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({

});

class Tema extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  cambiarTema = (tema) => {
    const self = this
    Meteor.call("perfil.cambiar.tema",
      tema,
      (error, result) => {
        if (error){
          self.handleAlerta(error.toString(), "error")
        } else {
          self.handleAlerta("Tema cambiado", "success")
        }
      }
    )
  }


  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button fullWidth onClick={() => this.cambiarTema("normal")}>Normal</Button>
        <Button fullWidth onClick={() => this.cambiarTema("oscuro")}>Oscuro</Button>
      </div>
    )
  }
};

Tema.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tema);