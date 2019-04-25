import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { withStyles } from '@material-ui/core/styles';

import InicioContainer from '../containers/InicioContainer'

import SignInPage from '../pages/SignInPage'
import JoinPage from '../pages/JoinPage'

import NotFoundPage from '../pages/NotFoundPage';

import CssBaseline from '@material-ui/core/CssBaseline';

import AppBarCustom from '../components/AppBarCustom';
import AppMenuCustom from '../components/AppMenuCustom';
import RangoFechas from '../components/RangoFechas';

import CuentaContainer from '../containers/CuentaContainer';
import CuentasContainer from '../containers/CuentasContainer';

import EgresoContainer from '../containers/EgresoContainer';
import IngresoContainer from '../containers/IngresoContainer';
import EgresosContainer from '../containers/EgresosContainer';
import IngresosContainer from '../containers/IngresosContainer';
import BalanceContainer from '../containers/BalanceContainer';
import GananciasContainer from '../containers/GananciasContainer';
import SeguimientosContainer from '../containers/SeguimientosContainer';

const drawerWidth = 240;
const pageHeight = window.innerHeight;


const styles = theme => ({
  root: {
    display: 'flex',
  },
  rootApp: {
    minWidth: '100%',
    minHeight: '100%',
//    background: '#00000096',
//    background: '#ffffff9c',
    paddingTop: 64
  },
  transition:{
    transition: 'all 200ms ease-out',
    opacity: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    display: 'flex',
    ['-webkit-flex-direction']: 'column'
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.secondary.main,
  },
  divider: {
    backgroundColor: '#ffffff1f',
  },
  listaMedia: {
    backgroundColor: theme.palette.secondary.dark,
    position: 'relative',
    display: 'block',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  listItemText:{
    color: theme.palette.secondary.contrastText,
  },
  listaFooter:{
    flex: '0 0 auto'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 6,
    height: window.innerHeight - 64,
    marginTop: 64,
    paddingTop: 0,
    overflowY: 'auto'
  },
});


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
      openMenu: false,
      openRangoFechas: false,
//      heightSchroleable: pageHeight - 64,
      heightSchroleable: pageHeight,
      cuentaSeleccionada: undefined,
      titulo: "Controla tu Economía",
      desde: (new Date(((new Date()).setDate(1)))),
      hasta: (new Date((new Date(
        (new Date()).setMonth(
        (new Date()).getMonth()+1)
        )).setDate(0)))
      
    };
    
    this.seleccionarCuenta = this.seleccionarCuenta.bind(this);
    this.cambiarTitulo = this.cambiarTitulo.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleMenu = this.handleMenu.bind(this)
    this.handleRangoFechas = this.handleRangoFechas.bind(this)
    
/*
    this.logout = this.logout.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  */
  }

  handleMenu() {
    this.setState({
      openMenu: !this.state.openMenu
    })
  }
  handleRangoFechas() {
    this.setState({
      openRangoFechas: !this.state.openRangoFechas
    })
  }


  handleDateChange(name, date){
      this.setState({ [name]: date });
  };


  static getDerivedStateFromProps(props, state){
    const {
      loading,
      cuentasExists,
      cuentas,
      loggued
    } = props;
    const {
      cuentaSeleccionada
    } = state;

    if (!loading && cuentasExists && !!loggued) {
      if (!!!cuentaSeleccionada || (!!cuentaSeleccionada && cuentas.map((c)=> {return c._id}).indexOf(cuentaSeleccionada._id) == -1) ) {
        console.log("cuentas");
        console.log(cuentas);
        return {
          cuentaSeleccionada: cuentas[0]
        }
      } else {
        return null
      }
    } else {
      return null
    }
  }
  

  seleccionarCuenta(cuentaSeleccionada) {
    this.setState({cuentaSeleccionada});
  }

  cambiarTitulo(titulo) {
    if(this.state.titulo != titulo)
      this.setState({titulo});
  }
