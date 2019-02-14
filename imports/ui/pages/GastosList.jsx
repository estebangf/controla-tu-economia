import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, List, Typography, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, ListItem } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';

const drawerWidth = 240;

const styles = theme => ({
  root: {
  },
});


class GastosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
      drawerOpen: false
    };
  }


  renderIcon(gasto){
    if(gasto.esInsumo) {
      return <WorkIcon />
    } else {
      return <HomeIcon />
    }
  }
  renderGastos() {
    const { gastos } = this.props;

    return gastos.map(gasto => {
      const styleFont = {color: "#de6c6c" };
      const styleIcon = {background: '#de6c6c'}

      return (
        <Link to={"/movimientos/gastos/"+gasto._id} style={{
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
                {this.renderIcon(gasto)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                style: styleFont
              }}
              secondaryTypographyProps={{
                style: styleFont
              }}
              primary={gasto.detalle}
              secondary={!!gasto.descripcion ? gasto.descripcion : null}
            />
            <ListItemSecondaryAction>
              <Typography>
              {function(){
                let importe = '$\u00A0'
                for(let i=0; i<=9-gasto.importe.toFixed(2).toString().length; i++){
                  importe += '\u00A0\u00A0';
                }
                console.log(importe+gasto.importe.toFixed(2));
                return importe+gasto.importe.toFixed(2)
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
        <h1>Ingresos</h1>
        <List className={classes.root}>
          {this.renderGastos()}
        </List>
      </div>
    )
  }
};

GastosList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GastosList);