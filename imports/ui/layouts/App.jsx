import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, red, orange, green, teal, indigo, grey, deepOrange, lightBlue } from '@material-ui/core/colors';

import Tema from '../components/Tema'

import InicioContainer from '../containers/InicioContainer'

import SignInPage from '../pages/SignInPage'
import JoinPage from '../pages/JoinPage'

import NotFoundPage from '../pages/NotFoundPage';

import CssBaseline from '@material-ui/core/CssBaseline';

import Alerta from '../components/Alerta';
import AppBarCustom from '../components/AppBarCustom';
import AppMenuCustom from '../components/AppMenuCustom';
import RangoFechas from '../components/RangoFechas';

import CalculadoraContainer from '../containers/CalculadoraContainer';

import CuadernoContainer from '../containers/CuadernoContainer';
import CuadernosContainer from '../containers/CuadernosContainer';
import CategoriasContainer from '../containers/CategoriasContainer';
import EgresoContainer from '../containers/EgresoContainer';
import IngresoContainer from '../containers/IngresoContainer';
import TransferenciaContainer from '../containers/TransferenciaContainer';
import TransferenciasContainer from '../containers/TransferenciasContainer';
import EgresosContainer from '../containers/EgresosContainer';
import IngresosContainer from '../containers/IngresosContainer';
import BalanceContainer from '../containers/BalanceContainer';
import GananciasContainer from '../containers/GananciasContainer';
import SeguimientosContainer from '../containers/SeguimientosContainer';
import PresupuestoContainer from '../containers/PresupuestoContainer';
import PresupuestosContainer from '../containers/PresupuestosContainer';
import { Dialog, Button, DialogContent, DialogTitle } from '@material-ui/core';
import Calculadora from '../components/Calculadora';
import GraficosContainer from '../containers/GraficosContainer';
import { Meteor } from 'meteor/meteor';
import Perfil from '../pages/Perfil';

const drawerWidth = 240;
const pageHeight = window.innerHeight;


//////////////////////////////////////////




const themeNormal = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red,
    appBar:{
      backgroundColor: "#337dbf",
      color: "#FFF"
    },
    cuadernos:{

    },
    saldo:{
      negativo:{
        color: red[300]
      },
      positivo:{
        color: blue[300]
      },
      peligroso: {
        color: orange[300]
      }
    },
    egresos: {
      buttonText: '#FFF',
      backgroundColor: red[300],
      buttonHover: red[700],
    },
    ingresos: {
      buttonText: '#FFF',
      backgroundColor: blue[300],
      buttonHover: blue[700],
    },
    seguimientos: {
      buttonText: '#FFF',
      backgroundColor: orange[300],
      buttonHover: orange[700],
    },
    balance: {
      buttonText: '#FFF',
      backgroundColor: green[300],
      buttonHover: green[700],
    },
    ganancias: {
      buttonText: '#FFF',
      backgroundColor: teal[300],
      buttonHover: teal[700],
    },
    fondoCombinado: "#1263ab",
    fondoIntermedio: blue[900],
    fondo: grey[50],
    fondoGraficos: grey[50],
    colorTexto: grey[900],
    text: {
      primary: grey[900],
      disabled: grey[900],
      hint: grey[900],
      secondary: grey[800],
    },
    background: {
      paper: grey[50],
      default: grey[50],
      level2: "#f5f5f5",
      level1: "#fff",
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    useNextVariants: true,
    fontSize: 12,
  },
});

