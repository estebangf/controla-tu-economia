import React, { Component } from 'react';
import PropTypes from 'prop-types';
 
import { AppBar, Toolbar, Typography, withStyles} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DateRange from '@material-ui/icons/DateRange';

const PAGINAS_CON_FILTRO = [
  "/movimientos/ingresos",
  "/movimientos/ingresos/nuevo",
  "/movimientos/egresos",
  "/movimientos/egresos/nuevo",
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
    boxShadow: "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)"
  },
  schrolled: {
    boxShadow: 'none',
    [theme.breakpoints.up('lg')]: {
      boxShadow: "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)"
    },
  },
  titulo: {
    color: "#000",
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 15,
  },
  botonFechas: {
    position: "absolute",
    right: 0
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
    const verFiltro = !!PAGINAS_CON_FILTRO.filter(p => {
      return location.pathname.includes(p)
    })[0]
*/
    const verFiltro = PAGINAS_CON_FILTRO.includes(location.pathname)
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={[classes.appBar, !schrolled ? classes.schrolled : ''].join(' ')}>
          <Toolbar>
            <IconButton onClick={handleMenu} className={classes.menuButton} color="primary" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="primary" noWrap className={classes.titulo}>
              {titulo}{verFiltro && !!cuaderno ? " - "+cuaderno : ''}
            </Typography>
            {!!verFiltro && (
              <IconButton onClick={handleRangoFechas} className={classes.botonFechas} color="primary" aria-label="Fechas">
                <DateRange />
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
