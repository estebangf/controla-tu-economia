import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, List, Typography, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, ListItem } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';

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

  renderIngresos() {
    const { ingresos } = this.props;

    return ingresos.map(ingreso => {
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
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={ingreso.detalle}
              secondary={!!ingreso.descripcion ? ingreso.descripcion : null}
            />
            <ListItemSecondaryAction>
              <Typography>
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
        <h1>Ingresos</h1>
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