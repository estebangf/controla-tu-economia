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

import Fechas from '../components/Fechas';
import AppBarCustom from '../components/AppBarCustom';

import CuentaContainer from '../containers/CuentaContainer';
import CuentasContainer from '../containers/CuentasContainer';

import GastoContainer from '../containers/GastoContainer';
import IngresoContainer from '../containers/IngresoContainer';
import GastosContainer from '../containers/GastosContainer';
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
  schroleable:{
    minHeight: '100%',
//    position: 'absolute',
//    top: 64,
//    paddingTop: 64,
//document.getElementById("top-bar").offsetHeight
//    left: 0,
//    right: 0,
//    bottom: 0,
//    transform: 'translate3d(0, 0, 0)',
//    marginLeft: 240,
//    marginTop: 64,
    overflowY: 'auto',
    overflowX: 'hidden'
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
      drawerOpen: false,
//      heightSchroleable: pageHeight - 64,
      heightSchroleable: pageHeight,
      cuentaSeleccionada: undefined,
      titulo: "Controla tu Economía",
      desde: (new Date(((new Date()).setDate(1)))),
      hasta: (new Date())
    };
    
    this.seleccionarCuenta = this.seleccionarCuenta.bind(this);
    this.cambiarTitulo = this.cambiarTitulo.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this)
/*
    this.logout = this.logout.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
*/
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
      drawerOpen: open
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
            path="/movimientos/gastos"
            render={() => <GastosContainer {...pase} {...fechas} />}
          />,
          <Route
            exact
            path="/movimientos/gastos/:id"
            render={({match}) => <GastoContainer match={match} {...pase} />}
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
      drawerOpen,
      heightSchroleable,
      titulo,
      desde,
      hasta
    } = this.state


    return (
      <div className={classes.rootApp}>
        <AppBarCustom titulo={titulo} />
{/*
        <AppMenuCustom />
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
        <Fechas
          id={'desde'}
          fecha={desde}
          adornmentPosition="end"
          autoOk={true}
          keyboard={true}
          disableFuture={true}
          variant="outlined"
          label="Desde"
          maxDate={new Date()}
          maxDateMessage={"Fecha mayor a hoy"}
          invalidDateMessage={"Ej: 01/01/2019"}
          handleDateChange={this.handleDateChange}
          inputRoot={classes.inputFechaRoot}
        />
        <Fechas
          id={'hasta'}
          fecha={hasta}
          adornmentPosition="end"
          autoOk={true}
          keyboard={true}
          disableFuture={true}
          variant="outlined"
          label="Hasta"
          maxDate={new Date()}
          maxDateMessage={"Fecha mayor a hoy"}
          invalidDateMessage={"Ej: 01/01/2019"}
          handleDateChange={this.handleDateChange}
          inputRoot={classes.inputFechaRoot}
        />
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