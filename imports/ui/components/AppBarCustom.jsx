import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AppBar, Toolbar, Typography, withStyles} from '@material-ui/core';

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
});

class AppBarCustom extends Component {
  render() {
    const { classes } = this.props;

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

AppBarCustom.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBarCustom);