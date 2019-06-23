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
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import GradeIcon from '@material-ui/icons/Grade';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';

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
  iconoSeccionPrincipal: {
    width: 35,
    height: 35,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  },
  iconoSeccion: {
    width: 35,
    height: 35,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  },
  divIconoSeccion:{
    background: theme.palette.appBar.backgroundColor,
    padding: 10,
    paddingBottom: 10,
    borderRadius: "100%",
    width: "fit-content",
    margin: "auto",
    marginBottom: 5,
    marginTop: 5,
    boxShadow: "0 5px 5px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)"
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
      expanded: false
    };
  }

  handleExpandClick = () => {
    this.setState(state => ({expanded: !state.expanded}));
  }


  renderCuadernoSeleccionado(){
    const {  
      classes,
      cuadernoSeleccionada
    } = this.props;

    const {
      expanded
    } = this.state

    if (!!cuadernoSeleccionada) {
      return (
        <div className={classes.rootCard}>
          <Card className={classes.card}>
            <CardHeader
              className={classes.cardHeader}
              action={
                <IconButton aria-label="Settings" onClick={() => { alert("EN DESARROLLO")}}>
                  <EditIcon />
                </IconButton>
              }
              title={cuadernoSeleccionada.nombre}
              subheader={cuadernoSeleccionada.descripcion}
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Tienes seleccionado este cuaderno, puedes: marcarlo como favorito para que siempre sea el seleecionado al
                  iniciar la aplicacion, compartir su codigo para que alguien lo vincule, o editarlo.
                </Typography>
              </CardContent>
            </Collapse>
            <CardActions disableSpacing>
              <IconButton aria-label="Add to favorites" onClick={() => { alert("EN DESARROLLO")}}>
                <GradeIcon />
              </IconButton>
              <IconButton aria-label="Share" onClick={() => { alert("EN DESARROLLO")}}>
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
        <div className={classes.rootLinks}>
          <div className={classes.divSeccion}>
            <Link className={classes.linkSeccion} to={'/movimientos/balance'}>
              <div className={classes.divIconoSeccion}>
                <div className={classes.iconoSeccionPrincipal} style={{backgroundImage: "url(/balanza_b.png)"}} />
              </div>
            </Link>
            <Link className={classes.linkSeccion} to={'/movimientos/ganancias'}>
              <div className={classes.divIconoSeccion}>
                <div className={classes.iconoSeccionPrincipal} style={{backgroundImage: "url(/ganancia_b.png)"}} />
              </div>
            </Link>
          </div>
          <div className={classes.divSeccion}>
            <Link className={classes.linkSeccion} to={'/movimientos/ingresos'}>
            <div className={classes.divIconoSeccion}>
              <div className={classes.iconoSeccion} style={{backgroundImage: "url(/ingreso_b.png)"}} />
            </div>
            </Link>
            <Link className={classes.linkSeccion} to={'/movimientos/egresos'}>
            <div className={classes.divIconoSeccion}>
              <div className={classes.iconoSeccion} style={{backgroundImage: "url(/egreso_b.png)"}} />
            </div>
            </Link>
            <Link className={classes.linkSeccion} to={'/movimientos/transferencias'}>
            <div className={classes.divIconoSeccion}>
              <div className={classes.iconoSeccion} style={{backgroundImage: "url(/transferencia_b.png)"}} />
            </div>
            </Link>
          </div>
        </div>
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
