import React, { Component } from 'react';
import PropTypes from 'prop-types';
 
import { AppBar, Toolbar, Typography, withStyles} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DateRange from '@material-ui/icons/DateRange';

const PAGINAS_CON_FILTRO = [
  "/movimientos/ingresos",
  "/movimientos/egresos",
  "/movimientos/transferencias",
  "/movimientos/balance",
  "/movimientos/seguimientos",
  "/movimientos/ganancias",
]
const PAGINAS_CON_ATRAS = [
  "/cuadernos/",
  "/cuadernos/nuevo",
  "/movimientos/ingresos/",
  "/movimientos/ingresos/nuevo",
  "/movimientos/egresos/",
  "/movimientos/egresos/nuevo",
  "/movimientos/transferencias/",
  "/movimientos/transferencias/nueva",
]
const PAGINAS_CON_MENU = [
  "/",
  "/cuadernos",
  "/movimientos/ingresos",
  "/movimientos/egresos",
  "/movimientos/transferencias",
  "/movimientos/balance",
  "/movimientos/seguimientos",
  "/movimientos/ganancias",
]
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    [theme.breakpoints.up('lg')]: {
      margin: 200,
      width: 'calc(100% - 400px)',
      marginTop: 51
    },
    top: -1,
    background: theme.palette.appBar.backgroundColor,
    transition: 'box-shadow .1s ease',
    boxShadow: "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)",
  },
  appBarModerna: {
/*
    [theme.breakpoints.down('md')]: {
      backgroundImage: "url(/fondo_o.png)",
//      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPositionX: "center",
      backgroundPositionY: "top",
    }
  */
  },
  schrolled: {
    boxShadow: 'none',
    [theme.breakpoints.up('lg')]: {
      boxShadow: "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)"
    },
  },
  titulo: {
    color: theme.palette.appBar.color,
    flexGrow: 1,
    position: 'absolute',
    textAlign: 'center',
    width: "calc(100% - 100px)",
    margin: "auto 50px",
    left: 0,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 15,
    color: theme.palette.appBar.color,
  },
  iconoDerecha: {
    color: theme.palette.appBar.color,
    position: "absolute",
    right: 0,
  },
  iconoLogo: {
    right: 10,
    maxHeight: 25
  }
});

class AppBarCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schrolled: false
    };
  }

  componentDidMount(){
    const self = this;
    function schrolled(){
      if(window.scrollY > 32) {
        if(!self.state.schrolled) {
          self.setState({schrolled: true})
        }
      } else {
        if(self.state.schrolled) {
          self.setState({schrolled: false})
        }
      }
    }

    window.onscroll = schrolled;
  }


  render() {
    const { classes, titulo, handleMenu, handleRangoFechas, cuaderno } = this.props;
    const { schrolled } = this.state;

/*
    const verAtras = PAGINAS_CON_ATRAS.includes(location.pathname)
*/
    const verAtras = !!PAGINAS_CON_ATRAS.filter(p => {
      return location.pathname.includes(p)
    }).length
    const verFiltro = PAGINAS_CON_FILTRO.includes(location.pathname)
    const verMenu = PAGINAS_CON_MENU.includes(location.pathname)
    const verLogo = location.pathname == "/"

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={[classes.appBar, !schrolled ? classes.schrolled : '', window.location.pathname == "/" ? classes.appBarModerna : ''].join(' ')}>
          <Toolbar>
            { verAtras ? 
              <IconButton onClick={() => {history.go(-1)}} className={classes.menuButton} aria-label="Menu">
                <ArrowBackIcon />
              </IconButton>
            :
              verMenu ? 
              <IconButton onClick={handleMenu} className={classes.menuButton} aria-label="Menu">
                <MenuIcon />
              </IconButton>
              : ''
            }
            <Typography variant="h6" noWrap className={classes.titulo}>
              {titulo}{verFiltro && !!cuaderno ? " - "+cuaderno : ''}
            </Typography>
            {!!verFiltro && (
              <IconButton onClick={handleRangoFechas} className={classes.iconoDerecha} aria-label="Fechas">
                <DateRange />
              </IconButton>
            )}
            {!!verLogo && (
              <IconButton className={classes.iconoDerecha}>
                <img className={classes.iconoLogo} src="/miniLogo.png" />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

AppBarCustom.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBarCustom);
