import React, { Component } from 'react';
import PropTypes from 'prop-types';
const LinkGo = require('react-router-dom').Link

import Typography from '@material-ui/core/Typography';
import { Link, withStyles, Paper } from '@material-ui/core';

import Tema from '../components/Tema'

const styles = () => ({
  root: {
    paddingTop: 16,
//    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  iframeDiv: {
    width: "calc(100% - 20px)",
    padding: 0,
    margin: 10,
    height: '100%',
  },
  iframe: {
    width: '100%',
    border: 0,
    height: 200,
  }
});

class Perfil extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div>
          <Typography variant="h2">Perfil</Typography>
          <LinkGo to={'/'}>
            <Link>Volver al Inicio</Link>
          </LinkGo>
          {" - "}
          <Link onClick={() => {window.history.back()}}>
            Volver a Atras
          </Link>
        </div>
        <div className={classes.iframeDiv}>
          <Tema handleAlerta={this.props.handleAlerta} />
        </div>
      </div>
    );
  }
}

Perfil.propTypes = {
  
};

export default withStyles(styles)(Perfil);
