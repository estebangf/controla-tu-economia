import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, List, Typography, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, ListItem, Divider, ListSubheader } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const drawerWidth = 240;

const styles = theme => ({
  rootList: {
    paddingTop: 0,
  },
  titulo: {
    textAlign: 'center',
    paddingTop: 15
  },
  listaGrafico:{
    padding: 30,
    paddingTop: 15,
    paddingBottom: 0,
    background: "#FFF"
  },
  barraGrafico:{
    transition: 'width 0.5s',
    display: '-webkit-box',
    height: 25,
    width: 0
  },
  listaItems:{
    paddingRight: 10
  },
});


class Balance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
      drawerOpen: false
    };
  }

  renderIcon(item){
    if(item.tipo == 'ingresos') {
      if(item.esPrestamo) {
        return <AccountBalanceIcon />
      } else {
        return <AttachMoneyIcon />
      }
    } else {
      if(item.esInsumo) {
        return <WorkIcon />
      } else {
        return <HomeIcon />
      }
    }
  }

  renderItems(items) {
    return items.map(item => {
      const styleFont = {color: item.tipo == 'ingresos' ? "#4385d6" : "#de6c6c" };
      const styleIcon = {background: item.tipo == 'ingresos' ? '#4385d6' : '#de6c6c'}
      return (
        <Link to={"/movimientos/"+item.tipo+"/"+item._id} style={{
          'text-decoration': 'none',
          '&:focus, &:hover, &:visited, &:link, &:active': {
            'text-decoration': 'none',
            color: "#4d4d4d"
        },
          color: "#4d4d4d"
        }}>
          <ListItem
            button
          >
            <ListItemAvatar>
              <Avatar style={styleIcon}>
                {this.renderIcon(item)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                style: styleFont
              }}
              secondaryTypographyProps={{
                style: styleFont
              }}
              primary={item.detalle}
              secondary={!!item.descripcion ? item.descripcion : null}
            />
            <ListItemSecondaryAction>
              <Typography style={styleFont} >
              {function(){
                let importe = '$\u00A0'
                for(let i=0; i<=9-item.importe.toFixed(2).toString().length; i++){
                  importe += '\u00A0\u00A0';
                }
                console.log(importe+item.importe.toFixed(2));
                return importe+item.importe.toFixed(2)
              }()}</Typography>
            </ListItemSecondaryAction>
          </ListItem>
        </Link>
      )
    })
  }

  render() {
    const {
      classes,
      ingresos,
      gastos
    } = this.props;

    let items = [];
    let i = 0;
    let g = 0;

    let totales = {
      ingresos: 0,
      gastos: 0,
      saldo: 0
    }
    while (i < ingresos.length && g < gastos.length) {
      console.log("COMPARACION")
      console.log(ingresos[i].creado)
      console.log(gastos[g].creado)
      if (ingresos[i].creado.getTime() < gastos[g].creado.getTime()) {
        items.push({...ingresos[i], tipo: "ingresos"})
        totales.ingresos += ingresos[i].importe
        totales.saldo += ingresos[i].importe
        i++
      } else {
        items.push({...gastos[g], tipo: "gastos"})
        totales.gastos += gastos[g].importe
        totales.saldo -= gastos[g].importe
        g++
      }
    }
    while (i < ingresos.length) {
      items.push({...ingresos[i], tipo: "ingresos"})
      totales.ingresos += ingresos[i].importe
      totales.saldo += ingresos[i].importe
      i++
    }
    while ( g < gastos.length) {
      items.push({...gastos[g], tipo: "gastos"})
      totales.gastos += gastos[g].importe
      totales.saldo -= gastos[g].importe
      g++
    }
    let mayorIngreso = totales.ingresos > totales.gastos
    let porcentajes= {
      gastos: !mayorIngreso && totales.gastos !=0 ? 1 : totales.gastos/totales.ingresos,
      ingresos: mayorIngreso && totales.ingresos !=0 ? 1 : totales.ingresos/totales.gastos,
      saldo: mayorIngreso !=0 ? totales.saldo/totales.ingresos : totales.saldo/totales.gastos
    }

    return (
      <div className={classes.root}>
        <List dense={true} className={classes.rootList}>
          <ListSubheader className={classes.listaGrafico}>
            <Typography variant="h4" className={classes.titulo}>Balance</Typography>
            <Link to={'/'}>Inicio</Link>
            <ListItem>
              <ListItemText
                primaryTypographyProps={{
                  style: { color: "#de6c6c" }
                }}
                secondaryTypographyProps={{
                  style: { color: "#de6c6c" }
                }}
                primary={totales.gastos.toFixed(2)}
                secondary="Gastos"
              />
              <ListItemSecondaryAction>
                <span className={classes.barraGrafico} style={{background: '#de6c6c', width: 200*porcentajes.gastos}} />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                primaryTypographyProps={{
                  style: { color: "#4385d6" }
                }}
                secondaryTypographyProps={{
                  style: { color: "#4385d6" }
                }}
                primary={totales.ingresos.toFixed(2)}
                secondary="Ingresos"
              />
              <ListItemSecondaryAction>
                <span className={classes.barraGrafico} style={{ background: '#4385d6', width: 200*porcentajes.ingresos}} />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                primaryTypographyProps={{
                  style: { color: "#3ab33a" }
                }}
                secondaryTypographyProps={{
                  style: { color: "#3ab33a" }
                }}
                primary={totales.saldo.toFixed(2)}
                secondary="Saldo"
              />
              <ListItemSecondaryAction>
                <span className={classes.barraGrafico} style={{background: '#77c677', width: 200*porcentajes.saldo}} />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </ListSubheader>
          <List dense={false} className={classes.listaItems}>
            {this.renderItems(items)}
          </List>
        </List>
      </div>
    )
  }
};

Balance.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Balance);