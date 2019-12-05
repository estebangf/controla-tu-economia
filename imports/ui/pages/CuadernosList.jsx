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
    paddingTop: 12
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
  mensajeTitulo: {
    textAlign: 'center',
    padding: 16
  },
  mensajeTexto: {
    padding: 16
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
    const { classes, cuadernosExists } = this.props;

    return (
      <div className={classes.root}>
        {
          cuadernosExists ? 
            (<List className={classes.root}>
              {this.renderCuadernos()}
            </List>)
          :
            (<div className={classes.root}>
              <Typography variant="h6" className={classes.mensajeTitulo}>
                NO HAY CUADERNOS CREADOS
              </Typography>
              <Typography variant="body1" className={classes.mensajeTexto}>
                Un cuaderno es donde iran todos los ingresos y egresos de una divicion especifica.
              </Typography>
              <Typography variant="body2" className={classes.mensajeTexto}>
                Ejemplo 1: Puede hacer un cuaderno para movimientos en efectivo y uno para movimientos
                con tarjeta de debito.
              </Typography>
              <Typography variant="body2" className={classes.mensajeTexto}>
                Ejemplo 2: Puede hacer un cuaderno para los movimientos del dinero de su sueldo y otro para los movimientos del dinero de sus emprendimientos.
              </Typography>
            </div>)
        }
        
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