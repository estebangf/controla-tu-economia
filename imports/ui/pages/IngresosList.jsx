import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, Typography, ListItemAvatar, Avatar, List, ListItemText, ListItemSecondaryAction, ListItem } from '@material-ui/core';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const drawerWidth = 240;

const styles = theme => ({
  root: {
  },
});


class IngresosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
      drawerOpen: false
    };
  }

  renderIcon(ingreso){
    if(ingreso.esPrestamo) {
      return <AccountBalanceIcon />
    } else {
      return <AttachMoneyIcon />
    }
  }

  renderIngresos() {
    const { ingresos } = this.props;

    return ingresos.map(ingreso => {
      const styleFont = {color: "#4385d6" };
      const styleIcon = {background: '#4385d6'}

      return (
        <Link to={"/movimientos/ingresos/"+ingreso._id} style={{
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
                {this.renderIcon(ingreso)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                style: styleFont
              }}
              secondaryTypographyProps={{
                style: styleFont
              }}
              primary={ingreso.detalle}
              secondary={!!ingreso.descripcion ? ingreso.descripcion : null}
            />
            <ListItemSecondaryAction>
              <Typography style={styleFont} >
              {function(){
                let importe = '$\u00A0'
                for(let i=0; i<=9-ingreso.importe.toFixed(2).toString().length; i++){
                  importe += '\u00A0\u00A0';
                }
                console.log(importe+ingreso.importe.toFixed(2));
                return importe+ingreso.importe.toFixed(2)
              }()}</Typography>
            </ListItemSecondaryAction>
          </ListItem>
        </Link>
      )
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h4" className={classes.titulo}>Ingresos</Typography>
        <Link to={'/'}>Inicio</Link>
        <Link className={classes.link} to={'/movimientos/ingresos/nuevo'}>
          Nuevo Ingreso
        </Link>
        
        <List className={classes.root}>
          {this.renderIngresos()}
        </List>
      </div>
    )
  }
};

IngresosList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IngresosList);