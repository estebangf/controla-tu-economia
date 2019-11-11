import React, { Component } from 'react';
import PropTypes from 'prop-types';
const LinkGo = require('react-router-dom').Link

import Typography from '@material-ui/core/Typography';
import { Link, withStyles, Paper } from '@material-ui/core';

const styles = () => ({
  root: {
    paddingTop: 16,
//    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundImage: 'url("/imagens/perdido.jpg")',
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  iframeDiv: {
    width: "calc(100% - 20px)",
    padding: 0,
    margin: 10,
    height: '100%',
    background: "#fff"
  },
  iframe: {
    width: '100%',
    border: 0,
    height: 200,
  }
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
        <Paper className={classes.iframeDiv}>
          <iframe src="https://www.dinogame.net/game/" className={classes.iframe}></iframe>
        </Paper>
      </div>
    );
  }
}

NotFoundPage.propTypes = {
  
};

export default withStyles(styles)(NotFoundPage);
