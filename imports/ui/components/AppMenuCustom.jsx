import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import LiveHelpIcon from '@material-ui/icons/LiveHelp';

import FilterListIcon from '@material-ui/icons/FilterList';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import InfoIcon from '@material-ui/icons/Info';
import PersonIcon from '@material-ui/icons/Person';
import ListSubheader from '@material-ui/core/ListSubheader';

const categorias = [
  {
    text: "Cuentas",
    paginas: [
      {
        text: "Lista",
        link: "/cuentas",
        icon: ListIcon
      },
      {
        text: "Nueva",
        link: "/cuentas/nueva",
        icon: AddIcon
      }
    ]
  },
  {
    text: "Movimientos",
    paginas: [
      {
        text: "Lista Ingresos",
        link: "/movimientos/ingresos",
        icon: ListIcon
      },
      {
        text: "Lista Gastos",
        link: "/movimientos/gastos",
        icon: ListIcon
      },
      {
        text: "Nuevo Ingreso",
        link: "/movimientos/ingresos/nuevo",
        icon: AddIcon
      },
      {
        text: "Nuevo Gasto",
        link: "/movimientos/gastos/nuevo",
        icon: AddIcon
      }
    ]
  },
  {
    text: "Estados",
    paginas: [
      {
        text: "Seguimientos",
        link: "/movimientos/seguimientos",
        icon: FilterListIcon
      },
      {
        text: "Balance",
        link: "/movimientos/balance",
        icon: AccountBalanceIcon
      },
      {
        text: "Ganancias",
        link: "/movimientos/ganancias",
        icon: EqualizerIcon
      }
    ]
  }
]
const otrasPaginas = [
  {
    text: "Perfil",
        link: "/perfil",
        icon: PersonIcon
  },
  {
    text: "Informacion",
        link: "/informacion",
        icon: InfoIcon
  }
]


const drawerWidth = 300;

const styles = theme => ({
  root: {
    display: 'flex',
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
    backgroundColor: '#FFF',
  },
  link:{
    textDecoration: 'none',
    '&:focus':{
      textDecoration: 'none',
      color: '#000'
    },
    '&:hover':{
      textDecoration: 'none',
      color: '#000'
    },
    '&:visited':{
      textDecoration: 'none',
      color: '#000'
    },
    '&:link':{
      textDecoration: 'none',
      color: '#000'
    },
    '&:active':{
      textDecoration: 'none',
      color: '#000'
    },
  },
  divider: {
    backgroundColor: '#00000042',
  },
  logoImgaen: {
    ...theme.mixins.toolbar,
    height: 0,
    verticalAlign: 'middle',
    padding: 8,
    paddingLeft: 0
  },
  listaMedia: {
    backgroundColor: '#ebebeb',
    position: 'relative',
    display: 'block',
    overflowX: 'hidden',
    overflowY: 'auto',
    paddingTop: 0
  },
  listaMediaItem: {
    padding: 0
  },
  listItemText:{
    color: '#505050',
  },
  listaMediaCategoria:{
    width: "100%"
  },
  listSubheader:{
    color: '#505050',
    backgroundColor: '#ebebeb',
  },
  listaFooter:{
    flex: '0 0 auto'
  },
  toolbar: {
    ...theme.mixins.toolbar,
    margin: 'auto',
  },
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

class AppMenuCustom extends Component {
  render() {
    const { classes, open, handleMenu } = this.props;

    return (
      <SwipeableDrawer
        open={open}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        onOpen={handleMenu}
        onClose={handleMenu}
        anchor="left" >
        <div className={classes.toolbar}>
          <Typography className={classes.listItemText}>
            <img className={classes.logoImgaen} src="/icono196x196.png" />
            Controla tu Economia
          </Typography>
        </div>
        <Divider className={classes.divider}/>
        <List
          className={classes.listaMedia} >
          {categorias.map(categoria => (
            <ListItem className={classes.listaMediaItem}>
              <List
                className={classes.listaMediaCategoria}
                subheader={<ListSubheader className={classes.listSubheader}>{categoria.text}</ListSubheader>}
                >
                {categoria.paginas.map((pagina, index) => {
                  const Icon = pagina.icon
                  return (
                    <Link className={classes.link} to={pagina.link}>
                      <ListItem button key={pagina.text+index} onClick={handleMenu}>
                        <ListItemIcon className={classes.listItemText}>
                          <Icon />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{className: classes.listItemText}} primary={pagina.text} />
                      </ListItem>
                    </Link>
                  )
                })}
              </List>
            </ListItem>
          ))}
        </List>
        <Divider className={classes.divider}/>
        <List className={classes.listaFooter}>
          {otrasPaginas.map((pagina, index) => {
            const Icon = pagina.icon
            return (
              <Link className={classes.link} to={pagina.link}>
                <ListItem button key={pagina.text+index} onClick={handleMenu}>
                  <ListItemIcon className={classes.listItemText}>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{className: classes.listItemText}} primary={pagina.text} />
                </ListItem>
              </Link>
            )
          })}
        </List>
      </SwipeableDrawer>
    );
  }
}

AppMenuCustom.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppMenuCustom);
