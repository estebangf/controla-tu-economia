import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, List, Typography } from '@material-ui/core';
import ListItemCuaderno from '../components/ListItemCuaderno';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const drawerWidth = 240;

const styles = theme => ({
  root: {
  },
  fab: {
    margin: theme.spacing.unit,
    background: "#FFF",
    position: 'fixed',
    bottom: theme.spacing.unit * 1,
    right: theme.spacing.unit * 1,
    [theme.breakpoints.up('lg')]: {
      bottom: theme.spacing.unit * 1 + 50,
      right: theme.spacing.unit * 1 + 210,
    },
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
          <Fab
            className={classes.fab}
            onClick={this.handleClick}>
            <AddIcon />
          </Fab>
        </Link>
      </div>
    )
  }
};

CuadernosList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CuadernosList);