const themeDark = createMuiTheme({
  palette: {
    primary: grey,
    secondary: deepOrange,
    appBar:{
      backgroundColor: grey[900],
      color: grey[300]
    },
    cuadernos:{

    },
    saldo:{
      negativo:{
        color: red[300]
      },
      positivo:{
        color: blue[300]
      },
      peligroso: {
        color: orange[300]
      }
    },
    egresos: {
      buttonText: grey[300],
      backgroundColor: red[300],
      buttonHover: red[700],
    },
    ingresos: {
      buttonText: grey[300],
      backgroundColor: blue[300],
      buttonHover: blue[700],
    },
    seguimientos: {
      buttonText: grey[300],
      backgroundColor: orange[300],
      buttonHover: orange[700],
    },
    balance: {
      buttonText: grey[300],
      backgroundColor: green[300],
      buttonHover: green[700],
    },
    ganancias: {
      buttonText: grey[300],
      backgroundColor: teal[300],
      buttonHover: teal[700],
    },
    fondoCombinado: grey[900],
    fondoIntermedio: grey[600],
    fondo: grey[800],
    fondoGraficos: grey[900],
    colorTexto: grey[300],
    text: {
      primary: grey[300],
      disabled: grey[300],
      hint: grey[300],
      secondary: grey[100],
    },
    background: {
      paper: grey[800],
      default: grey[800],
      level2: "#f5f5f5",
      level1: "#fff",
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    useNextVariants: true,
    fontSize: 12,
  },
});

const temas = {
  normal: themeNormal,
  oscuro: themeDark
}



//////////////////////////////////////////

const PAGINAS_CON_MENU_DROWEABLE = [
  "/",
  "/cuadernos",
  "/cuadernos/nuevo",
  "/movimientos/ingresos",
  "/movimientos/ingresos/nuevo",
  "/movimientos/egresos",
  "/movimientos/egresos/nuevo",
  "/movimientos/transferencias",
  "/movimientos/transferencias/nueva",
  "/movimientos/balance",
  "/movimientos/seguimientos",
  "/movimientos/ganancias",
  "/presupuestos",
  "/dev/graficos",
]

const TODAY_M = new Date()
TODAY_M.setHours(0)
TODAY_M.setMinutes(0)
TODAY_M.setSeconds(0)
TODAY_M.setMilliseconds(0)

const TODAY_N = new Date()
TODAY_N.setHours(23)
TODAY_N.setMinutes(59)
TODAY_N.setSeconds(59)
TODAY_N.setMilliseconds(99)

const END_MONTH = new Date(TODAY_N)
END_MONTH.setMonth(TODAY_N.getMonth()+1)
END_MONTH.setDate(0)

const START_MONTH = new Date(TODAY_M)
START_MONTH.setDate(1)

const styles = theme => ({
  root: {
    display: 'flex',
    // [theme.breakpoints.up('lg')]: {
    //   boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 5px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
    //   position: 'fixed',
    //   left: 200,
    //   right: 200,
    //   bottom: 50,
    //   top: 114,
    // },
    minHeight: window.innerHeight,
    background: theme.palette.fondo,
  },
  dialogPaperCalculadora:{
    maxWidth: 64*4,
    minWidth: 64*4,
    minHeight: 'fit-content',
  },
  loadingRoot:{
    display: 'flex',
    position: 'fixed',
    top: 0,
    width: "100%",
    height: "100%",
    background: '#ffffffad',
    left: 0,
    zIndex: 999999999999,
    verticalAlign: 'middle',
    textAlign: 'center',
  },
  loadingContainer:{
    margin: 'auto'
  },
  fondo: {
    // [theme.breakpoints.up('lg')]: {
    //   position: 'fixed',
    //   backgroundColor: '#6bc18e',
    //   content: '',
    //   height: 135,
    //   width: '100%',
    //   zIndex: 0,
    //   top: 0,
    //   left: 0,
    //   right: 0
    // },
  },
  fondoModerno: {
/*
    [theme.breakpoints.down('md')]: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      position: 'fixed',
      backgroundImage: "url(/fondo_o.png)",
//      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPositionX: "center",
      backgroundPositionY: "top",
    }
*/
  },
/*
  fondoSuperiors: {
    [theme.breakpoints.up('lg')]: {
      position: 'fixed',
      backgroundColor: '#006e96',
      height: 20,
      top: 0,
      width: '100%',
      zIndex: 99999999999,
      left: 0,
      right: 0
    },
  },
*/
  rootApp: {
    // [theme.breakpoints.up('lg')]: {
    //   // padding: 50,
    //   // paddingTop: 25,
    //   // paddingBottom: 0
    //   overflow: 'auto',
    //   paddingTop: 0,
    // },
    minWidth: '100%',
    minHeight: '100%',
//    background: '#00000096',
    background: '#ffffff',
    [theme.breakpoints.down('md')]: {
      background: 'transparent',
    },
    paddingTop: 46,
    zIndex: 1
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
  dialogTemaNuevo: {
    padding: 20,
    textAlign: 'center'
  }
});


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
      openAlerta: false,
      mensajeAlerta: '',
      variantAlert: 'warning',
      openMenu: false,
      openRangoFechas: false,
      openCalculadora: false,
//      heightSchroleable: pageHeight - 64,
      heightSchroleable: pageHeight,
      cuadernoSeleccionada: undefined,
      titulo: "Controla tu Economía",
      desde: START_MONTH,
      hasta: END_MONTH

    };

    this.seleccionarCuaderno = this.seleccionarCuaderno.bind(this);
    this.cambiarTitulo = this.cambiarTitulo.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleMenu = this.handleMenu.bind(this)
    this.handleAlerta = this.handleAlerta.bind(this)
    this.handleCloseAlert = this.handleCloseAlert.bind(this)
    this.handleRangoFechas = this.handleRangoFechas.bind(this)
    this.handleCalculadora = this.handleCalculadora.bind(this)

/*
    this.logout = this.logout.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  */
  }

  handleAlerta = (mensaje, variant) => {
    this.setState(state => ({
      openAlerta: true,
      mensajeAlerta: mensaje,
      variantAlert: variant
    }));
  };
  handleCloseAlert = () => {
    this.setState(state => ({
      openAlerta: false,
    }));
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
  handleCalculadora(){
    this.setState({
      openCalculadora: !this.state.openCalculadora
    })
  }


  handleDateChange(name, date){
    const fecha = new Date(date)
    if (name == "desde") {
      fecha.setHours(0)
      fecha.setMinutes(0)
      fecha.setSeconds(0)
      fecha.setMilliseconds(0)
    } else {
      fecha.setHours(23)
      fecha.setMinutes(59)
      fecha.setSeconds(59)
      fecha.setMilliseconds(99)
    }
    this.setState({ [name]: fecha });
  };

  static getDerivedStateFromProps(props, state){
    const {
      loading,
      cuadernosExists,
      cuadernos,
      loggued
    } = props;
    const cuadernoSeleccionadaProps = props.cuadernoSeleccionada
    const {
      cuadernoSeleccionada
    } = state;

    if (!loading && cuadernosExists && !!loggued) {
      if (!!!cuadernoSeleccionada || (!!cuadernoSeleccionada && cuadernos.map((c)=> {return c._id}).indexOf(cuadernoSeleccionada._id) == -1) ) {
        if (!!cuadernoSeleccionadaProps) {
          console.log("RETURN 1")
          return {
            cuadernoSeleccionada: cuadernoSeleccionadaProps
          }
        } else {
          console.log("RETURN 2")
          console.log(cuadernos)
          return {
            cuadernoSeleccionada: cuadernos[0]
          }
        }
      } else {
          console.log("RETURN 3")
        return null
      }
    } else {
      if (!!cuadernoSeleccionada) {
        return {
          cuadernoSeleccionada: undefined
        }
      } else {
        return null
      }
    }
  }


  seleccionarCuaderno(cuadernoSeleccionada) {
    sessionStorage.setItem('cuadernoSeleccionada', JSON.stringify(cuadernoSeleccionada));
    this.setState({cuadernoSeleccionada});
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
      cuadernosExists, loggued
    } = this.props
    return [
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
      <Route
        exact
        path="/herramientas/calculadora"
        render={() => <CalculadoraContainer cambiarTitulo={this.cambiarTitulo} />}
      />,
      !!loggued ? '' :
      <Route
        exact
        path="/*"
        render={() => <SignInPage cambiarTitulo={this.cambiarTitulo} />}
      />,
    ]
  }

  renderOnlinePages(){
    const { loggued, cuadernos, cuadernosExists } = this.props;
    const { cuadernoSeleccionada, desde, hasta } = this.state;
    const cambiarTitulo = this.cambiarTitulo
    const fechas = {
      desde,
      hasta
    }
    const pase = {
      handleAlerta: this.handleAlerta,
      cambiarTitulo,
      cuadernoSeleccionada,
      ...fechas
    }
    

    if (!!loggued) {
      if (!!cuadernoSeleccionada) {
        return [
          <Route
            exact
            path="/"
            render={() => <InicioContainer handleAlerta={this.handleAlerta} hasta={hasta} cuadernoSeleccionada={cuadernoSeleccionada} cambiarTitulo={this.cambiarTitulo} cuadernosExists={cuadernosExists}/>}
          />,
          <Route
            exact
            path="/movimientos/egresos"
            render={() => <EgresosContainer {...pase} />}
          />,
          <Route
            exact
            path="/movimientos/egresos/:id"
            render={({match}) => <EgresoContainer match={match} {...pase} />}
          />,
          <Route
            exact
            path="/movimientos/ingresos"
            render={() => <IngresosContainer {...pase} />}
          />,
          <Route
            exact
            path="/movimientos/ingresos/:id"
            render={({match}) => <IngresoContainer match={match} {...pase} />}
          />,
          <Route
            exact
            path="/movimientos/transferencias/:id"
            render={({match}) => <TransferenciaContainer cuadernos={cuadernos} match={match} {...pase} />}
          />,
          <Route
            exact
            path="/movimientos/transferencias"
            render={({match}) => <TransferenciasContainer cuadernos={cuadernos} match={match} {...pase} />}
          />,
          <Route
            exact
            path="/movimientos/seguimientos"
            render={() => <SeguimientosContainer {...pase} />}
          />,
          <Route
            exact
            path="/presupuestos/:id"
            render={({match}) => <PresupuestoContainer cuadernos={cuadernos} match={match} {...pase} />}
          />,
          <Route
            exact
            path="/presupuestos/"
            render={({match}) => <PresupuestosContainer match={match} {...pase} />}
          />,
          <Route
            exact
            path="/movimientos/balance"
            render={() => <BalanceContainer {...pase} />}
          />,
          <Route
            exact
            path="/movimientos/ganancias"
            render={() => <GananciasContainer {...pase} />}
          />,
          <Route
            exact
            path="/cuadernos/"
            render={() => <CuadernosContainer cuadernos={cuadernos} seleccionarCuaderno={this.seleccionarCuaderno} {...pase} />}
          />,
          <Route
            exact
            path="/cuadernos/:id"
            render={({match}) => <CuadernoContainer match={match} {...pase} />}
          />,
          <Route
            exact
            path="/setings/categorias"
            render={() => <CategoriasContainer {...pase} />}
          />,
          <Route
            exact
            path="/dev/graficos"
            render={() => <GraficosContainer {...pase} />}
          />,
          <Route
            exact
            path="/perfil"
            render={() => <Perfil {...pase} />}
          />,
        ]
      } else {
        return [
          <Route
            exact
            path="/"
            render={() => <InicioContainer handleAlerta={this.handleAlerta} hasta={hasta} cuadernoSeleccionada={cuadernoSeleccionada} cambiarTitulo={this.cambiarTitulo} cuadernosExists={cuadernosExists}/>}
          />,
          <Route
            path="/movimientos/*"
            render={({match}) => <CuadernosContainer {...pase} cuadernos={cuadernos} seleccionarCuaderno={this.seleccionarCuaderno}/>}
          />,
          <Route
            exact
            path="/cuadernos/"
            render={() => <CuadernosContainer {...pase} cuadernos={cuadernos} seleccionarCuaderno={this.seleccionarCuaderno}/>}
          />,
          <Route
            exact
            path="/cuadernos/:id"
            render={({match}) => <CuadernoContainer cambiarTitulo={this.cambiarTitulo} match={match} />}
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
          path="/cuadernos/*"
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
      perfil
    } = this.props;
    const {
      showConnectionIssue,
      openMenu,
      openRangoFechas,
      openCalculadora,
      titulo,
      desde,
      hasta,
      cuadernoSeleccionada
    } = this.state


    const verMenuDroweable = PAGINAS_CON_MENU_DROWEABLE.includes(location.pathname)

    if (loading) {
      return (
        <div className={classes.loadingRoot}>
          <div className={classes.loadingContainer}>
            <div class="loader" id="loader"></div>
            cargando
          </div>
        </div>
      )
    } else {
      return (
        <div className={classes.rootApp}>
          { !!user ? 
            <AppBarCustom titulo={titulo} handleMenu={this.handleMenu}
              handleRangoFechas={this.handleRangoFechas} cuaderno={!!cuadernoSeleccionada && cuadernoSeleccionada.nombre}
              handleCalculadora={this.handleCalculadora} />
          : '' }
          { verMenuDroweable ? <AppMenuCustom open={openMenu} handleMenu={this.handleMenu} /> : ''}
          <RangoFechas
            open={openRangoFechas}
            handleRangoFechas={this.handleRangoFechas}
            desde={desde}
            hasta={hasta}
            handleDateChange={this.handleDateChange}
          />
          <Dialog
            maxWidth="lg"
            PaperProps={{
              className: classes.dialogPaperCalculadora
            }}
            onClose={this.handleCalculadora}
            open={openCalculadora}
            >
            <Calculadora />
          </Dialog>
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

          {
            !!user ? !!!perfil ?
                <Dialog open={true}>
                  <DialogTitle>Elija un tema:</DialogTitle>
                  <DialogContent className={classes.dialogTemaNuevo}>
                    <Tema handleAlerta={this.handleAlerta} />
                  </DialogContent>
                </Dialog>
                : !!!perfil.tema ?
                <Dialog open={true}>
                  <DialogTitle>Elija un tema:</DialogTitle>
                  <DialogContent className={classes.dialogTemaNuevo}>
                    <Tema handleAlerta={this.handleAlerta} />
                  </DialogContent>
                </Dialog>
              : ''
            : ''
          }
        </div>
      );
    }
  }


  render() {
    const {
      classes,
      publicHandlePerfil,
      loadingPerfil,
      perfil,
      perfilExists
    } = this.props;

    const {
      openAlerta,
      mensajeAlerta,
      variantAlert
    } = this.state

    const alerta = {
      variant: variantAlert,
      open: openAlerta,
      mensaje: mensajeAlerta
    };

    return (
      <MuiThemeProvider theme={perfilExists ? temas[perfil.tema] : temas["normal"]}>
        <div className={classes.root}>
          <CssBaseline />
          <BrowserRouter>
            <Route
              render={({ location }) => (
                this.renderContent(location)
              )}
            />
          </BrowserRouter>
          <Alerta alerta={alerta} handleClose={() => this.handleCloseAlert()} />
        </div>
      </MuiThemeProvider>
    );
  }
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