/*
  logout() {
    Meteor.logout();
  }

  toggleDrawer(open) {
    this.setState({
      openMenu: open
    });
  };

*/

  renderOfflinePages(){
    const {
      cuentasExists
    } = this.props
    return [
      <Route
        exact
        path="/"
        render={() => <InicioContainer cambiarTitulo={this.cambiarTitulo} cuentasExists={cuentasExists}/>}
      />,
      <Route
        exact
        path="/signin"
        render={() => <SignInPage cambiarTitulo={this.cambiarTitulo} />}
      />,
      <Route
        exact
        path="/join"
        render={() => <JoinPage cambiarTitulo={this.cambiarTitulo} />}
      />,
    ]
  }

  renderOnlinePages(){
    const { loggued, cuentas } = this.props;
    const { cuentaSeleccionada, desde, hasta } = this.state;
    const cambiarTitulo = this.cambiarTitulo
    const pase = {
      cambiarTitulo,
      cuentaSeleccionada
    }
    const fechas = {
      desde,
      hasta
    }

    if (!!loggued) {
      if (!!cuentaSeleccionada) {
        return [
          <Route
            exact
            path="/movimientos/egresos"
            render={() => <EgresosContainer {...pase} {...fechas} />}
          />,
          <Route
            exact
            path="/movimientos/egresos/:id"
            render={({match}) => <EgresoContainer match={match} {...pase} />}
          />,
          <Route
            exact
            path="/movimientos/ingresos"
            render={() => <IngresosContainer {...pase} {...fechas} />}
          />,
          <Route
            exact
            path="/movimientos/ingresos/:id"
            render={({match}) => <IngresoContainer match={match} {...pase} />}
          />,
          <Route
            exact
            path="/movimientos/seguimientos"
            render={() => <SeguimientosContainer {...pase} {...fechas} />}
          />,
          <Route
            exact
            path="/movimientos/balance"
            render={() => <BalanceContainer {...pase} {...fechas} />}
          />,
          <Route
            exact
            path="/movimientos/ganancias"
            render={() => <GananciasContainer {...pase} {...fechas} />}
          />,
          <Route
            exact
            path="/cuentas/"
            render={() => <CuentasContainer cuentas={cuentas} seleccionarCuenta={this.seleccionarCuenta} {...pase} />}
          />,
          <Route
            exact
            path="/cuentas/:id"
            render={({match}) => <CuentaContainer match={match} {...pase} />}
          />,
        ]
      } else {
        return [
          <Route
            path="/movimientos/*"
            render={({match}) => <CuentasContainer {...pase} cuentas={cuentas} seleccionarCuenta={this.seleccionarCuenta}/>}
          />,
          <Route
            exact
            path="/cuentas/"
            render={() => <CuentasContainer {...pase} cuentas={cuentas} seleccionarCuenta={this.seleccionarCuenta}/>}
          />,
          <Route
            exact
            path="/cuentas/:id"
            render={({match}) => <CuentaContainer cambiarTitulo={this.cambiarTitulo} match={match} />}
          />,
        ]
      }
    } else {
      return [
        <Route
          path="/movimientos/*"
          render={() => <SignInPage cambiarTitulo={this.cambiarTitulo} />}
        />,
        <Route
          path="/cuentas/*"
          render={() => <SignInPage cambiarTitulo={this.cambiarTitulo} />}
        />,
      ]
    }
    
  }

  renderNotFoundPage(){
    return (
      <Route
        path="/*"
        render={() => <NotFoundPage cambiarTitulo={this.cambiarTitulo} />}
      />
    )
  }

  renderContent(location) {
    const {
      classes,
      user,
      connected,
      loading,
    } = this.props;
    const {
      showConnectionIssue,
      openMenu,
      openRangoFechas,
      heightSchroleable,
      titulo,
      desde,
      hasta
    } = this.state


    return (
      <div className={classes.rootApp}>
        <AppBarCustom titulo={titulo} handleMenu={this.handleMenu} handleRangoFechas={this.handleRangoFechas} />
        <AppMenuCustom open={openMenu} handleMenu={this.handleMenu} />
        <RangoFechas
          open={openRangoFechas}
          handleRangoFechas={this.handleRangoFechas}
          desde={desde}
          hasta={hasta}
          handleDateChange={this.handleDateChange}
        />
{/*
        <HeaderApp />
        <TopBar toggleDrawer={this.toggleDrawer} drawerOpen={drawerOpen} user={user} logout={this.logout}/>
        <Menu toggleDrawer={this.toggleDrawer} drawerOpen={drawerOpen}/>
        <ConnectionNotification mensaje={"Hay problemas en la coneccion"} open={showConnectionIssue && !connected}/>
*/} 
        <div className={classes.schroleable} id="content">
          <Switch location={location} >
            {this.renderOfflinePages()}
            {this.renderOnlinePages()}
            {this.renderNotFoundPage()}
          </Switch>
        </div>
      </div>
    );
  }


  render() {
    const {
      classes,
    } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <BrowserRouter>
          <Route
            render={({ location }) => (
              this.renderContent(location)
            )}
          />
        </BrowserRouter>
      </div>
    );
  }
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);