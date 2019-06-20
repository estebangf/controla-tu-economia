import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, List, Typography } from '@material-ui/core';
import ListItemCuaderno from '../components/ListItemCuaderno';

const drawerWidth = 240;

const styles = theme => ({
  root: {
  },
});


class CuadernosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
      drawerOpen: false
    };
  }
  
  renderCuadernos() {
    const { cuadernos, cuadernoSeleccionada, seleccionarCuaderno } = this.props;
    
    return cuadernos.map(cuaderno => {
      return (
        <ListItemCuaderno cuaderno={cuaderno} seleccionada={cuaderno._id == cuadernoSeleccionada._id} seleccionarCuaderno={seleccionarCuaderno} />
      )
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List className={classes.root}>
          {this.renderCuadernos()}
        </List>
        
        <Link className={classes.link} to={'/cuadernos/nueva'}>
          Nuevo Cuaderno
        </Link>
      </div>
    )
  }
};

CuadernosList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CuadernosList);