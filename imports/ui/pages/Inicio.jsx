import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import GradeIcon from '@material-ui/icons/Grade';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { Fab, Grid } from '@material-ui/core';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    // padding: 15,
    textAlign: 'center',
    // bottom: 0,
    // position: "absolute",
    width: "100%"
  },
  rootCard: {
    padding: 15,
    paddingTop: 30,
    background: theme.palette.appBar.backgroundColor,
    marginBottom: 30,
    borderRadius: '0px 0px 15px 15px'
  },
  cardContent:{
    paddingBottom: 0,
    paddingTop: 0
  },
  rootGrid: {
    flexGrow: 1,
    maxWidth: '100%',
    margin: 0
  },
  card: {

  },
  cardHeader:{
    textAlign: "left"
  },
  rootLinks: {
    padding: 15,
  },
  logoImgaen: {
    height: 150,
    margin: 'auto',
  },
  iconoSeccion: {
    width: 25,
    height: 25,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  },
  divIconoSeccion:{
    background: theme.palette.appBar.backgroundColor,
    "&:hover":{
      background: "#044580",
    }
    /*

    padding: 10,
    paddingBottom: 10,
    borderRadius: "100%",
    width: "fit-content",
    margin: "auto",
    marginBottom: 5,
    marginTop: 5,
    boxShadow: "0 5px 5px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)"
    */
  },
  divSeccion: {
    display: 'flex',
    marginBottom: 10
  },
  link:{
    textDecoration: 'none'
  },
  linkSeccion:{
    textDecoration: 'none',
    margin: "auto",
  },
  tituloSeccion: {
    marginTop: 5
  },
  saldoNegativo: {
    color: theme.palette.saldo.negativo.color,
  },
  saldoPositivo: {
    color: theme.palette.saldo.positivo.color,
  },
  saldoPeligroso: {
    color: theme.palette.saldo.peligroso.color,
  },
  btnCuadernos: {
    color: theme.palette.cuadernos.buttonText,
    backgroundColor: theme.palette.cuadernos.backgroundColor,
    '&:hover': {
      backgroundColor: theme.palette.cuadernos.buttonHover,
    },
    marginBottom: 15,
    fontSize: 15,
    padding: 15
  },
  btnGastos: {
    color: theme.palette.egresos.buttonText,
    backgroundColor: theme.palette.egresos.backgroundColor,
    '&:hover': {
      backgroundColor: theme.palette.egresos.buttonHover,
    },
    marginBottom: 15,
    fontSize: 15,
    padding: 15
  },
  btnIngresos: {
    color: theme.palette.ingresos.buttonText,
    backgroundColor: theme.palette.ingresos.backgroundColor,
    '&:hover': {
      backgroundColor: theme.palette.ingresos.buttonHover,
    },
    marginBottom: 15,
    fontSize: 15,
    padding: 15
  },
  btnBalance: {
    color: theme.palette.balance.buttonText,
    backgroundColor: theme.palette.balance.backgroundColor,
    '&:hover': {
      backgroundColor: theme.palette.balance.buttonHover,
    },
    marginBottom: 15,
    fontSize: 15,
    padding: 15
  },
  btnGanancias: {
    color: theme.palette.ganancias.buttonText,
    backgroundColor: theme.palette.ganancias.backgroundColor,
    '&:hover': {
      backgroundColor: theme.palette.ganancias.buttonHover,
    },
    marginBottom: 15,
    fontSize: 15,
    padding: 15
  },
  btnSeguimientos: {
    color: theme.palette.seguimientos.buttonText,
    backgroundColor: theme.palette.seguimientos.backgroundColor,
    '&:hover': {
      backgroundColor: theme.palette.seguimientos.buttonHover,
    },
    marginBottom: 15,
    fontSize: 15,
    padding: 15
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
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
      drawerOpen: false,
      expanded: false,
      saldoCuaderno: 0
    };
  }


  componentDidMount(){
    const {
      cuadernoSeleccionada,
      hasta
    } = this.props;

    if(!!cuadernoSeleccionada){
      const cuadernoId = !!cuadernoSeleccionada.cuadernoVinculado ? 
      cuadernoSeleccionada.cuadernoVinculado : cuadernoSeleccionada._id

      const self = this
      Meteor.call('movimiento.saldoInicial',
        cuadernoId,
        hasta,
        (error, result) => {
          if (error){
            console.log(error);
          } else {
            console.log(result)
            self.setState({
              saldoCuaderno: result
            })
          }
        }
      )
    }
  }

  componentDidUpdate(prevProps) {
    const {
      cuadernoSeleccionada,
      hasta
    } = this.props;

    if (!!cuadernoSeleccionada) {
      const cuadernoIdPrev = !!prevProps.cuadernoSeleccionada ?
        !!prevProps.cuadernoSeleccionada.cuadernoVinculado ? 
          prevProps.cuadernoSeleccionada.cuadernoVinculado : prevProps.cuadernoSeleccionada._id
        : '';
      const cuadernoId = !!cuadernoSeleccionada.cuadernoVinculado ? 
      cuadernoSeleccionada.cuadernoVinculado : cuadernoSeleccionada._id
      
      const self = this

      if ((hasta != prevProps.hasta) || (cuadernoId != cuadernoIdPrev)) {
        Meteor.call('movimiento.saldoInicial',
          cuadernoId,
          hasta,
          (error, result) => {
            if (error){
              console.log(error);
            } else {
              console.log(result)
              self.setState({
                saldoCuaderno: result
              })
            }
          }
        )
      }
    }
  }

  handleExpandClick = () => {
    this.setState(state => ({expanded: !state.expanded}));
  }

  compartirCuaderno = () => {
    const {
      cuadernoSeleccionada,
      handleAlerta
    } = this.props
    // Crea un campo de texto "oculto"
    var aux = document.createElement("input");
    
    // Asigna el contenido del elemento especificado al valor del campo
    // aux.setAttribute("value", document.getElementById(id_elemento).innerHTML);
    aux.setAttribute("value", cuadernoSeleccionada._id);
    
    // Añade el campo a la página
    document.body.appendChild(aux);
    
    // Selecciona el contenido del campo
    aux.select();
    
    // Copia el texto seleccionado
    document.execCommand("copy");
    
    // Elimina el campo de la página
    document.body.removeChild(aux);
    
    console.log(cuadernoSeleccionada._id+" copiado.")
    handleAlerta("Código de cuaderno copiado.")
    }

  renderCuadernoSeleccionado(){
    const {  
      classes,
      cuadernoSeleccionada
    } = this.props;

    const {
      expanded,
      saldoCuaderno
    } = this.state

    if (!!cuadernoSeleccionada) {
      return (
        <div className={classes.rootCard}>
          <Card className={classes.card}>
            <CardHeader
              className={classes.cardHeader}
              action={
                <Link className={classes.linkSeccion} to={'/cuadernos'}>
                  <IconButton aria-label="Cuadernos">
                    <LibraryBooksIcon />
                  </IconButton>
                </Link>
              }
              title={cuadernoSeleccionada.nombre}
              subheader={cuadernoSeleccionada.descripcion}
            />
            <CardContent className={classes.cardContent}>
              <Typography id="saldo-cuaderno" variant="h4" gutterBottom
                className={clsx({
                  [classes.saldoNegativo]: saldoCuaderno < 0,
                  [classes.saldoPositivo]: saldoCuaderno > 250,
                  [classes.saldoPeligroso]: saldoCuaderno >= 0 && saldoCuaderno <= 250,
                })}>
                $ {saldoCuaderno.toFixed(2)}
              </Typography>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography variant="body2" color="textSecondary" component="p">
                  Tienes seleccionado este cuaderno, puedes: marcarlo como favorito para que siempre sea el seleecionado al
                  iniciar la aplicacion, compartir su codigo para que alguien lo vincule, o cambiarlo.
                </Typography>
              </Collapse>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="Add to favorites" onClick={() => { alert("EN DESARROLLO")}}>
                <GradeIcon />
              </IconButton>
              <IconButton aria-label="Share" onClick={this.compartirCuaderno}>
                <ShareIcon />
              </IconButton>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                aria-expanded={expanded}
                onClick={this.handleExpandClick}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
          </Card>
        </div>
      )
    }
  }

  renderLinksMovimientos() {
    const {  
      classes,
      cuadernosExists
    } = this.props;

    if(cuadernosExists) {
      return (
        <Grid container className={classes.rootGrid} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              <Grid item xs={4}>
                <Link className={classes.linkSeccion} to={'/movimientos/balance'}>
                  <Fab className={classes.divIconoSeccion}>
                    <div className={classes.iconoSeccion} style={{backgroundImage: "url(/balanza_ib.png)"}} />
                  </Fab>
                </Link>
                <Typography className={classes.tituloSeccion} variant="subtitle1" display="block" gutterBottom >Balance</Typography>
              </Grid>
              <Grid item xs={4}>
                <Link className={classes.linkSeccion} to={'/movimientos/ganancias'}>
                  <Fab className={classes.divIconoSeccion}>
                    <div className={classes.iconoSeccion} style={{backgroundImage: "url(/ganancia_ib.png)"}} />
                  </Fab>
                </Link>
                <Typography className={classes.tituloSeccion} variant="subtitle1" display="block" gutterBottom >Ganancias</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              <Grid item xs={4}>
                <Link className={classes.linkSeccion} to={'/movimientos/ingresos'}>
                  <Fab className={classes.divIconoSeccion}>
                    <div className={classes.iconoSeccion} style={{backgroundImage: "url(/ingreso_ib.png)"}} />
                  </Fab>
                </Link>
                <Typography className={classes.tituloSeccion} variant="subtitle1" display="block" gutterBottom >Ingresos</Typography>
              </Grid>
              <Grid item xs={4}>
                <Link className={classes.linkSeccion} to={'/movimientos/egresos'}>
                  <Fab className={classes.divIconoSeccion}>
                    <div className={classes.iconoSeccion} style={{backgroundImage: "url(/egreso_ib.png)"}} />
                  </Fab>
                </Link>
                <Typography className={classes.tituloSeccion} variant="subtitle1" display="block" gutterBottom >Egresos</Typography>
              </Grid>
              <Grid item xs={4}>
                <Link className={classes.linkSeccion} to={'/movimientos/transferencias'}>
                  <Fab className={classes.divIconoSeccion}>
                    <div className={classes.iconoSeccion} style={{backgroundImage: "url(/transferencia_ib.png)"}} />
                  </Fab>
                </Link>
                <Typography className={classes.tituloSeccion} variant="subtitle1" display="block" gutterBottom >Transferencias</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )
    }
  }

  render() {
    const { classes, cuadernoSeleccionada } = this.props;

    return (
      <div className={classes.root}>
        {this.renderCuadernoSeleccionado()}
        {this.renderLinksMovimientos()}
      </div>
    )
  }
};

Inicio.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inicio);
