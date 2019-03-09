import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { withStyles } from '@material-ui/core/styles';

import Inicio from '../pages/Inicio'

import SignInPage from '../pages/SignInPage'
import JoinPage from '../pages/JoinPage'

import NotFoundPage from '../pages/NotFoundPage';

import CssBaseline from '@material-ui/core/CssBaseline';

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
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
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
      cuentaSeleccionada: undefined
    };
    
    this.seleccionarCuenta = this.seleccionarCuenta.bind(this);
/*
    this.logout = this.logout.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
*/
  }

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
  
  componentDidMount(){
    const self = this;
    function resize(){
      self.setState({heightSchroleable: window.innerHeight})
      console.log(self.state.heightSchroleable);
    }

    window.onresize = resize;
  }

  seleccionarCuenta(cuentaSeleccionada) {
    this.setState({cuentaSeleccionada});
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
        render={() => <Inicio cuentasExists={cuentasExists}/>}
      />,
      <Route
        exact
        path="/signin"
        render={() => <SignInPage />}
      />,
      <Route
        exact
        path="/join"
        render={() => <JoinPage />}
      />,
    ]
  }

  renderOnlinePages(){
    const { loggued, cuentas } = this.props;
    const { cuentaSeleccionada } = this.state;

    if (!!loggued) {
      if (!!cuentaSeleccionada) {
        return [
          <Route
            exact
            path="/movimientos/gastos"
            render={() => <GastosContainer cuentaSeleccionada={cuentaSeleccionada} />}
          />,
          <Route
            exact
            path="/movimientos/gastos/:id"
            render={({match}) => <GastoContainer cuentaSeleccionada={cuentaSeleccionada} match={match} />}
          />,
          <Route
            exact
            path="/movimientos/ingresos"
            render={() => <IngresosContainer cuentaSeleccionada={cuentaSeleccionada} />}
          />,
          <Route
            exact
            path="/movimientos/ingresos/:id"
            render={({match}) => <IngresoContainer cuentaSeleccionada={cuentaSeleccionada} match={match} />}
          />,
          <Route
            exact
            path="/movimientos/seguimientos"
            render={() => <SeguimientosContainer cuentaSeleccionada={cuentaSeleccionada} />}
          />,
          <Route
            exact
            path="/movimientos/balance"
            render={() => <BalanceContainer cuentaSeleccionada={cuentaSeleccionada} />}
          />,
          <Route
            exact
            path="/movimientos/ganancias"
            render={() => <GananciasContainer cuentaSeleccionada={cuentaSeleccionada} />}
          />,
          <Route
            exact
            path="/cuentas/"
            render={() => <CuentasContainer cuentaSeleccionada={cuentaSeleccionada} cuentas={cuentas} seleccionarCuenta={this.seleccionarCuenta}/>}
          />,
          <Route
            exact
            path="/cuentas/:id"
            render={({match}) => <CuentaContainer match={match} />}
          />,
        ]
      } else {
        return [
          <Route
            path="/movimientos/*"
            render={({match}) => <CuentasContainer cuentaSeleccionada={cuentaSeleccionada} cuentas={cuentas} seleccionarCuenta={this.seleccionarCuenta}/>}
          />,
          <Route
            exact
            path="/cuentas/"
            render={() => <CuentasContainer cuentaSeleccionada={cuentaSeleccionada} cuentas={cuentas} seleccionarCuenta={this.seleccionarCuenta}/>}
          />,
          <Route
            exact
            path="/cuentas/:id"
            render={({match}) => <CuentaContainer match={match} />}
          />,
        ]
      }
    } else {
      return [
        <Route
          path="/movimientos/*"
          render={() => <SignInPage />}
        />,
        <Route
          path="/cuentas/*"
          render={() => <SignInPage />}
        />,
      ]
    }
    
  }

  renderNotFoundPage(){
    return (
      <Route
        path="/*"
        render={() => <NotFoundPage />}
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
      heightSchroleable
    } = this.state;

    return (
      <div className={classes.rootApp}>
{/*
        <AppMenuCustom />
        <AppBarCustom />
        <HeaderApp />
        <TopBar toggleDrawer={this.toggleDrawer} drawerOpen={drawerOpen} user={user} logout={this.logout}/>
        <Menu toggleDrawer={this.toggleDrawer} drawerOpen={drawerOpen}/>
        <ConnectionNotification mensaje={"Hay problemas en la coneccion"} open={showConnectionIssue && !connected}/>
*/} 
        <div className={classes.transition}>
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              classNames="fade"
              timeout={100}
            >
              <div className={classes.schroleable} style={{height: heightSchroleable}} id="content">
                <Switch location={location} >
                  {this.renderOfflinePages()}
                  {this.renderOnlinePages()}
                  {this.renderNotFoundPage()}
                </Switch>
              </div>
            </CSSTransition>
          </TransitionGroup>
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