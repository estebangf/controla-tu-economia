import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, List, Typography, ListSubheader } from '@material-ui/core';
import ListItemCategoria from '../components/ListItemCategoria';

const drawerWidth = 240;

const styles = theme => ({
  root: {
  },
});


class CategoriasList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  renderCategorias() {
    const { categorias } = this.props;
    
    return categorias.map(categoria => {
      return (
        <ListItemCategoria
          {...categoria}
        />
      )
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List className={classes.root}>
          {this.renderCategorias()}
          <ListSubheader>
            <Typography>Nueva Categoria</Typography>
          </ListSubheader>
          <ListItemCategoria nombre={''}/>
        </List>
      </div>
    )
  }
};

CategoriasList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoriasList);