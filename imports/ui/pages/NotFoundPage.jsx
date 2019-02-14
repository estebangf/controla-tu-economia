import React, { Component } from 'react';
import PropTypes from 'prop-types';
const LinkGo = require('react-router-dom').Link

import Typography from '@material-ui/core/Typography';
import { Link, withStyles } from '@material-ui/core';

const styles = () => ({
  root: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundImage: 'url("/imagens/perdido.jpg")',
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
});

class NotFoundPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div>
          <Typography variant="h2">Pagina no encontrada</Typography>
          <LinkGo to={'/'}>
            <Link>Volver al Inicio</Link>
          </LinkGo>
          {" - "}
          <Link onClick={() => {window.history.back()}}>
            Volver a Atras
          </Link>
        </div>
      </div>
    );
  }
}

NotFoundPage.propTypes = {
  
};

export default withStyles(styles)(NotFoundPage);
