import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { withStyles, MenuItem, Typography, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, ListItem, Menu, LinearProgress } from '@material-ui/core';

import { amber, green, red } from '@material-ui/core/colors';

import HelpIcon from '@material-ui/icons/Help';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const drawerWidth = 240;

//#abeaae
const colores = {
  success: {
    p: green[100],
    b: green[600]
  },
  error: {
    p: red[100],
    b: red[700]
  },
  warning:  {
    p: amber[100],
    b: amber[700]
  },
}

const styles = theme => ({
  link: {
    color: "#4d4d4d",
    textDecoration: 'none',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      'text-decoration': 'none',
      color: "#4d4d4d"
    },
  },
  linkDefault: {
    color: "#4d4d4d",
    textDecoration: 'none',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      'text-decoration': 'none',
      color: "#4d4d4d"
    },
  },
  nombre: {

  },
  periodo: {
    float: "right"
  },
  estado: {
    minWidth: '100%',
    textAlign: 'center'
  },
  estadoTexto: {
    paddingTop: 8
  },
});

class ListItemPresupuesto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: undefined,
      menuVisible: false
    };
  }

  handleClick = event => {
    event.preventDefault();
    this.setState({anchorEl: event.currentTarget});
  }
  handleClose(component) {
    component.setState({anchorEl: null});
  }

  editar = (presupuesto) => {
    this.handleClose(this)
  }
  eliminar = (presupuesto) => {
    var id = presupuesto._id
    Meteor.call('presupuesto.eliminar',
      id,
      (error, result) => {
        if (error){
          console.log(error);
        } else {
          console.log(result)
        }
      }
    )
    this.handleClose(this)
  }

  render() {
    const {
      classes,
      presupuesto,
      sumaGastos
    } = this.props;
    const {
      anchorEl
    } = this.state;

//    const sumaGastos = Math.random() * 5000

    const opciones = {
      desde: {
        corta: {year: 'numeric', month: 'numeric', day: 'numeric' },
        larga: {year: 'numeric', month: 'long', day: 'numeric' }
      },
      tiempo: {
        corto: { hour: 'numeric', minute: 'numeric'},
        corto12: { hour: 'numeric', minute: 'numeric', hour12: true}
      },
      desdeTiempo: {
        corta: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },
        corta12: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true },
      }
    }
    var secondary = ""
    secondary += !!presupuesto.categoriaNombre ? presupuesto.categoriaNombre : ''
    secondary += ' - '
    secondary += !!presupuesto.descripcion ? presupuesto.descripcion : ''

    const porsentajeGastado = sumaGastos * 100 / presupuesto.importe;
    const porsentajeDias = (new Date() - presupuesto.desde) * 100 / (presupuesto.hasta - presupuesto.desde);

    const ColorLinearProgressImporte = withStyles({
      colorPrimary: {
        backgroundColor: porsentajeGastado < 60 ? colores.success.p : porsentajeGastado < 90 ? colores.warning.p : colores.error.p,
      },
      barColorPrimary: {
        backgroundColor: porsentajeGastado < 60 ? colores.success.b : porsentajeGastado < 90 ? colores.warning.b : colores.error.b,
      },
    })(LinearProgress);
    
    const ColorLinearProgressDias = withStyles({
      colorPrimary: {
        backgroundColor: porsentajeDias < 60 ? colores.success.p : porsentajeDias < 90 ? colores.warning.p : colores.error.p,
      },
      barColorPrimary: {
        backgroundColor: porsentajeDias < 60 ? colores.success.b : porsentajeDias < 90 ? colores.warning.b : colores.error.b,
      },
    })(LinearProgress);
    
    return (
      <div>
        <Link onContextMenu={this.handleClick} to={
            "/presupuestos/"+presupuesto._id
            } className={classes.link}>
          <ListItem
            button
          >
            <ListItemText
              primaryTypographyProps={{
                className: classes["font"]
              }}
              secondaryTypographyProps={{
                className: classes["font"]
              }}
              primary={
                <div>
                  <Typography className={classes.periodo}>
                    {presupuesto.desde.toLocaleDateString("es-ES", opciones.desde.corta)} al {presupuesto.hasta.toLocaleDateString("es-ES", opciones.desde.corta)}
                  </Typography>
                  <Typography className={classes.nombre}>
                    {presupuesto.nombre}
                  </Typography>
                </div>
              }
              secondary={
                <div className={classes.estado}>
                  <Typography className={classes.estadoTexto}>
                    Dinero restante: ${(presupuesto.importe - sumaGastos).toFixed(2)}
                  </Typography>
                  <ColorLinearProgressImporte
                   variant="determinate" value={porsentajeGastado} />
                  <Typography className={classes.estadoTexto}>
                    Dias restantes: {((presupuesto.hasta - new Date())/1000/60/60/24).toFixed(0)} de {(presupuesto.hasta - presupuesto.desde)/1000/60/60/24}
                  </Typography>
                  <ColorLinearProgressDias
                  variant="determinate" value={porsentajeDias} />
                  <Typography className={classes.estadoTexto}>
                    Se recomienda ${((presupuesto.importe - sumaGastos)/((presupuesto.hasta - new Date())/1000/60/60/24)).toFixed(0)} por dia.
                  </Typography>
                </div>
              }
            />
          </ListItem>
        </Link>
        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => this.handleClose(this)}>
          <MenuItem
            key={"option"}
            disabled={true}
            onClick={() => this.handleClose(this)}
          >{presupuesto.nombre + ' x ' + presupuesto.importe.toFixed(2)}</MenuItem>
          <Link to={
            "/presupuestos/"+presupuesto._id
          } className={classes.link}>
            <MenuItem onClick={() => this.editar(presupuesto)}>Editar</MenuItem>
          </Link>
          <MenuItem onClick={() => this.eliminar(presupuesto)}>Eliminar</MenuItem>
        </Menu>
      </div>
    );
  }
}

ListItemPresupuesto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItemPresupuesto);
